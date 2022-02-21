const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // req. -> 이메일, 닉네임, 비밀번호 DB create -> 로그인 처리작업
    res.render('home');
});



module.exports = router;
