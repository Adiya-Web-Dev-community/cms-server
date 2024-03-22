const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/account.js");
const {
  createTemplate,
  getComponentById,
  updateTemplate,
  getTemplate,
  updateComponentByID,
  deleteTemplateByid,
  deleteComponentByid,
} = require("../../controller/web/template.js");

router.post("/create-templatepage", createTemplate);
router.get("/get-templatepage/:productId/:navId/:path", getTemplate);
router.get("/componentById/:id", getComponentById);
router.put("/updatetemplatepageByid/:id", updateTemplate);
router.put("/updateComponentById/:id", updateComponentByID);
router.delete("/deletetemplatepageById/:id", deleteTemplateByid);
router.delete("/deleteComponentById/:id", deleteComponentByid);

module.exports = router;
