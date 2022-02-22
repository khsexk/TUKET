const express = require('express');
const router = express.Router();
const http = require('../app');

router.post('/',  (req, res) => { // 아이디값 받았을 때 여기서 넘겨주면 된다. Add by YongsHub
    const room = req.body.room;
    console.log(room);
    res.render('chat', { room });
});

router.get('/*', (req, res) => {
    res.redirect('/');
})



module.exports = router;