const router = require("express").Router();

const {
  createTemplate,
  createNewPage,
  addBottomData,
  fetchPagesOfTemplate,
  fetchTemplate,
  insertPageData,
  fetchPage,
  insertListItem,
  fetchAllTemplates,
  fetchTemplatesByCategory,
  changePageName,
  updateListItemData,
  fetchListItemsOfPageData
} = require("../../controller/app/template");

router.post("/create-template", createTemplate);

router.post("/create-new-page/:templateId", createNewPage);
router.post("/addBottomData/:templateId", addBottomData);
router.get("/fetch-pages/:templateId", fetchPagesOfTemplate);
router.get("/fetch-template/:id", fetchTemplate);
router.post("/insert-page-data", insertPageData);
router.get("/fetch-page/:pageId", fetchPage);
router.post("/insert-list-item", insertListItem);
router.get("/fetch-templete-list-items",fetchListItemsOfPageData)
router.get("/fetch-all-templates", fetchAllTemplates);
router.get("/fetch-templates-by-category/:category", fetchTemplatesByCategory);
router.patch("/change-page-name/:pageId", changePageName);
router.put("/add-update-list-data/:pageId/", updateListItemData);

module.exports = router;
