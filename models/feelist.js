import mongoose from "mongoose";

const feeListSchema = new mongoose.Schema({
  class: String,
  fees: { type: Number, default: 0, required: true },
});

const Feelist = mongoose.model("Feelist", feeListSchema);
export default Feelist;
