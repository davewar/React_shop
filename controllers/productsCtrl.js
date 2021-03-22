const router = require('express').Router();
let Product = require('../models/products');



module.exports.getProducts_get = async (req,res)=>{
    try{

        const products = await Product.find()

         res.status(200).json(products)
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}

module.exports.addproducts_post = async (req,res)=>{

    
    try{
        const title = req.body.title;
        const image = req.body.image;
        const category = req.body.category;
        const description = req.body.description
        const price = req.body.price
        const countInStock = req.body.countInStock



        const newProduct = new Product({
            title,
            image ,
            category ,
            description ,
            price ,
            countInStock,
        });

        await newProduct.save()

        res.status(200).json('item added')
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}


module.exports.deleteProduct_delete = async (req,res)=>{
    console.log(req.params.id)
    try{

         await Product.findByIdAndDelete(req.params.id)

        res.status(200).json('item deleted')
    }
    catch(err){
         return res.status(400).json({msg: err.message})

    }


}

module.exports.updateProduct_post = async (req,res)=>{
    console.log("HERE")
    console.log(req.params.id)
    try{

            let title = req.body.title;
            let image = req.body.image;
            let category = req.body.category;
            let description = req.body.description
            let price = req.body.price
            let countInStock = req.body.countInStock

            await Product.findOneAndUpdate( { _id: req.params.id},{
                    title,image,category,description,price,countInStock
            })  
           
            res.status(200).json('item updated')

    }
    catch(err){
         return res.status(500).json({msg: err.message})

    }


}


