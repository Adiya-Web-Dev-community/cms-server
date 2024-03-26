const router = require("express").Router();

const {
  createTemplate,
  createNewPage,
  addBottomData,
  fetchPagesOfTemplate,
  fetchTemplate,
  insertPageData,
} = require("../../controller/app/template");

router.post("/create-template", createTemplate);
router.post("/create-new-page/:templateId", createNewPage);
router.post("/addBottomData/:templateId", addBottomData);
router.get("/fetch-pages/:templateId", fetchPagesOfTemplate);
router.get("/fetch-template/:id", fetchTemplate);
router.post("/insert-page-data", insertPageData);

module.exports = router;
