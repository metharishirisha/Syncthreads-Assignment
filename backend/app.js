const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const dbPath = path.join(__dirname, 'database.db');
const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 4000;

let db = null;

// Initialize Database and Server
const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        // Create Tables if not exist
        await db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );`);
        
        await db.run(`CREATE TABLE IF NOT EXISTS dashboard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT
        );`);
        
        await db.run(`CREATE TABLE IF NOT EXISTS map (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            center_lat REAL,
            center_lng REAL,
            zoom INTEGER
        );`);

        app.listen(PORT, () => {
            console.log("✅ Server is running on http://localhost:4000");
        });
    } catch (e) {
        console.error(`❌ Error: ${e.message}`);
        process.exit(1);
    }
};

initializeDbAndServer();

// Middleware: Authenticate JWT Token
const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(401).json({ error: "Token required" });
    }
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'MY_SECRET_TOKEN', (error, payload) => {
        if (error) {
            return response.status(403).json({ error: "User not logged in" });
        }
        request.user = payload;
        next();
    });
};

// ✅ Fixed User Login API
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }

        // Fetch user from the database
        const user = await db.get("SELECT * FROM user WHERE username = ?", [username]);

        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        //console.log("User Found:", user.username);
        //console.log("Entered Password:", password);
        //console.log("Stored Hashed Password:", user.password);

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username }, "MY_SECRET_TOK0EN", { expiresIn: "1h" });
        res.json({ token });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Dashboard API (Protected)
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const dashboardData = await db.all(`SELECT * FROM dashboard`);
        res.json(dashboardData);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Map API (Protected)
app.get('/api/map', authenticateToken, async (req, res) => {
    try {
        const mapData = await db.get(`SELECT * FROM map LIMIT 1`);
        if (!mapData) {
            return res.status(404).json({ error: "Map data not found" });
        }
        res.json(mapData);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
