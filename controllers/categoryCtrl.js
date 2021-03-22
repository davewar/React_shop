const router = require('express').Router();
let Category = require('../models/category');


// router.route('/test1').get((req, res) => {
//   res.send("working")    
// });

module.exports.getCategories_get = async (req,res)=>{
    try{

        const categories = await Category.find()

         res.status(200).json(categories)
    }
    catch(err){
         return res.status(500).json({msg: err.message})

    }


}

module.exports.addCategories_post = async (req,res)=>{
    try{
         const name = req.body.name;
        const categories = await Category.find()
        if(category) return res.status(400).json({msg: "item already exists."})

        const newCategory = new Category({ name });
        await newCategory.save()

        res.status(200).json('item added')
    }
    catch(err){
         return res.status(500).json({msg: err.message})

    }


}

module.exports.deleteCategories_delete = async (req,res)=>{
    try{
         
     await Category.findByIdAndDelete(req.params.id)

        res.status(200).json('item deleted')
    }
    catch(err){
         return res.status(500).json({msg: err.message})

    }


}

module.exports.updateCategories_post = async (req,res)=>{
    try{
         const item = Category.findById(req.params.id)
         item.name = req.body.name;
         
         await item.save()
         res.status(200).json('item updated')

    }
    catch(err){
         return res.status(500).json({msg: err.message})

    }


}


