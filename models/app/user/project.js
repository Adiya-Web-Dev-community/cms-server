const mongoose = require("mongoose");

// Define main schema
const templateSchema = new mongoose.Schema({
  category: { type: String },
  projectName: { type: String },
  appIcon: { type: String },
  theme: { type: String },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "user-project-page" }], // Check this line
  BottomTabData: [{ type: mongoose.Schema.Types.Mixed, default: false }],
  showBottomTabData: { type: Boolean, default: true, enum: [true, false] },
  TopTabData: [{ type: mongoose.Schema.Types.Mixed }],
  showTopTabData: { type: Boolean, default: true, enum: [true, false] },
  listTabData: [{ type: mongoose.Schema.Types.Mixed }],
  showListTabData: { type: Boolean, default: true, enum: [true, false] },
  //array of layout ids
  layout:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-project-layout",
    },
  ],
  // styling:[{type:mongoose.Schema.Types.Mixed}],
  styling: { type: Object },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// Create and export the model
const templateModel = mongoose.model("user-project", templateSchema);
module.exports = templateModel;
