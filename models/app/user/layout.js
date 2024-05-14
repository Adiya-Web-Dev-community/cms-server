const mongoose = require("mongoose");

const userProjectLayoutSchema = new mongoose.Schema({
  title: { type: String },
  component: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-project-component",
    },
  ],
});

const UserProjectLayoutModel = mongoose.model(
  "user-project-layout",
  userProjectLayoutSchema
);
module.exports = UserProjectLayoutModel;
