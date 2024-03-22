const Section = require("../../models/web/section");
const template = require("../../models/web/manager/templatePage");
const Page = require("../../models/web/client/page");
const Product = require("../../models/web/client/product");
const createTemplate = async (req, res) => {
  try {
    const { title, styleInfo,path, sections,productId,navigationId } = req.body;
    const product=await Product.findById(productId);
    console.log("productId",productId,navigationId,path)
    if(!product){
      return res.status(402).json({ success: false, message: "Product Not Found" });
    }
    if(sections){
    const res1 = await Promise.all(
      sections?.map(async (sectionData) => {
        const { title, variant, data, styleInfo } = sectionData;
        const createdSection = await Section.create({
          title: title,
          variant: variant,
          data: data,
          styleInfo: styleInfo,
        });
        return createdSection._id;
      })
    );
    // console.log("Template data>>>>>>.", res1);
    const res2 = await template.create({
      title:title,
      path:path,
      navigationId:navigationId,
      productId:productId,
      styleInfo:styleInfo,
      sections: res1
    })
    return res.status(201).json({ success: true, message: "Template Created",data:res2 });
  }
  const resp = await template.create({
    title:title,
    path:path,
    navigationId:navigationId,
    productId:productId,
    styleInfo:styleInfo,

  })
  return res.status(201).json({ success: true, message: "Template Created",data:resp });
    
  
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    const { title, pageName, styleInfo, sections } = req.body;

    const updatedSections = await Promise.all(
      sections.map(async (sectionData) => {
        const { title, variant, data, styleInfo } = sectionData;
        console.log("sectionData  data:", sectionData);
        if (sectionData._id) {
          const updatedSection = await Section.findByIdAndUpdate(
            sectionData._id,
            { title, variant, data, styleInfo },
            { new: false }
          );
          return updatedSection._id;
        } else {
          const createdSection = await Section.create({
            title: title,
            variant: variant,
            data: data,
            styleInfo: styleInfo,
          });
          return createdSection._id;
        }
      })
    );

    console.log("Updated Template data:", updatedSections);
    const updatedTemplate = await template.findByIdAndUpdate(
      templateId,
      {
        title: title,
        pageName: pageName,
        styleInfo: styleInfo,
        sections: updatedSections,
      },
      { new: true }
    );

    console.log("Updated Template data:", updatedTemplate);
    return res.status(200).json({ success: true, message: "Template Updated" });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateComponentByID = async (req, res) => {
  try {
    const componentID = req.params.id;
    const { title, variant, data, styleInfo } = req.body;

    const updatedSection = await Section.findByIdAndUpdate(componentID, {
      title: title,
      variant: variant,
      data: data,
      styleInfo: styleInfo,
    });

    console.log("Updated Template data:", updatedSection);
    return res.status(200).json({
      success: true,
      message: "Component Updated",
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTemplate = async (req, res) => {
  try {
    const { productId,navId,path } = req.params;
    console.log("Template data>>>>>>.", navId,path);
    const response = await template.find({productId:productId,navigationId:navId,path:path}).populate("sections").populate("layout");
    console.log("Template data>>>>>>.", response);
    if (!response.length>0) {
      return res.status(204).json({ sucess: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getComponentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Component ID >>>>>>.", id);
    const response = await Section.findById(id);
    console.log("Component data>>>>>>.", response);
    if (!response) {
      return res.status(402).json({ sucess: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTemplateByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Template ID >>>>>>.", id);
    const sec = await template.findById(id);

    if (!sec) {
      return res
        .status(402)
        .json({ sucess: false, message: "Template not found" });
    }

    sec?.sections.map(async (sectionData) => {
      await Section.findByIdAndDelete(sectionData._id);
    });

    const response = await template.findByIdAndDelete(id);
    console.log("Template data>>>>>>.", response);

    res.status(200).json({ success: true, message: "Template Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteComponentByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Template ID >>>>>>.", id);
    const Component = await Section.findById(id);
    if (!Component) {
      return res
        .status(402)
        .json({ sucess: false, message: "Cmponent not found" });
    }
    const response = await Section.findByIdAndDelete(id);
    console.log("Template data>>>>>>.", response);
    res.status(200).json({ success: true, message: "Component Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTemplate,
  getTemplate,
  getComponentById,
  updateTemplate,
  updateComponentByID,
  deleteTemplateByid,
  deleteComponentByid,
};
