const Product = require("../../models/web/client/product");
const Page = require("../../models/web/client/page")
const User = require("../../models/web/user");


//create new product with one default HOME page
const createNewProduct = async (req, res) => {
    const { title } = req.body
    try {
        //create new product
        const newProduct = await Product.create({
            createdBy: req.accountId,
            title: title ? title : 'Untitled'
        });

        //after creating new product one default- HOME page will be created with recently created product id
        const newPage = await Page.create({
            title: 'Home',
            path: '/',
            productId: newProduct?._id,
        });

        //todo page should also be update aur added in navigation arr
        const homePageNavigation = { title: 'Home', path: '/' }
        const updateProduct = newProduct
        updateProduct.navigationArr.push(homePageNavigation)
        await updateProduct.save()
        console.log(updateProduct)

        res.status(200).json({
            success: true,
            message: "product created successfully",
            newProduct,
            productId:newProduct._id
            // newPage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//create new page in product
const createNewPage = async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({ success: false, message: 'Please provide page name title' })
    }

    try {
        //find product by id
        const isProduct = await Product.findOne({ _id: req.body.productId }).populate('createdBy')
        if (!isProduct) {
            return res.status(400).json({ success: false, message: 'Cannot find product with give productId' })
        }

        //create new page in product
        const newPage = await Page.create({
            title: req.body.title,
            path: req.body.path,
            productId: req.body.productId,
        })

        //todo page should also be update aur added in navigation arr
        const newPageNavigation =  { title: req.body.title, path: req.body.path } 
        const updateProduct = isProduct
        isProduct.navigationArr.push(newPageNavigation)
        await updateProduct.save()
        return res.status(200).json({
            success: true,
            message: "new page created successfully",
            newPage,
            productData: isProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all products created by individual by his account id
const getProductsByAccountId = async (req, res) => {
    try {
        const data = await
            Product.find({ createdBy: req.accountId })
                .select('_id, title',);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get individual product detaisl as per product is and user id who created the product
const getProductDetails = async (req, res) => {
    try {
        const findProductData = Product.findOne({ createdBy: req.accountId, _id: req.query.productId });
        const findPageData = Page.find({ productId: req.query.productId })

        const data = await Promise.all([findProductData, findPageData])

        res.status(200).json({
            product: data[0],
            pages: data[1],
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//update navigate menu
const addDropdownMenu = async (req, res) => {
    try {
        const isProduct = await Product.findById(req.body.productId)
        if (!isProduct) {
            return res.status(500).json({
                suucess: false,
                message: 'Product unavailable'
            })
        }
        const dropdown = req.body.dropdown
        const updateProduct = isProduct
        updateProduct.navigationArr.push(dropdown)
        await updateProduct.save()
        console.log(updateProduct)
        res.status(200).json({
            success: true,
            message: 'dropdown menu updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//add layout in page
const addLayoutInPage = async (req, res) => {
    const { productId, pageId, layoutSection } = req.body
    if (!productId) {
        return res.status(404).json({ success: false, message: 'Please provide product ID' })
    }
    if (!pageId) {
        return res.status(404).json({ success: false, message: 'Please provide page ID' })
    }
    if (!layoutSection) {
        return res.status(404).json({ success: false, message: 'Please add layout section' })
    }

    const isPage = await Page.findOne({
        $and: [
            { _id: pageId },
            { productId: productId }
        ]
    })
    if (!isPage) {
        return res.status(400).josn({ suucces: false, message: "Product not found with this productId and PageId" })
    }

    try {
        isPage.layouts.push(req.body.layoutSection)
        await isPage.save()

    } catch (err) {
        return res.status(400).json({ suucess: false, message: err.message })
    }


}

const getDropDownmenu=async(req,res)=>{
    try{
        const product = await Product.findById(req.query.productId);
        

        if (!product) {
            return res.status(500).json({
                suucess: false,
                message: 'Product unavailable'
            })
        }
        res.status(200).json({
            success: true,
           data:product?.navigationArr
        });
    
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports = {
    createNewProduct,
    createNewPage,
    getProductsByAccountId,
    getProductDetails,
    addDropdownMenu,
    addLayoutInPage,
    getDropDownmenu,
    
} 
