const { Router } = require('express');
const router = Router();
const books = require('../book.json');
const author = require('../author.json');
const _ = require('lodash');

router.get('/author', (req, res) => { res.json(author) });

router.post('/author', (req, res) => {
    const { id, name, lastname } = req.body;
    if (id && name && lastname) {
        const newAuthor = { ...req.body };
        author.push(newAuthor);
        res.json({ 'added': 'ok' });
    } else {
        res.status(400).json({ 'status code': 'Bad Request' });
    }
});

router.delete('/author/:id', (req, res) => {
    const id = req.params.id;
    _.remove(author, (author) => {
        return author.id == id
    });
    _.remove(books,(book) => {
        return book.authorId == id
    });
    res.json(author);
});

router.put('/author/:id', (req, res) => {
    const id = req.params.id;
    const { name, lastname } = req.body;
    _.each(author, (author) => {
        if (author.id == id) {
            author.name = name;
            author.lastname = lastname;
        }
    });
    res.json({ 'modified': 'ok' });
});

module.exports = router;