import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import path from "path";

import UserRoute from "./routes/student.js";
import Attendance from "./routes/attendance.js";
import Fees from "./routes/fees.js";
import FeesList from "./routes/feelist.js";
import News from "./routes/newsfeed.js";
import TempRoute from "./routes/temp.js";
import RefreshToken from "./routes/refreshtoken.js";

const app = express();

dotenv.config();

//db connection
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("db connected");
});

//middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookie());

//routes
app.use("/api/user", UserRoute);
app.use("/api/attendance", Attendance);
app.use("/api/fees", Fees);
app.use("/api/feeslist", FeesList);
app.use("/api/newsfeed", News);
app.use("/api/refreshtoken", RefreshToken);
app.use("/api/temp", TempRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server connected");
});
