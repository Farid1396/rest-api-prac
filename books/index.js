const { Router } = require('express');
const router = Router();
const author = require('./author.route');
const book = require('./book.route');


//route
router.use('/api', author);
router.use('/api', book);

module.exports = router;