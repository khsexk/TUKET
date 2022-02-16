const express = require('express');
const Post = require('../models/Post');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/home', async (req, res, next) => {
    try{
        const postlist = await Post.findAll();
        res.render('post', { postlist });
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/create', async (req, res, next) => {
    try{
        res.render('upload');   // 나중에 id 넘겨줘야함
    } catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/create', async (req, res, next) => {
    try{
        res.render('home');   // 나중에 id 넘겨줘야함
    } catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;