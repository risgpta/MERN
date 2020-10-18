const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('we are users');
});


router.get('/specific',(req,res) => {
    res.send('we are specific users');
});
module.exports = router;