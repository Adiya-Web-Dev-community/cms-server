const Template = require("../../models/app/manager/template");

const fetchTemplate = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send({ success: false, msg: "template id not found" });
  }
  try {
    const isTemplate = await Template.findOne({ _id: id });
    if (!isTemplate) {
      return res.send({ success: false, msg: "Template not found" });
    }
    return res.send({
      success: true,
      msg: "Template data fetch successfully",
      data: isTemplate,
    });
  } catch (err) {
    return res.send({ success: false, msg: `catch error: ${err.message}` });
  }
};

module.exports = { fetchTemplate };
