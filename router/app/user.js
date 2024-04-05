const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
  fetchAllUserProjects,
  createBlankProject,
  createProjectFromTemplate,
  createNewProjectPage,
  fetchProject,
  changeProjectData,
  changePageTitle,
  deleteSubData,
} = require("../../controller/app/user");

//! router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
//! router.post("/create-blank-project",middleware, createBlankProject);
//! router.get("/create-project-from-template", middleware, createBlankProject);

//? check later token not wokring for native developer
router.get("/fetch-user-projects/:userId", fetchAllUserProjects);
router.post("/create-blank-project", createBlankProject);
router.post("/create-new-project-page/:projectId", createNewProjectPage);
router.get("/create-project-from-template", createProjectFromTemplate);
router.get("/fetch-project/:projectId", fetchProject);
router.patch("/change-project-data/:projectId", changeProjectData);
router.patch("/change-page-title/:pageId", changePageTitle);
router.delete("/delete-subData/:pageId/:subDataId", deleteSubData);
module.exports = router;
