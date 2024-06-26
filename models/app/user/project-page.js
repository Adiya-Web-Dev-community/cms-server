const mongoose = require("mongoose");

const templatePageSchema = new mongoose.Schema({
  title: { type: String },
  screenshotImage: { type: String },
  data: { type: Array },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user-project",
  },
  //array of layout ids
  layout: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-project-layout",
    },
  ],
  // styling: [{ type: mongoose.Schema.Types.Mixed }],
  styling: { type: Object },
});

const PageModel = mongoose.model("user-project-page", templatePageSchema);
module.exports = PageModel;
