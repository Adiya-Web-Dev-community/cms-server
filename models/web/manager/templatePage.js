const mongoose = require("mongoose");

const TemplatePageSchema = new mongoose.Schema({
  title: String,
  path: String,
  navigationId:{type:String},
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  styleInfo: {
    className: { type: mongoose.Schema.Types.Mixed, _id: false },
    inlineStyle: { type: mongoose.Schema.Types.Mixed, _id: false },
  },
  layout:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "layout",
    },
  ],
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
    },
  ],
});

const templatepage = mongoose.model("templatepage", TemplatePageSchema);
module.exports = templatepage;
