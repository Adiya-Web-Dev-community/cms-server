const router = require("express").Router();

const {
  createTemplate,
  createNewPage,
  addBottomData,
  fetchPagesOfTemplate,
  fetchTemplate,
  insertPageData,
  insertListItem,
  fetchAllTemplates,
  fetchTemplatesByCategory,
  changePageName,
  addUpdateListItemData,
} = require("../../controller/app/template");

router.post("/create-template", createTemplate);
router.post("/create-new-page/:templateId", createNewPage);
router.post("/addBottomData/:templateId", addBottomData);
router.get("/fetch-pages/:templateId", fetchPagesOfTemplate);
router.get("/fetch-template/:id", fetchTemplate);
router.post("/insert-page-data", insertPageData);
router.post("/insert-list-item", insertListItem);
router.get("/fetch-all-templates", fetchAllTemplates);
router.get("/fetch-templates-by-category/:category", fetchTemplatesByCategory);
router.patch("/change-page-name/:pageId", changePageName);
router.put("/add-update-list-data/:pageId/", addUpdateListItemData);

module.exports = router;
