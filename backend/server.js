const express = require("express");
const readline = require("readline");
const path = require("path");
const { Client, Pool } = require("pg");
const bcrypt = require("bcrypt");
//const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();
const PORT = 3000;

const vocDataBase = require("./data/vocdatabase.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let pool;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
}))

app.use(router);

//app.use(cors());

rl.on("line", (input) => {
    if (input == "stop") {
        console.log("Server closing...");
        process.exit(0);
    }
    if (input == "secret") {
        console.log(generateToken());
    }
})

router.get("/api/getbooks", (req, res) => {
    console.log("got book request");
    res.json({books:Object.keys(vocDataBase)});
});

router.get("/api/getchapters", (req, res) => {
    const { book } = req.query;
    console.log(`got chapter request for book ${book}`);
    res.json({chapters:Object.keys(vocDataBase[book])});
});

router.get("/api/test", (req, res) =>{
    res.json({v:true});
});

router.post("/api/getvoc", (req, res) => {
    const { book, chapters } = req.body;
    let vocList = {};
    for (let c of chapters){
        vocList[c] = vocDataBase[book][c];
    }
    res.json({voc:vocList});
});


router.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    console.log("register-req");

    if (!usernameRegex.test(username)){
        res.json({valid:false, reason:"Invalid_Username"});
        return;
    }
    if (!emailRegex.test(email)){
        res.json({valid:false, reason:"Invalid_Email"});
        return;
    }
    if (password.length < 8){
        res.json({valid:false, reason:"Password_Too_Short"});
        return;
    }
    
    const client = await pool.connect();
    await client.query("BEGIN");
    const [hash] = await Promise.all([
        bcrypt.hash(password,12),
        client.query(
            "DELETE FROM users WHERE email = $1 AND email_verified = false AND verification_expires < NOW()",
            [email]
        )
    ]);
    const emailToken = generateToken();

    try {
        await client.query(
            "INSERT INTO users (username, password_hash, email, verification_token, verification_expires) VALUES ($1, $2, $3, $4, $5)",
            [username, hash, email, emailToken, new Date(Date.now() + 600000)]
        );
        res.json({valid:true});
        client.query("COMMIT");
    } catch (err) {
        client.query("ROLLBACK");
        if (err.code === "23505") {
            switch (err.constraint){
                case "users_username_key":
                    res.json({valid:false, reason:"User_Exists"});
                    return;
                case "users_email_key":
                    res.json({valid:false, reason:"Email_Exists"});
                    return;
            }
        }
        console.error(err);
        res.json({valid:false, reason:"Server_Error"});
        return;
    } finally {
        client.release();
    }

    try {
        await transporter.sendMail({
            from: '"McLev" <mclev.2024@gmail.com>',
            to: email,
            subject: "E-Mail Bestätigung",
            html:
            `
            <h1>Willkommen bei McLev</h1>
            <div style="font-size: 18px;">Um Ihre E-Mail-Adresse zu bestätigen, drücken Sie auf folgenden Link:</div>
            <a href="http://127.0.0.1:3000/api/verifyemail?token=${emailToken}" style="font-size: 18px;">E-Mail bestätigen</a>
            `
        });
    } catch(err) {
        console.error(`Failed to send E-Mail-Vericifation-Mail:\n  ${err}`)
    }
});

router.get("/api/verifyemail", async (req,res) => {
    const { token } = req.query;
    const result = await pool.query(
        `
        UPDATE users 
        SET email_verified = true,
            verification_token = NULL,
            verification_expires = NULL
        WHERE verification_token = $1
        `,
        [token]
    );
})

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("login-req");

    if (!usernameRegex.test(username)){
        res.json({valid:false, reason:"wrong"});
        return;
    }

    const result = await pool.query(`
        SELECT id, password_hash
        FROM users
        WHERE username = $1    
    `, [username]);

    if (result.rows.length === 0) {
        res.json({
            valid:false, reason:"wrong"
        });
        return;
    }

    const hash = result.rows[0].password_hash;
    const Uid = result.rows[0].id;

    const match = await bcrypt.compare(
        password,
        hash
    );

    if (!match){
        res.json({
            valid:false, reason:"wrong"
        });
        return;
    }

    req.session.userId = Uid;

    res.json({
        valid: true
    });

});

router.post("/api/logout", (req,res) => {
    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500);
        }

        res.clearCookie("connect.sid");
        res.sendStatus(200);
    })
});

router.get("/api/me", async (req,res) => {
    if (!req.session.userId){
        return res.status(401).json({
            error: "not-logged-in"
        })
    }

    const data = await getUserData(req.session.userId);

    res.json({
        username: data.username
    })
});


(async (password) => {
    pool = await initpg(password);
    
    try {
        await transporter.verify();
        console.log("Successfully connected to Email!");

    } catch (err){
        console.log(`Error while logging into Email:\n  ${err}`);
    }

    app.listen(PORT, () => {
        console.log(`Server runs on http://127.0.0.1:${PORT}`);
    });
})(process.env.PG_PASSWORD);

async function initpg(password) {
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: password,
        port: 5432
    });
    try {
        await client.connect();
        console.log("Successfully connected to Postgres!")
    } catch (err) {
        console.log(`Error while logging into Postgres:\n  ${err}`);
        process.exit(0);
    }
    
    await client.query(`
        CREATE DATABASE mclevdb
        WITH OWNER = postgres
    `).catch(err =>{
        if (err.code !== "42P04") {
            console.error(`Error while checking if DB already created:\n${err}`);
            process.exit(0);
        }
    });

    await client.end();

    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "mclevdb",
        password: password,
        port: 5432
    });

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            email_verified BOOLEAN DEFAULT FALSE,
            verification_token TEXT UNIQUE,
            verification_expires TIMESTAMPTZ
        )
    `)

    return pool;
}

async function getUserData(id){
    const res = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    )
    if (res.rows.length === 0){
        return null;
    } else {
        return res.rows[0]
    }
}

function generateToken(){
    return crypto.randomBytes(64).toString("hex");
}