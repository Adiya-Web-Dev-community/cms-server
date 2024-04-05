const Template = require("../../models/app//manager/template");
const UserProject = require("../../models/app/user/project");
const UserProjectPage = require("../../models/app/user/project-page");

//fetch all project of individual user
const fetchAllUserProjects = async (req, res) => {
  try {
    const allProjects = await UserProject.find({ userId: req.accountId });
    return res.send({ list: allProjects, listLength: allProjects.length });
  } catch (err) {
    return res.send({ success: true, msg: `error: ${err.message}` });
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

//fetch template data by id
const fetchProject = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.send({ success: false, msg: "Project id not found" });
  }
  try {
    const isProject = await UserProject.findOne({ _id: projectId }).populate(
      "pages"
    );
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

//change project title
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

//delete subData
const deleteSubData = async (req, res) => {
  const { pageId, subDataId } = req.params;
  console.log(deleteSubData);
};

module.exports = {
  fetchAllUserProjects,
  createBlankProject,
  createProjectFromTemplate,
  createNewProjectPage,
  fetchProject,
  changeProjectData,
  changePageTitle,
  deleteSubData,
};
