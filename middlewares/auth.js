const jwt = require('jsonwebtoken')

require('dotenv').config()

const auth = (req, res, next)=>{
    
    const token = req.header("Authorization")
    // console.log("AUTH HEADER AUTHORIZATION", token)
    if (!token) return res.status(400).json({msg: "Invalid Authentication"})

    try{
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
                    // console.log("AUTH MW -E",err);
                    // console.log("AUTH MW -DECODED",decoded);
                if(err){
                    return res.status(400).json({msg: "Invalid Authentication"})
                }

                req.user = decoded
                // console.log("AUTH MW - req.user",req.user);
                next()

        })

    }

    catch(err){
        console.log("Auth DW",err.message)
        res.status(500).json({msg: err.message, auth: false})

    }


    


}

module.exports = auth