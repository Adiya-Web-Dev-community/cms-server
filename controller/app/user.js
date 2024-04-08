const Template = require("../../models/app//manager/template");
const UserProject = require("../../models/app/user/project");
const UserProjectPage = require("../../models/app/user/project-page");

//fetch all project of individual user
const fetchAllUserProjects = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.send({ success: false, msg: "User Id not found" });
  }
  try {
    const allProjects = await UserProject.find({ userId: req.accountId });
    return res.send({ list: allProjects, listLength: allProjects.length });
  } catch (err) {
    return res.send({ success: true, msg: `error: ${err.message}` });
  }
};

//fetch template data by id
const fetchProject = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.send({ success: false, msg: "Project id not found" });
  }
  try {
    const isProject = await UserProject.findOne({ _id: projectId })
      .populate("userId")
      .populate("pages");
    if (!isProject) {
      return res.send({ success: false, msg: "Project not found" });
    }

    return res.send({
      success: true,
      msg: "Template data fetch successfully",
      isProject,
    });
  } catch (err) {
    return res.send({ success: false, msg: `catch error: ${err.message}` });
  }
};

//create blank project
const createBlankProject = async (req, res) => {
  const { projectName, category } = req.body;
  if (!projectName) {
    return res.send({ success: false, msg: "Project name cannot be empty!" });
  }
  if (!category) {
    return res.send({
      success: false,
      msg: "Please select category to cretae new template",
    });
  }
  try {
    //create template
    const newProject = await UserProject.create({
      ...req.body,
      userId: req.accountId,
    });
    //create default home page
    const newPage = await UserProjectPage.create({
      title: "Home",
      projectId: newProject._id,
    });

    //add home page ID to template
    newProject.pages.push(newPage._id);
    await newProject.save();

    return res.send({
      success: true,
      msg: "New project and default home page created",
      newProject,
      newPage,
    });
  } catch (err) {
    return res.send({ success: false, msg: `catch error:${err.message}` });
  }
};

//create project from template
const createProjectFromTemplate = async (req, res) => {
  const { originalTemplateId } = req.body;

  //find original template first
  const originalTemplate = await Template.findOne({
    _id: originalTemplateId,
  }).populate("pages");

  //create new project for user by taking reference of template
  const newProject = new UserProject({
    projectName: originalTemplate.templateName,
    category: originalTemplate.category,
    appIcon: originalTemplate.appIcon,
    BottomTabData: originalTemplate.BottomTabData,
    userId: req.accountId,
    pages: [],
  });
  await newProject.save();

  for (let page of originalTemplate.pages) {
    const newPage = await UserProjectPage.create({
      title: page.title,
      data: page.data,
      projectId: newProject._id,
    });
    newProject.pages.push(newPage._id);
    await newProject.save();
  }
  return res.send({ newProject });
};

//add bottom data form template
const addBottomData = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.send({ success: false, msg: "Cannot find template Id" });
  }
  const { data } = req.body;
  try {
    const isProject = await UserProject.findOne({ _id: projectId });
    for (let obj of data) {
      isProject.BottomTabData.push(obj);
    }
    await isProject.save();
    return res.send({ success: true, msg: "Footer data saved", isProject });
  } catch (err) {
    return res.send({ success: false, msg: `error:${err.message}` });
  }
};

//change project title and appIcon
const changeProjectData = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.send({ success: false, msg: "Project Id not found" });
  }

  try {
    const isProject = await UserProject.findOne({ _id: projectId });
    if (req.body.projectName) {
      isProject.projectName = req.body.projectName;
      await isProject.save();
    }
    if (req.body.appIcon) {
      isProject.appIcon = req.body.appIcon;
      await isProject.save();
    }
    return res.send({
      success: true,
      msg: "Project has been updated",
      data: isProject,
    });
  } catch (err) {
    return res.send({ success: true, msg: `error:${err.message}` });
  }
};

//create new page
const createNewProjectPage = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.send({ success: false, msg: "Cannot find project id" });
  }
  const { title } = req.body;
  if (!title) {
    return res.send({ success: false, msg: "Please provide page title" });
  }

  try {
    //find template by id
    const isProject = await UserProject.findOne({ _id: projectId });
    const newPage = await UserProjectPage.create({
      title: title,
      projectId: projectId,
    });

    //add home page ID to template
    isProject.pages.push(newPage._id);
    await isProject.save();
    return res.send({ success: true, msg: "New page created", newPage });
  } catch (err) {
    return res.send({ suucess: true, msg: `error: ${err.message}` });
  }
};

//change page name
const changePageTitle = async (req, res) => {
  const { pageId } = req.params;
  if (!pageId) {
    return res.send({ success: false, msg: `Cannot find pageId` });
  }
  const { title } = req.body;
  if (!title || title === "") {
    return res.send({ success: false, msg: "Page title cannot be empty" });
  }

  try {
    const isPage = await UserProjectPage.findOneAndUpdate(
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

//insert page data
const insertPageData = async (req, res) => {
  const { projectId, pageId, insertData } = req.body;
  const randomId = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;
  try {
    const isPage = await UserProjectPage.findOne({
      $and: [{ projectId: projectId }, { _id: pageId }],
    });
    for (let obj of insertData) {
      isPage.data.push({ ...obj, id: randomId });
    }
    await isPage.save();
    return res.send({
      projectId,
      pageId,
      isPage,
      length: isPage.data.length,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error:${err.message}` });
  }
};

//delete subData
const deletePageData = async (req, res) => {
  const { pageId, subDataId } = req.body;
  try {
    const isPage = await UserProjectPage.findOne({ _id: pageId });
    if (!isPage) {
      return res.send({
        success: false,
        msg: "Page cannot found with give id",
      });
    }

    isPage.data = isPage.data.filter((obj) => obj.id !== subDataId);
    await isPage.save();
    return res.send({
      success: false,
      msg: "Data deleted successfully",
      isPage,
    });
  } catch (err) {
    return res.send({ success: false, msg: `error : ${err.message}` });
  }
};

//modify image /title of data
const modifyDataTitleAndImage = async (req, res) => {
  const { pageId, subDataId } = req.body;
  let updateData = {};
  if (req.body.image) {
    updateData.image = req.body.image;
  }
  if (req.body.title) {
    updateData.title = req.body.title;
  }
  try {
    const isPage = await UserProjectPage.findOne({ _id: pageId });
    const obj = isPage.data.find((obj) => obj.id === subDataId);
    if (req.body.title) {
      obj.title = req.body.title;
    }
    if (req.body.image) {
      obj.image = req.body.image;
    }
    await isPage.save();
    return res.send({ success: true, msg: "sub data found", isPage });
  } catch (err) {
    return res.send({ success: false, msg: `error :${err.message}` });
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
    const updatedPage = await UserProjectPage.findOneAndUpdate(
      filter,
      update,
      options
    );
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

module.exports = {
  fetchAllUserProjects,
  createBlankProject,
  createProjectFromTemplate,
  createNewProjectPage,
  insertPageData,
  deletePageData,
  modifyDataTitleAndImage,
  insertListItem,
  fetchProject,
  changeProjectData,
  changePageTitle,
  addBottomData,
};
