const express = require("express");
const readline = require("readline");
const path = require("path");
const { Client, Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const router = express.Router();
const PORT = 3000;

const vocDataBase = require("./data/vocdatabase.json");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
let pool;


app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(router);

rl.on("line", (input) => {
    if (input == "stop") {
        console.log("Server closing...");
        process.exit(0);
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

router.post("/api/getvoc", (req, res) => {
    const { book, chapters } = req.body;
    let vocList = {};
    for (let c of chapters){
        vocList[c] = vocDataBase[book][c];
    }
    res.json({voc:vocList});
});


router.post("/api/register", async (req, res) => {
    const { username, password } = req.body;

    if (!usernameRegex.test(username)){
        res.json({valid:false, reason:"Invalid_Username"});
        return;
    }
    if (password.length < 8){
        res.json({valid:false, reason:"Password_Too_Short"});
        return;
    }

    try {
        const hash = await bcrypt.hash(password, 12);

        await pool.query(
            "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
            [username, hash]
        );
        res.json({valid:true});
    } catch (err) {
        if (err.code === "23505") {
            res.json({valid:false, reason:"User_Exists"});
            return;
        }
        console.error(err);
        res.json({valid:false, reason:"Server_Error"});
        return;
    }


});

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (!usernameRegex.test(username)){
        res.json({valid:false, reason:"wrong"});
        return;
    }

    const result = await pool.query(`
        SELECT password_hash
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

    res.json({
        valid: true
    });

});


(async (password) => {
    pool = await initpg(password);
    app.listen(PORT, () => {
        console.log(`Server runs on http://127.0.0.1:${PORT}`);
    });
})(process.env.PG_Password);

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
            password_hash TEXT NOT NULL
        )
    `)

    return pool;
}

