const Section = require("../../models/web/section");
const template = require("../../models/web/manager/templatePage");
const Page = require("../../models/web/client/page");
const Product = require("../../models/web/client/product");


const createPage = async (req, res) => {
  try {
    const { productId } = req.params;

    const { title, path } = req.body;
    const isProduct = await Product.findById(productId);
    // console.log("Template data>>>>>>.", isProduct);

    if (!isProduct) {
      return res.status(500).json({
        suucess: false,
        message: "Product unavailable",
      });
    }
    const response = await Page.create({
      title: title,
      path: path,
      productId: productId,
    });
    console.log("Template data>>>>>>.", response);
    if (!response) {
      return res.status(404).json({ sucess: false, message: "Data not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllPages = async (req, res) => {
  try {
    const response = await Page.find({
      productId: req.params.productId,
    }).populate("sections");
    if (!response) {
      return res.status(404).json({ sucess: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPage = async (req, res) => {
  try {
    const {id}=req.params
    const response = await Page.findById(id).populate("sections");
    if (!response) {
      return res.status(404).json({ sucess: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};





module.exports = {
  createPage,
  getAllPages,
  getPage,

};
