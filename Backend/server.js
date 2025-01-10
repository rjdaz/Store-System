const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    return res.json("Hello World");
});

//create
app.post('/prod', (req, res) => {
    const { name, investment, num_invest, wholesale, num_wsale, retail, num_retail } = req.body;

    const sqlInsert = "INSERT INTO store (name, investment, num_invest, wholesale, num_wsale, retail, num_retail) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [name, investment, num_invest, wholesale, num_wsale, retail, num_retail], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: err });
        }
        return res.json("Data inserted successfully");
    });
});

//read
app.get('/prod', (req, res) => {
    const sqlSelect = "SELECT * FROM store";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: err });
        }
        return res.json(result);
    });
});

//update
app.patch('/prod/:id', (req, res) => {
    const { id } = req.params;
    const { name, investment, num_invest, wholesale, num_wsale, retail, num_retail } = req.body;

    const sqlUpdate = "UPDATE store SET name = ?, investment = ?, num_invest = ?, wholesale = ?, num_wsale = ?, retail = ?, num_retail = ? WHERE id = ?";
    db.query(sqlUpdate, [name, investment, num_invest, wholesale, num_wsale, retail, num_retail, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: err });
        }
        return res.json("Data updated successfully");
    });
});

//delete
app.delete('/prod/:id', (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM store WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: err });
        }
        return res.json("Data deleted successfully");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});