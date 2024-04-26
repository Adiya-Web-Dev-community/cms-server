const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
  fetchAllUserProjects,
  fetchProject,
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
} = require("../../controller/app/user");

//? check later token not wokring for native developer
router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
router.get("/fetch-project/:projectId", fetchProject);

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

module.exports = router;
