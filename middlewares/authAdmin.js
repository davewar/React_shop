const User = require('../models/user')

const authAdmin =async( req, res, next)=>{

    try{

        let id = req.user.id
        const user = await User.findById(id)

        if(user.role===0){
            return res.status(400).json({msg: "Access denied"})
        }


        next()

    }
    catch(err){
        console.log("Authadmin DW",err.message)
        res.status(500).json({msg: err.message})

    }


}

module.exports = authAdmin