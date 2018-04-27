const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('GET users');
})

router.get('/:id', (req, res, next) => {
    res.send('GET user with id');
})

router.post('/', (req, res, next) => {
    res.send('create a user in db');
})

router.put('/:id', (req, res, next) => {
    res.send('update a user in db');
})

router.delete('/:id', (req, res, next) => {
    res.send('delete user from db');
})

module.exports = router;
