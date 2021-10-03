// DEPENDENCIES =======================================
const fs = require('fs')
const {nanoid} = require('nanoid')
// DATABASE  ============================================
let db = require('../../db/db.json')
// ROUTER ==================================== 
const router = require('express').Router();
// GET REQUESTS ======================================
router.get('/notes', (req, res) => {
    return res.json(db)
});
// POST REQUESTS =======================================
router.post('/notes', (req, res) => {
    const newNote = req.body
    req.body.id = nanoid();
    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) {
            return res.sendStatus(500).send(err)
        }
        return res.json(newNote)
    })
})
// DELETE REQUESTS =====================================
router.delete('/notes/:id', (req, res) => {
    const { id } = req.params
    const deleted = db.find(note => note.id === id)
    if (deleted) {
        db = db.filter(note => note.id !== id)
        fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) {
                return res.sendStatus(500).send(err)
            }
            return res.sendStatus(204)
        })
    } else {
        return res.sendStatus(404).send("Note hasn't been found!")
    }
})

module.exports  = router