const Template = require("../../models/app/manager/template");
const Page = require("../../models/app/manager/templatePage");

//create template
const createTemplate = async (req, res) => {
  const { templateName } = req.body;
  if (!templateName) {
    return res.send({ success: false, msg: "Template name cannot be empty!" });
  }
  try {
    //create template
    const newTemplate = await Template.create(req.body);
    //create page
    const newPage = await Page.create({
      title: "Home",
      templateId: newTemplate._id,
    });
    //add home page to template
    newTemplate.pages.push("Home");
    await newTemplate.save();
    return res.send({
      success: true,
      msg: "New template and default home page created",
      newTemplate,
      newPage,
    });
  } catch (err) {
    return res.send({ success: false, msg: ` error:${err.message}` });
  }
};

//create new page
const createNewPage = async (req, res) => {
  const { templateId } = req.params;
  if (!templateId) {
    return res.send({ success: false, msg: "Cannot find template id" });
  }
  const { title } = req.body;
  if (!title) {
    return res.send({ success: false, msg: "Please provide page title" });
  }

  try {
    //find template by id
    const isTemplate = await Template.findOne({ _id: templateId });
    const newPage = await Page.create({
      ...req.body,
      templateId: templateId,
    });
    isTemplate.pages.push({ title: title, id: newPage._id });
    await isTemplate.save();
    return res.send({ success: true, msg: "New page created", newPage });
  } catch (err) {
    return res.send({ suucess: true, msg: `error: ${err.message}` });
  }
};

//add bottom data form template
const addBottomData = async (req, res) => {
  const { templateId } = req.params;
  if (!templateId) {
    return res.send({ success: false, msg: "Cannot find template Id" });
  }
  const { data } = req.body;
  try {
    const isTemplate = await Template.findOne({ _id: templateId });
    for (let obj of data) {
      isTemplate.BottomTabData.push(obj);
    }
    await isTemplate.save();
    return res.send({ success: true, msg: "Footer data saved", isTemplate });
  } catch (err) {
    return res.send({ success: false, msg: `error:${err.message}` });
  }
};

//insert page data
const insertPageData = async (req, res) => {
  const { templateId, pageId, data } = req.body;
  try {
    const isPage = await Page.findOne({
      $and: [{ templateId: templateId }, { _id: pageId }],
    });
    isPage.data = data;
    await isPage.save();
    return res.send({ templateId, pageId, isPage });
  } catch (err) {
    return res.send({ success: false, msg: `error:${err.message}` });
  }
};

//get all pages of template
const fetchPagesOfTemplate = async (req, res) => {
  const { templateId } = req.params;
  try {
    const pagesArr = await Page.find({ templateId: templateId });
    return res.send({
      success: true,
      msg: "Successfully fetched pages",
      pagesArr,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error: ${err.message}` });
  }
};

//fetch template data by id
const fetchTemplate = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send({ success: false, msg: "template id not found" });
  }
  try {
    const isTemplate = await Template.findOne({ _id: id });
    if (!isTemplate) {
      return res.send({ success: false, msg: "Template not found" });
    }
    return res.send({
      success: true,
      msg: "Template data fetch successfully",
      data: isTemplate,
    });
  } catch (err) {
    return res.send({ success: false, msg: `catch error: ${err.message}` });
  }
};

//fetch all templates
const fetchAllTemplates = async (req, res) => {
  try {
    const allTemplates = await Template.find({});
    return res.send({
      success: true,
      msg: "all templates fetch successfully",
      list: allTemplates,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error ${err.message}` });
  }
};

module.exports = {
  createTemplate,
  createNewPage,
  addBottomData,
  insertPageData,
  fetchPagesOfTemplate,
  fetchTemplate,
  fetchAllTemplates,
};
