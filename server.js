// DATABASE  ============================================
const db = require('./db/db.json')
// DEPENDENCIES =======================================
const fs = require('fs')
const path = require('path')
// EXPRESS =================================
const express = require('express')
const PORT = 3001 || process.env.PORT
const app = express()

// USE ==============================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET REQUESTS ======================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    return res.json(db)
});

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/index.html'));
});

// POST REQUESTS =======================================
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    db.push(newNote)
    return res.status(200).send('Your Note has been added!')
})

// LISTEN ==============================
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
})