const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // 로그인 경로 접근했을 때 req.body .. 활용
    // 여기서 이메일이랑 비밀번호 받고, -> 디비에다가 조회를 해야겠지? 일치할 때
    res.render('home');
});

// 로그인을 성공했을 때 전역변수나, module이나 쿠키 - 세션 -> 로그인 해서 닉네임을 저장 //



module.exports = router;