import express from "express";
const router = express.Router();
import {
  register,
  login,
  getStudentUser,
  getAllStudent,
  updateStudent,
  deleteStudent,
  Logout,
} from "../controllers/student.js";
import { verifyadmin, verifytoken, verifyuser } from "../utils/verify.js";

//register the student
router.route("/register").post(register);

//login the student
router.route("/login").post(login);

//logout
router.route("/logout").post(verifytoken, Logout);

//get single student
router.route("/single/:id").get(verifytoken, getStudentUser);

//get all student
router.route("/").get(verifytoken, getAllStudent);

//update student
router.route("/:id").put(verifyuser, updateStudent);

//delete single student
router.route("/:id").delete(verifyuser, deleteStudent);

export default router;
