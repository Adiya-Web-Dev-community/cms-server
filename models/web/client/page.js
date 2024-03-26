const mongoose = require("mongoose");

const productPageSchema = new mongoose.Schema({
  title: String,
  path: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  styleInfo: {
    className: { type: mongoose.Schema.Types.Mixed, _id: false },
    inlineStyle: { type: mongoose.Schema.Types.Mixed, _id: false },
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
    },
  ],
});

const PageModel = mongoose.model("page", productPageSchema);
module.exports = PageModel;
