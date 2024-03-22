const mongoose = require("mongoose");

// Define schema for the dataForTags array inside Home, Paintings, and Crafts
const ListItemSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: String,
});

// Define schema for Home, Paintings, and Crafts
const HomeSchema = new mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  ListItems: [ListItemSchema],
});

// Define schema for BottomTabData
const BottomTabSchema = new mongoose.Schema({
  name: String,
  size: Number,
  Page: String,
  id: String,
});

// Define schema for socialmedia array inside User
const SocialMediaSchema = new mongoose.Schema({
  platform: String,
  link: String,
});

// Define schema for User
const UserSchema = new mongoose.Schema({
  title: String,
  address: String,
  phone: String,
  email: String,
  socialmedia: [SocialMediaSchema],
});

// Define main schema
const templateSchema = new mongoose.Schema({
  id: Number,
  templateName: String,
  Home: HomeSchema,
  Paintings: HomeSchema,
  Crafts: HomeSchema,
  BottomTabData: [BottomTabSchema],
  User: UserSchema,
});

// Create and export the model
const templateModel = mongoose.model("app-template", templateSchema);
module.exports = templateModel;
