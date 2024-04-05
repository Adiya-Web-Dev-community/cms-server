const router = require("express").Router();
const {
  createProject,
  createNewPage,
  fetchProject,
  changeProjectData,
  changePageName,
} = require("../../controller/app/user");

router.get("/create-project", createProject);
router.post("/create-new-page/:projectId", createNewPage);
router.get("/fetch-project/:projectId", fetchProject);
router.patch("/change-project-data/:projectId", changeProjectData);
router.patch("/change-page-name/:pageId", changePageName);

// router.post("/addBottomData/:templateId", addBottomData);
// router.get("/fetch-pages/:templateId", fetchPagesOfTemplate);
// router.post("/insert-page-data", insertPageData);
// router.post("/insert-list-item", insertListItem);
// router.get("/fetch-all-templates", fetchAllTemplates);
// router.get("/fetch-templates-by-category/:category", fetchTemplatesByCategory);
// router.put("/add-update-list-data/:pageId/", updateListItemData);

module.exports = router;
