// DEPENDENCIES =======================================
const fs = require('fs')
const path = require('path')
// DATABASE  ============================================
let db = require('./db/db.json')
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
    req.body.id = db.length.toString();
    db.push(newNote)
    console.log(db)
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) {
            return err
        }
        return res.json(newNote).send(200)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params
    const deleted = db.find(note => note.id === id)
    if (deleted) {
        db = db.filter(note => note.id !== id)
        res.sendStatus(200).json(deleted)
    } else {
        res.sendStatus(404)
    }
})

// LISTEN ==============================
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
})