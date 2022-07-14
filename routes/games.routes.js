const router = require("express").Router();
const Games = require('../models/Game.model.js');
const Guides = require('../models/Guide.model.js');
const User = require('../models/User.model.js');
const ApiService = require('../services/api.service');
const apiService = new ApiService();

router.get('/games', (req,res,next)=>{
    Games.find()
        .then((game)=>res.render('./games/index', {game}))
        .catch(err => console.log(err))
})
router.get('/games/add', (req,res,next)=>{
    res.render('./games/add')
    .catch(err => console.log(err))
})
router.post('/games/add',(req,res,next)=>{
    const {title, developers, publishers, composers, genre, platforms, description} = req.body;
    var newGame = Games.create({
        title,
        titleLink: title.split(' ').join(''),
        developers,
        publishers,
        composers,
        genre,
        platforms,
        description
    }).catch(err => console.log(err));
    res.redirect('/games')
    .catch(err => console.log(err));
})

router.get('/games/:titleLink',(req,res,next)=>{
    Games.findOne({titleLink: req.params.titleLink})
        .then(game => {
            Guides.find({gameTitle: game.title})
            .then(guide =>
                res.render('./games/view', {game, guide, userInSession: req.session.currentUser}))})
                .catch(err => console.log(err))
})

router.get('/games/:titleLink/edit', (req,res,next)=>{
    Games.findOne({titleLink: req.params.titleLink})
        .then(game=>res.render('./games/edit', {game}))
        .catch(err => console.log(err))
})

router.post('/games/:titleLink/edit', (req,res,next)=>{
    Games.findOneAndUpdate({titleLink: req.params.titleLink}, req.body)
    .catch(err => console.log(err))
})

router.get('/games/:titleLink/delete', (req,res,next)=>{
    Games.findOneAndDelete({titleLink: req.params.titleLink})
        .then(game=>res.render('./games/edit', {game}))
        .catch(err => console.log(err))
})

router.post('/games/:titleLink/delete', (req,res,next)=>{
    Games.findOneAndDelete({titleLink: req.params.titleLink})
    .then(() => res.redirect('/games'))
    .catch(err => console.log(err))
})
module.exports = router;