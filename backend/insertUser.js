const sqlite3=require('sqlite3').verbose();
const bcrypt=require('bcrypt');

const db= new sqlite3.Database('./database.db')

const insertUser= async () => {
    const username = 'test';
    const plainPassword= 'test123';
    const hashedPassword= await bcrypt.hash(plainPassword, 10);
    db.run(`INSERT INTO user (username, password) VALUES(?, ?)`, [username, hashedPassword], function(err){
        if(err){
            return console.error(err.message);
        }
        console.log(`User inserted successfully`);
    });
};

insertUser();
