import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import path from "path";

import { createServer } from "http";
//import { Server } from "socket.io";

import UserRoute from "./routes/student.js";
import Attendance from "./routes/attendance.js";
import Fees from "./routes/fees.js";
import FeesList from "./routes/feelist.js";
import News from "./routes/newsfeed.js";
import TempRoute from "./routes/temp.js";
import RefreshToken from "./routes/refreshtoken.js";

const app = express();
export const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: { Origin: "http://localhost:3000" },
// });

dotenv.config();

// //socket
// let room = "";
// let users = [];

// const adduser = (roomid, userid, id) => {
//   users.length > 0
//     ? users.every(
//         (f) => (f.room === roomid && f.userid !== userid) || f.room !== roomid
//       ) && users.push({ room: roomid, userid: userid, id: id })
//     : users.push({ room: roomid, userid: userid, id: id });
// };

// const my = (roomid, userid) => {
//   return (
//     users.length > 0 &&
//     users.find((f) => f.room === roomid && f.userid === userid)
//   );
// };

// const getuser = (roomid, userid) => {
//   return users.filter((f) => f.room === roomid && f.userid !== userid);
// };

// io.on("connection", (Socket) => {
//   io.emit("room", room);

//   Socket.on("create-room", (roomid, userid) => {
//     room = roomid;
//     io.emit("room", room);
//     adduser(roomid, userid, Socket.id);
//     Socket.emit("alluser", getuser(roomid, userid));
//   });

//   Socket.on("join-room", (roomid, userid) => {
//     adduser(roomid, userid, Socket.id);
//     io.emit("me", my(roomid, userid));
//     Socket.emit("alluser", getuser(roomid, userid));
//   });

//   Socket.on("initcall", (usertocall, callerid, signal) => {
//     io.to(usertocall).emit("accept", callerid, signal);
//   });

//   Socket.on("receivedcall", (callerid, signal) => {
//     io.to(callerid).emit("answered", signal);
//   });

//   Socket.on("disconnect", () => {
//     Socket.emit("user left");
//   });
// });

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

httpServer.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server connected");
});
