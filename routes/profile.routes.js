const router = require("express").Router();
const axios = require("axios");
const ApiService = require('../services/api.service')
const apiService = new ApiService();


// router.get('/sign-up',(req,res,next)=>{
//     apiService
//         .signUp()
//         .then(()=>{
//             res.render("profile/sign-up")
//         })
// })
router.get('/signup', (req,res,next)=>{
    // axios.get('localhost:3000')
    //     .then(()=>{
    //         res.render('/profile/sign-up')
    //     })
    //     .catch((err)=> console.log(err));
    res.render("./profile/signup")
})
router.get('/home', (req,res,next)=>{
    res.render('./index')
})


module.exports = router;