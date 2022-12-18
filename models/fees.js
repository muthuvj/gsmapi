import mongoose from "mongoose";

const feesschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  standard: Number,
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  dueamount: {
    type: Number,
  },
  date: {
    type: String,
    required: true,
  },
});

const Fees = mongoose.model("Fees", feesschema);
export default Fees;
