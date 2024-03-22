const router = require("express").Router();

const { fetchTemplate } = require("../../controller/app/template");

router.get("/fetch-template/:id", fetchTemplate);

module.exports = router;
