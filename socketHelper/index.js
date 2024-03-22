const Product = require("../models/client/product");
const Section = require("../models/section");
const template = require("../models/manager/templatePage");
const layout=require("../models/layout");

const addDropdownMenu = async (data,productId) => {
    try {
        console.log("data navbar????????>>>>",productId)
        const isProduct = await Product.findById(productId)
        if (!isProduct) {
            return data({
                suucess: false,
                message: 'Product unavailable'
            })
        }
        const updateProduct = isProduct
        updateProduct.navigationArr.push(data)
        await updateProduct.save();
        const response={
            success: true,
            message: 'dropdown menu updated successfully',
            data:isProduct?.navigationArr
        }
        return response;

    } catch (error) {
       return error
    }
}
const Delet_DropDown_By_Id = async (id,productId) => {
    try {
        
        const isProduct = await Product.findById(productId)
        console.log("data navbar????????>>>>",isProduct?.navigationArr?.filter((item)=>item?._id.toString()===id))
        if (!isProduct) {
            return data({
                suucess: false,
                message: 'Product unavailable'
            })
        }
   
    isProduct.navigationArr = isProduct.navigationArr.filter(item => item?._id.toString() !== id);

 
    await isProduct.save();

    console.log("after delete", isProduct?.navigationArr?.length);
        const response={
            success: true,
            message: 'dropdown menu updated successfully',
            data:isProduct?.navigationArr
        }
        return response;

    } catch (error) {
       return error
    }
}

const getDropDownmenu=async(productId)=>{
    try{
        const product = await Product.findById(productId);
       

        if (!product) {
            return data({
                suucess: false,
                message: 'Product unavailable'
            })
        }
        return data({
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

const Update_Nav_By_Id=async(data,id,productId)=>{
    try{
        const product = await Product.findById(productId);
        if(!product){
            return data({
                success:false,
                message:"Product Not Found ,"
            })
        }

        const indexToUpdate = product.navigationArr.findIndex((item) => item?._id.toString() === id);
        console.log("Item iN update >>>>>>>>>>>",indexToUpdate);
        if (indexToUpdate === -1) {
            return {
                success: false,
                message: "Item Not Found in navigationArr",
            };
        }
        product.navigationArr[indexToUpdate]={_id:id, ...data};
        await product.save();
        return {
            success: true,
            message: "Navigation updated successfully",
            data: product.navigationArr,
        };
      

    }catch(err){
        console.log("Error In Update Nav By ID",err);
    }
}


const Update_Comonent=async(data,id,productId)=>{
    try{
        const product = await Product.findById(productId);
        if(!product){
            return data({
                success:false,
                message:"Product Not Found ,"
            })
        }
        if(id){
            const data= await Section.findByIdAndUpdate(id,{...data},{new:true})
            const res=await Section.findById(id);
            return {
                success: true,
                message: "Updated data successfully",
                data: res,
            };
        }else{
            const createdSection = await Section.create({
               ...data
              });
              return {
                success: true,
                message: "Created section successfully",
                data: createdSection,
            };
        }
        
        
      

    }catch(err){
        console.log("Error In Update Nav By ID",err);
    }
}

const Update_LayoutType = async (data, productId, navId, path) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return data({
        success: false,
        message: "Product Not Found ,",
      });
    }
console.log("data type>>",data);
    const response = await template.find({ navigationId: navId });

    const res1 = await Promise.all(
      data?.value?.map(async (sectionData) => {
        const { rowStart, colStart, rowEnd, colEnd, component } = sectionData;

        return {
          rowStart: rowStart,
          colStart: colStart,
          rowEnd: rowEnd,
          colEnd: colEnd,
        
        };
      })
    );

    const lay = new layout({
      type: data?.name,
      data: res1,
      styleInfo: data?.styleInfo || null,
    });
    const res2 = await lay.save();
    const layoutid = res2._id;
    const updatedTemplate = await template.findByIdAndUpdate(
      response[0]?._id,
      { $push: { layout: layoutid } },
      { new: false }
    );
 
    const response1 = await template
      .findById(response[0]?._id).populate("layout").populate('sections');
   
    if (updatedTemplate)
      return {
        success: true,
        message: "Created section successfully",
        data: response1,
      };
  } catch (err) {
    console.log("Error In Update Nav By ID", err);
  }
};

const Update_Layout_data = async (data, productId, navId, layoutId) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return data({
          success: false,
          message: "Product Not Found ,",
        });
      }
      const updatedLayout = await layout.findByIdAndUpdate(layoutId, { data: data }, { new: true });

      if (!updatedLayout) {
        return {
          success: false,
          message: "Layout Not Found",
        };
      }
      const response1 = await template
      .find({ navigationId: navId }).populate("layout").populate('sections');
      return {
        success: true,
        message: "Layout data updated successfully",
        data: response1[0],
      };

    } catch (err) {
      console.log("Error In Update Nav By ID", err);
    }
  };
module.exports = {addDropdownMenu,getDropDownmenu,Delet_DropDown_By_Id,Update_Nav_By_Id,Update_Comonent,Update_LayoutType,Update_Layout_data};