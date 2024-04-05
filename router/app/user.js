const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
  fetchAllUserProjects,
  createBlankProject,
  createNewProjectPage,
  fetchProject,
  changeProjectData,
  changePageTitle,
  deleteSubData,
} = require("../../controller/app/user");

router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
router.post("/create-blank-project", createBlankProject);
router.get("/create-project-from-template", middleware, createBlankProject);
router.post("/create-new-project-page/:projectId", createNewProjectPage);
router.get("/fetch-project/:projectId", fetchProject);
router.patch("/change-project-data/:projectId", changeProjectData);
router.patch("/change-page-title/:pageId", changePageTitle);
router.delete("/delete-subData/subDataId", deleteSubData);
module.exports = router;
