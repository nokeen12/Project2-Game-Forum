const router = require("express").Router();
const mongoose = require('mongoose');
const Guides = require('../models/Guide.model.js');
const Comments = require('../models/Comment.model.js');

//view all guides
router.get('/guides', (req,res,next)=>{
    Guides.find()
    .then((guide) =>res.render('./guides',{guide}))
})

//loads create guide page
router.get('/create', (req,res,next)=>{
    if(!req.session.currentUser){
        res.render('./profile/login', {errorMessage: 'Must be signed in to create a Post'})
    }else{
        res.render('./guides/create').catch(err=>console.log(err));
    }
})

//create guide
router.post('/guides/create', (req,res,next)=>{
    const {title, body} = req.body;
    var newGuide = Guides.create({
        creator: req.session.currentUser.username,
        title,
        body
    });
    res.redirect('/guides')
    .catch(err=>console.log(err));
})

//view guide
router.get('/guides/:id', (req,res,next)=>{
    Comments.find({guide: req.params.id})
    .then(commentsFound => {
        Guides.findById(req.params.id)
        .then(guide =>{ res.render('./guides/view', {guide, userInSession: req.session.currentUser, comments: commentsFound})})
    }).catch(err=>console.log(err))
})

//edit guide
router.get('/guides/:id/edit', (req,res,next)=>{
    Guides.findById(req.params.id)
        .then(guide =>{res.render('./guides/edit', {guide})})
        .catch(err=>console.log(err))
})

//post comment
router.post('/guides/:id/comment', (req,res,next)=>{
    Comments.create({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        commenter: req.session.currentUser.username,
        guide: req.params.id
    })
    Guides.findById(req.params.id)
        .then(thisGuide=>{
            res.redirect(`/guides/${thisGuide.id}`)})
        .catch(err=>console.log(err))
})

//edit comment
router.post('/guides/:id/:comId/edit', (req,res,next)=>{
    Comments.findByIdAndUpdate(req.params.comId, req.body)
        .then(()=>{
            res.redirect(`/guides/${req.params.id}`)
        }).catch(err=>console.log(err))
})

//delete comments
router.get('/guides/:id/:comId/delete', (req,res,next)=>{
    Comments.findByIdAndDelete(req.params.comId)
        .then(()=>res.redirect(`/guides/${req.params.id}`))
        .catch(err => console.log(err));
})
router.post('/guides/:id/:comId/delete', (req,res,next)=>{
    Comments.findByIdAndDelete(req.params.comId)
        .then(()=>res.redirect(`/guides/${req.params.id}`))
        .catch(err => console.log(err));
})
module.exports = router;