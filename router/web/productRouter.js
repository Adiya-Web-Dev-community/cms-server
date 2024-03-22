const express = require('express')
const router = express.Router()
const middleware = require("../../middleware/account.js");
//controllers
const {
    createNewProduct,
    createNewPage,
    getProductsByAccountId,
    getProductDetails,
    addDropdownMenu,
    getDropDownmenu
} = require('../../controller/web/productController.js')


//routes
router.post("/create-product", middleware, createNewProduct);
router.post('/create-page', middleware, createNewPage)
router.get('/products-of-accountId', middleware, getProductsByAccountId);
router.get('/product-details', middleware, getProductDetails);
router.post('/add-dropdown', addDropdownMenu)

router.get("/nav-data",getDropDownmenu);
module.exports = router