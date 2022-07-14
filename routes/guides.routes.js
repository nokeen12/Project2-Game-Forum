const router = require("express").Router();
// const axios = require("axios");
const Guides = require('../models/Guide.model.js');
const Comments = require('../models/Comment.model.js');
const ApiService = require('../services/api.service');
const apiService = new ApiService();

router.get('/guides', (req,res,next)=>{
    Guides.find()
    .then((guide) =>res.render('./guides',{guide}))
    // res.render('./guides', {guides: Guides})
    // console.log(Guides)
})

router.get('/create', (req,res,next)=>{
    if(!req.session.currentUser){
        res.render('./profile/login', {errorMessage: 'Must be signed in to create a Post'})
    }else{
        res.render('./guides/create')
    }
})

router.post('/guides/create', (req,res,next)=>{
    const {title, body} = req.body;
    var newGuide = Guides.create({
        creator: req.session.currentUser.username,
        title,
        body
    });
    res.redirect('/guides');
})

router.get('/guides/:id', (req,res,next)=>{
    Guides.findById(req.params.id)
        .then(guide =>{ res.render('./guides/view', {guide, userInSession: req.session.currentUser})})
})
router.get('/guides/:id/edit', (req,res,next)=>{
    Guides.findById(req.params.id)
        .then(guide =>{res.render('./guides/edit', {guide})})
})

router.post('/guides/:id/comment', (req,res,next)=>{
    var newComment = {
        comment: req.body.comment,
        commenter: req.session.currentUser.username
    };
    Guides.findById(req.params.id)
        .then(thisGuide=>{
            thisGuide.comments.push(newComment)
            thisGuide.save()
            res.redirect(`/guides/${thisGuide.id}`)})
        .catch(err=>console.log(err))
})
// router.get('/guides/:id/comment/delete', (req,res,next)=>{
//     Guides.findById(req.params.id)
//         .then(thisGuide=>{
//             thisGuide.delete()
//             res.redirect(`/guides/${thisGuide.id}`)})
//         .catch(err=>console.log(err))
// })
// router.get('/guides/:id/delete', (req,res,next)=>{
//     Guides.findById(req.params.id)
//         .then(guide =>{res.render('./guid', {guide})})
// })
module.exports = router;