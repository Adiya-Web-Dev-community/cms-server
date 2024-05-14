const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
  fetchAllUserProjects,
  fetchProject,
  fetchPage,
  createBlankProject,
  createProjectFromTemplate,
  addBottomData,
  changeProjectData,
  createNewProjectPage,
  fetchListItemsOfPageData,
  insertPageData,
  changePageData,
  deletePageData,
  modifyDataTitleAndImage,
  insertListItem,
  deleteListItem,
  modifyListItemFields,
  changeTabDataStatus,
  addPageScreenshot,
  deleteProject,
} = require("../../controller/app/user");

//? check later token not wokring for native developer
router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
router.get("/fetch-project/:projectId", fetchProject);
router.get("/fetch-page-data-by-id/:pageId", fetchPage);
router.post("/create-blank-project", middleware, createBlankProject);
router.post(
  "/create-project-from-template",
  middleware,
  createProjectFromTemplate
);
router.post("/addBottomData/:projectId", addBottomData);
router.patch("/change-project-data/:projectId", changeProjectData);
//page data apis
router.post("/create-new-project-page/:projectId", createNewProjectPage);
router.get("/fetch-listItems/:pageId/:subDataId", fetchListItemsOfPageData);
router.post("/insert-project-page-data", insertPageData);
router.patch("/change-page-data/:pageId", changePageData);
router.delete("/delete-page-data", deletePageData);
router.patch("/modify-data-title-image", modifyDataTitleAndImage);
//page data ->list items apis
router.post("/insert-project-page-list-item", insertListItem);
router.delete("/delete-list-item", deleteListItem);
router.patch("/modify-list-item-field", modifyListItemFields);
router.patch("/change-tab-status", changeTabDataStatus);
router.patch("/page-screenshot", addPageScreenshot);
router.delete("/delete-project/:projectId", deleteProject);

module.exports = router;
