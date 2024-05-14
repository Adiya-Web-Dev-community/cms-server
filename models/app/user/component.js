const componenetSchema = new mongoose.Schema({
  title: { type: String },
});

const ComponentModel = mongoose.model("layout", componenetSchema);
module.exports = LayoutModel;
