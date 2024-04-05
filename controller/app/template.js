const Template = require("../../models/app/manager/template");
const Page = require("../../models/app/manager/templatePage");

//create template
// const createTemplate = async (req, res) => {
//   const { templateName, category } = req.body;
//   if (!templateName) {
//     return res.send({ success: false, msg: "Template name cannot be empty!" });
//   }
//   if (!category) {
//     return res.send({
//       success: false,
//       msg: "Please select category to cretae new template",
//     });
//   }
//   try {
//     //create template
//     const newTemplate = await Template.create(req.body);
//     //create page
//     const newPage = await Page.create({
//       title: "Home",
//       templateId: newTemplate._id,
//     });
//     //add home page to template
//     newTemplate.pages.push({ title: "Home", id: newPage._id });
//     await newTemplate.save();
//     return res.send({
//       success: true,
//       msg: "New template and default home page created",
//       newTemplate,
//       newPage,
//     });
//   } catch (err) {
//     return res.send({ success: false, msg: ` error:${err.message}` });
//   }
// };

const createTemplate = async (req, res) => {
  const { templateName, category } = req.body;
  if (!templateName) {
    return res.send({ success: false, msg: "Template name cannot be empty!" });
  }
  if (!category) {
    return res.send({
      success: false,
      msg: "Please select category to cretae new template",
    });
  }
  try {
    //create template
    const newTemplate = await Template.create(req.body);
    //create page
    const newPage = await Page.create({
      title: "Home",
      templateId: newTemplate._id,
    });

    //add home page ID to template
    newTemplate.pages.push(newPage._id);
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
    console.log(isTemplate);
    const newPage = await Page.create({
      ...req.body,
      templateId: templateId,
    });
    //add home page ID to template
    isTemplate.pages.push(newPage._id);
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
  const { templateId, pageId, insertData } = req.body;
  const randomId = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;
  try {
    const isPage = await Page.findOne({
      $and: [{ templateId: templateId }, { _id: pageId }],
    });
    for (let obj of insertData) {
      isPage.data.push({ ...obj, id: randomId });
    }
    await isPage.save();
    return res.send({
      templateId,
      pageId,
      isPage,
      length: isPage.data.length,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error:${err.message}` });
  }
};

//insert list item
const insertListItem = async (req, res) => {
  const { pageId, subDataId, listItemData } = req.body;
  try {
    const filter = { _id: pageId, "data.id": subDataId };
    const update = {
      $push: { "data.$.ListItems": listItemData },
    };
    const options = { new: true };
    const updatedPage = await Page.findOneAndUpdate(filter, update, options);
    if (!updatedPage) {
      return res
        .status(404)
        .send({ success: false, msg: "Page or Subdata not found" });
    }

    return res.send(updatedPage);
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, msg: `error: ${err.message}` });
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
    const isTemplate = await Template.findOne({ _id: id }).populate("pages");
    if (!isTemplate) {
      return res.send({ success: false, msg: "Template not found" });
    }

    return res.send({
      success: true,
      msg: "Template data fetch successfully",
      isTemplate,
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

//fetch templates as per category
const fetchTemplatesByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    return res.send({ success: false, msg: "Catgeory not selected!" });
  }

  try {
    const allTemplates = await Template.find({ category: category });
    return res.send({
      success: true,
      msg: "List of templates fetched successfully",
      list: allTemplates,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error: ${err.message}` });
  }
};

//change page name
const changePageName = async (req, res) => {
  const { pageId } = req.params;
  if (!pageId) {
    return res.send({ success: false, msg: `Cannot find pageId` });
  }
  const { title } = req.body;
  if (!title || title === "") {
    return res.send({ success: false, msg: "Page title cannot be empty" });
  }

  try {
    const isPage = await Page.findOneAndUpdate(
      { _id: pageId },
      { title: title },
      { new: true }
    );
    return res.send({
      success: true,
      msg: "Page title successfully changed",
      isPage,
    });
  } catch (err) {
    return res.send({ success: true, msg: `error : ${err.message}` });
  }
};

//add/ update list item data
const updateListItemData = async (req, res) => {
  console.log(req.params.pageId);
};

module.exports = {
  createTemplate,
  createNewPage,
  addBottomData,
  insertPageData,
  insertListItem,
  fetchPagesOfTemplate,
  fetchTemplate,
  fetchAllTemplates,
  fetchTemplatesByCategory,
  changePageName,
  updateListItemData,
};
