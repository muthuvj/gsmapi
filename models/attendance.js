import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
    unique: false,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
