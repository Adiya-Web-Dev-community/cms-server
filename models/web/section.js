const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: { type: String },
  varient: { type: String },
  data: [{ type: mongoose.Schema.Types.Mixed }],
  styleInfo: { type: mongoose.Schema.Types.Mixed },
});

const ProductModel = mongoose.model("section", sectionSchema);
module.exports = ProductModel;
