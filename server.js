const express = require("express");
const readline = require("readline");
const path = require("path");
const { Client, Pool } = require("pg");
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


app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(router);

rl.on("line", (input) => {
    if (input == "stop") {
        console.log("Server wird beendet...");
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





(async (password) => {
    const pool = await initpg(password);
    app.listen(PORT, () => {
        console.log(`Server läuft auf http://127.0.0.1:${PORT}`);
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

