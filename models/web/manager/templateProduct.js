const mongoose = require('mongoose');
//! LEVELS: product-> item 1 -> item 2 -> item 3

//  Schema for the deepest level of nesting
const itemSchema3 = new mongoose.Schema({
    name: String,
    path: String,
    styleInfo: {
        type: mongoose.Schema.Types.Mixed,  // Allow any nested object structure
        _id: false // Avoid creating an _id field for the nested object
    },
});


const itemSchema2 = new mongoose.Schema({
    name: String,
    path: String,
    styleInfo: {
        type: mongoose.Schema.Types.Mixed,
        _id: false
    },
    items: [itemSchema3]
});


const itemSchema1 = new mongoose.Schema({
    name: String,
    type:String,
    path: String,
  
    styleInfo: {
        type: mongoose.Schema.Types.Mixed,
        _id: false
    },
    items: [itemSchema2], 
});

const templateProductSchema = new mongoose.Schema({
  navigationArr: [itemSchema1],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  thumbnail: { type: String },
  title: { type: String },
  views: { type: Number },
  likes: { type: Number },
  status: { type: String },
  category: { type: String },
  isCreatedByTemplate:{type:Boolean}
});


const templateProduct = mongoose.model('templateProduct', templateProductSchema);
module.exports = templateProduct;
