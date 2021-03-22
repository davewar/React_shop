// const router = require('express').Router();
let User = require('../models/user');
let Payments = require('../models/payments');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

//create token - 15 mins
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "900s"
  });
};

//1day
const createRefeshToken = (id) => {
  return jwt.sign({ id }, process.env.REFESH_SECRET_KEY, {
    expiresIn: "1d"
  });
};

//email string valid ?
const isEmail = (email) => { 
    return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
} 


module.exports.login_post = async (req,res)=>{
    try{

        const {email, password} = req.body

         //form validations
        if( !email || !password) return res.status(400).json({errors: "Incorrect login. Please try again"})
        if(password.length < 6)  return res.status(400).json({errors: "Password is at least 6 characters long."})
        if(!isEmail(email)) return res.status(400).json({errors: "Email is not valid. Please re-enter your email address"})

        //is there a user
        const user = await User.findOne({email})
        
        if(!user) return res.status(400).json({errors: "Incorrect login. Please try again"})

        //check password
        const isMatch  = await bcrypt.compare(password, user.password)
       
        if(!isMatch) return res.status(400).json({errors: "Incorrect login. Please try again"})
        
        //create tokens
        const accesstoken = createToken(user._id)
        const refreshToken = createRefeshToken(user._id)

        //all gd
        res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 1*24*60*60*1000 // 1d
            })

        res
        .status(200).send({ accesstoken, user: { id: user._id, name: user.name } });



    }
    catch(err){
        
            res.status(400).json({errors: err.message})

    }


}



module.exports.signup_post = async (req,res)=>{


    try{

            const {name, email, password} = req.body;
            
            //form validations
            if(!name || !email || !password) return res.status(400).json({errors: "Incorrect login. Please try again"})
            if(password.length < 6)  return res.status(400).json({errors: "Password is at least 6 characters long."})
            if(!isEmail(email)) return res.status(400).json({errors: "Email is not valid. Please re-enter your email address"})


            //check if user exists
            const user = await User.findOne({email})
            
             if(user) return res.status(400).json({errors: "Account already exists"})

            //hashpassword
            const hashpassword = await bcrypt.hash(password,10)                  

            const newUser = new User({ name,  email, password: hashpassword})     
            
            await newUser.save() 
            //create tokens
            const accesstoken = createToken(newUser._id)
            const refreshToken = createRefeshToken(newUser._id)

            //all gd
            res
            .cookie('refreshtoken', refreshToken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 1*24*60*60*1000 // 1d
                })
            res
           
            .status(200).send({ accesstoken, user: { id: newUser._id , name: newUser.name } });

            
    }
    catch(err){
              
             res.status(400).json({errors: err.message})

    }


}

module.exports.logout_get = async (req,res)=>{
    try{

        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})

    }
    catch(err){
        
         res.status(400).json({msg: err.message})

    }


}

//delete user -admin
module.exports.deleteUser_delete = async (req,res)=>{
    try{
                    
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json('user deleted')
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}


// does user have a cookie, if yes give them a new access token
module.exports.refreshToken_get = async (req,res)=>{
    try{
            
            // console.log(req.cookies.refreshtoken)
        const refresh_token = req.cookies.refreshtoken;
                    // console.log("refreshToken_get - RT sent",refresh_token)
        if(!refresh_token) return res.status(400).json({msg: "Please Login or Register -a"})

        jwt.verify(refresh_token, process.env.REFESH_SECRET_KEY, (err, decoded) =>{
                    // console.log(" refreshToken_get Cookie Valid - E",err)
                    // console.log(" refreshToken_get Cookie Valid - DECODED",decoded)
                if(err) return res.status(400).json({msg: "Please Login or Register -b"})

                const accesstoken = createToken(decoded.id)
                // console.log("refreshToken_get NEW AT", accesstoken)
                res.status(200).json({accesstoken})
            })

    }
    catch(err){
        
         res.status(400).json({msg: err.message})

    }


}



module.exports.getUser_get = async (req,res)=>{
    try{
            // console.log("getUser_get a",req.user.id);
            const user = await User.findById(req.user.id).select('-password')
            // console.log("getUser_get", user);
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
     
    }
    catch(err){
        
         res.status(400).json({msg: err.message})

    }


}



module.exports.history_get = async (req,res)=>{
    try{

            // console.log("history_get",req.user.id);

            const history = await Payments.find({user_id: req.user.id})
            // console.log("history",history);
            res.json(history)
     
    }
    catch(err){
        
         res.status(400).json({msg: err.message})

    }


}