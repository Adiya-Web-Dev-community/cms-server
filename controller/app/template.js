const Template = require("../../models/app/manager/template");
const Page = require("../../models/app/manager/templatePage");

//create template
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
    //add home page to template
    newTemplate.pages.push({ title: "Home", id: newPage._id });
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
  const { templateId, pageId, insertData } = req.body;
  try {
    const isPage = await Page.findOne({
      $and: [{ templateId: templateId }, { _id: pageId }],
    });
    for (let obj of insertData) {
      const randomId = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;
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
  console.log(listItemData);
  try {
    const isPage = await Page.findOne({ _id: pageId });
    let found = false;
    for (let obj of isPage?.data) {
      if (obj.id === subDataId) {
        console.log("before", obj.ListItems);
        obj?.ListItems.push({ listItemData });
        console.log("after", obj.ListItems);
        found = true;
        break;
      }
    }

    if (!found) {
      return res.send({ success: false, msg: "Subdata not found" });
    }
    const updatedPageData = await isPage.save();
    // console.log(updatedPageData.data);
    return res.send(isPage);
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
    const populateTemplate = await Template.findOne({ _id: id }).populate({
      path: "pages",
      select: "-templateId", // Exclude the templateId field from the populated data
    });
    return res.send({
      // success: true,
      // msg: "Template data fetch successfully",
      // data: isTemplate,
      populateTemplate,
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
const addUpdateListItemData = async (req, res) => {
  console.log(req.params.pageId);
};

const Student = require("../../models/s");
const School = require("../../models/s");

const createSchool = async (req, res) => {
  const newSchool = await School.create(req.body);
  console.log(newSchool);
  return res.send(newSchool);
};
const newStudent = async (req, res) => {
  try {
    const { name, age, gender, schoolId } = req.body;

    // Create a new student
    const newStudent = await Student.create({ name, age, gender });

    // Add the student's ID to the corresponding school
    await School.findByIdAndUpdate(schoolId, {
      $push: { studentsId: newStudent._id },
    });

    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
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
  addUpdateListItemData,

  createSchool,
  newStudent,
};
