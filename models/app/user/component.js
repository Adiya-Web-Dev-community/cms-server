const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  title: { type: String },
  varient: { type: Number },
  moveable: { type: Boolean, default: false },
  moveabledata: { type: mongoose.Schema.Types.Mixed },
  data: [{ type: mongoose.Schema.Types.Mixed }],
  style: { type: mongoose.Schema.Types.Mixed },
});

const ComponentModel = mongoose.model(
  "user-project-component",
  componentSchema
);
module.exports = ComponentModel;
