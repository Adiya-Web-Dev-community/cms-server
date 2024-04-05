const router = require("express").Router();
const middleware = require("../../middleware/account");

const {
  fetchAllUserProjects,
  createBlankProject,
  createNewProjectPage,
  fetchProject,
  changeProjectData,
  changePageTitle,
} = require("../../controller/app/user");

router.get("/fetch-user-projects", middleware, fetchAllUserProjects);
router.post("/create-blank-project", createBlankProject);
router.get("/create-project-from-template", middleware, createBlankProject);
router.post("/create-new-project-page/:projectId", createNewProjectPage);
router.get("/fetch-project/:projectId", fetchProject);
router.patch("/change-project-data/:projectId", changeProjectData);
router.patch("/change-page-title/:pageId", changePageTitle);

// router.post("/addBottomData/:templateId", addBottomData);
// router.get("/fetch-pages/:templateId", fetchPagesOfTemplate);
// router.post("/insert-page-data", insertPageData);
// router.post("/insert-list-item", insertListItem);
// router.get("/fetch-all-templates", fetchAllTemplates);
// router.get("/fetch-templates-by-category/:category", fetchTemplatesByCategory);
// router.put("/add-update-list-data/:pageId/", updateListItemData);

module.exports = router;
