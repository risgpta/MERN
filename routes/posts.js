const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/post',async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message : err});
    }
});

router.post('/post',(req,res,next) => {
    console.log(req.body);
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });

    post.save()
    .then(data => {
        res.json(data);
        console.log('success');
    })
    .catch(err => {
        res.json({
            message : err
        });
        console.log('error:'+err);
        next(err);
    });
    next();
});


module.exports = router;