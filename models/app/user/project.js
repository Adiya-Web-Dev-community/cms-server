const mongoose = require("mongoose");

// Define main schema
const templateSchema = new mongoose.Schema({
  category: { type: String },
  projectName: { type: String },
  appIcon: { type: String },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "user-project-page" }], // Check this line
  BottomTabData: [{ type: mongoose.Schema.Types.Mixed }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// Create and export the model
const templateModel = mongoose.model("user-project", templateSchema);
module.exports = templateModel;
