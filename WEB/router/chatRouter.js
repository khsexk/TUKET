const express = require('express');
const router = express.Router();
const http = require('../app');

router.post('/',  (req, res) => {
    const room = req.body.room;
    console.log(room);
    res.render('chat', { room });
});

router.get('/*', (req, res) => {
    res.redirect('/');
})



module.exports = router;