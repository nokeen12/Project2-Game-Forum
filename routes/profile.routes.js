const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model.js');


router.get('/signup', (req,res,next)=>{
    res.render("./profile/signup")
})

router.post('/signup', (req,res,next) =>{
    const { username, email, password } = req.body;
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            User.create({
                username,
                email,
                passwordHash: hashedPassword,
            });
        })
        .then(() => res.redirect('/login'))
        .catch(err => next(err))
})

router.get('/login', (req,res,next)=>{
    res.render('./profile/login')
})

router.post('/login', (req,res,next)=>{
    const { username, password} = req.body;
    if(username === '' || password === ''){
        res.render('./profile/login', {
            errorMessage: 'Please enter both username and password to login.'
        })
        return;
    }

    User.findOne({ username })
        .then(user => {
            if(!user){
                res.render('./profile/login', {errorMessage: 'Username is not registered. Try with other username.'});
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)){
                req.session.currentUser = user;
                res.redirect('/profile');
            } else {
                res.render('./profile/login', { errorMessage: 'Incorrent password.'})
            }
        })
        .catch(error => next(error));
})

router.get('/profile', (req,res,next)=>{
    if(!req.session.currentUser){
        res.redirect('/login')
    }else{
        console.log(req.session.currentUser.isAdmin)
        res.render('./profile/profile', {userInSession: req.session.currentUser})
    }
})

router.post('/logout',(req,res,next)=>{
    req.session.destroy(err =>{
        if (err) next(err);
        res.redirect('/');
    }).catch(err=>console.log(err))
});
module.exports = router;