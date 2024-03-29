const mongoose = require("mongoose");

const templatePageSchema = new mongoose.Schema({
  title: String,
  data: { type: Array },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "app-template",
  },
});

const PageModel = mongoose.model("template-page", templatePageSchema);
module.exports = PageModel;
