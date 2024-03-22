const express = require('express')
const router = express.Router();
const middleware = require("../../middleware/account");
const {
    getAllPages,
    getPage,
    createPage
} = require('../../controller/nativeController.js')

router.post("/create-page/:productId",createPage);
router.get("/get-pages/:productId",getAllPages);
router.get("/getpageById/:id",getPage);

module.exports = router