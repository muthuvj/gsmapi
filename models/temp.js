import mongoose from "mongoose";

const tempschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
  },
  mothername: String,
  mobile: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Temp = mongoose.model("Temp", tempschema);
export default Temp;
