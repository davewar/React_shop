const router = require('express').Router();
const Payments = require('../models/payments');
const User = require('../models/user')
const Product = require('../models/products')



module.exports.getPayments_get = async (req,res)=>{
    try{
        
        const payments = await Payments.find()

         res.status(200).json(payments)
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}

module.exports.createPayments_post = async (req,res)=>{

    
    try{

        
        const paymentID = req.body.paymentID;
        const address = req.body.address        
        const cart = req.body.cart

        const user = await User.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

        const {_id, name, email} = user;
       
         const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })

         await newPayment.save()

         cart.forEach(x=>{
             return updateStock(x._id,x.countInStock, x.count)
         })
         

        res.json({msg: "Payment Success!"})
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}

const updateStock = async (id, stock, count)=>{
    try{

       await Product.findOneAndUpdate({_id: id},{
                countInStock: stock - count
     })

    }catch(err){
        console.log(err.message)

    }
    
}