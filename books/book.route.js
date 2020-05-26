const { Router } = require('express');
const router = Router();
const books = require('../book.json');
const author = require('../author.json');
const _ = require('lodash');

router.get('/books', (req, res) => {
    _.each(books, (book) => {
        _.each(author, (author) => {
            if (book.authorId == author.id) {
                book.authorBook = author.name + ' ' + author.lastname;
            };
        });
    });
    res.json(books)
});

router.post('/books', (req, res) => {
    const { id, name, authorId } = req.body;
    if (id && name && authorId) {
        const newBook = { ...req.body };
        books.push(newBook);
        res.json({ 'added': 'ok' });
    } else {
        res.status(400).json({ 'status code': 'Bad Request' });
    }
});

router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    _.remove(books, (book) => {
        return book.id == id
    })
    res.json(books);
});

router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { name, authorId, authorBook } = req.body;
    _.each(books, (book) => {
        if (book.id == id) {
            book.name = name;
            book.authorId = authorId;
            book.authorBook = authorBook;
        }
    });
    res.json({ 'modified': 'ok' });
});

module.exports = router;