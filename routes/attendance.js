import express from "express";
const router = express.Router();
import {
  addAttendance,
  filterDay,
  filterMonth,
  filterMonthAdmin,
  filterYear,
  filterYearAdmin,
} from "../controllers/attendance.js";
import { verifyadmin, verifytoken, verifyuser } from "../utils/verify.js";

//post
router.route("/").post(verifyadmin, addAttendance);

//filter by day
router.route("/").get(verifytoken, filterDay);

//filter by month
router.route("/month").get(verifytoken, filterMonth);

//filter by month for admin
router.route("/adminmonth").get(verifytoken, filterMonthAdmin);

//filter by year
router.route("/year").get(verifytoken, filterYear);

//filter by month for admin
router.route("/adminyear").get(verifytoken, filterYearAdmin);

export default router;
