const router = require('express').Router();
const db = 'db/db.json';
const fs = require('fs');
const uuid = require('uuid');

router.get('/', (req, res) => {
    const file = fs.readFileSync(db);
    console.log(`FILE: ${file}`);
    if (!file) {
        res.status(200).json([]);
        return;
    }
    const data = JSON.parse(file);
    res.status(200).json(data);
    return;
});

router.post('/', (req, res) => {   
    try {
        const file = fs.readFileSync(db);
        const data = JSON.parse(file);
        if (!req.body.title) {
            res.status(400).send('title is required');
        }
        if (!req.body.text) {
            res.status(400).send('text is required');
        }
        const note = {
            id: uuid.v4(),
            title: req.body.title,
            text: req.body.text
        };
        data.push(note);
        fs.writeFileSync(db, JSON.stringify(data));
        res.status(200).json(note);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/:noteId', (req, res) => {
    try {
        const file = fs.readFileSync(db);
        let data = JSON.parse(file);
        console.log(req.params.noteId)
        data = data.filter(element => element.id !== req.params.noteId);
        fs.writeFileSync(db, JSON.stringify(data));
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;