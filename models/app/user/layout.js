const layoutSchema = new mongoose.Schema({
    title: { type: String },
  });
  
  const LayoutModel = mongoose.model("layout", layoutSchema);
  module.exports = LayoutModel;