// khsexk code
const express = require('express');

const User = require('../models/User');

const router = express.Router();



// 회원가입
router.get('/register', async (req, res, next) => {
    try{
        res.render('register');   // 나중에 id 넘겨줘야함
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try{
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
            create: Date.now(),
        }); 

        res.redirect('/');   // 나중에 id 넘겨줘야함
    } catch(err){
        console.error(err);
        next(err);
    }
});

// 로그인
router.get('/login', async (req, res, next) => {
    try{
        res.render('login');   // 나중에 id 넘겨줘야함
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const user = await User.findOne({
            where: { 
                email: req.body.email,
                password: req.body.password,
            },
        });
        
        if(!user){
            res.redirect('/');
        }
        else{
            global.nickname = user.nickname;
            global.email = user.email;
            res.render('post');
        }
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;