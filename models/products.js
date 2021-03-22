const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

title:{
    type:String,
    required: [true, 'Please enter title'],
},
image:{
          type: String,  
    required: [true, 'Please supply image'],
},
 category: {
      type: String,
      required: true,
    },
description: {
    type: String,
    required: true,
},
  price: {
      type: Number,
      required: true,
      default: 0,
    },
 countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

},{
    timestamps: true 
})

const Product = mongoose.model('Product', productSchema)
  

module.exports = Product
               