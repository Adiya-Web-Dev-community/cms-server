const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
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
} = require("../../controller/app/user");

//? check later token not wokring for native developer
router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
router.get("/fetch-project/:projectId", fetchProject);

router.post("/create-blank-project", middleware, createBlankProject);
router.get(
  "/create-project-from-template",
  middleware,
  createProjectFromTemplate
);
router.post("/addBottomData/:projectId", addBottomData);
router.patch("/change-project-data/:projectId", changeProjectData);
//page data apis
router.post("/create-new-project-page/:projectId", createNewProjectPage);
router.post("/insert-project-page-data", insertPageData);
router.patch("/change-page-title/:pageId", changePageTitle);
router.delete("/delete-page-data", deletePageData);
router.patch("/modify-data-title-image", modifyDataTitleAndImage);
//page data ->list items apis
router.post("/insert-project-page-list-item", insertListItem);

module.exports = router;
