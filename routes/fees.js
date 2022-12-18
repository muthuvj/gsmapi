import express from "express";
const router = express.Router();
import {
  addFees,
  getList,
  updateUser,
  filterMonth,
  filterYear,
} from "../controllers/fees.js";
import { verifyadmin, verifytoken, verifyuser } from "../utils/verify.js";

//post fees
router.route("/").post(verifyadmin, addFees);

//get paid user
router.route("/list").post(verifytoken, getList);

//update a fees
router.route("/:id").put(verifyadmin, updateUser);

//filter by month
router.route("/month").get(verifytoken, filterMonth);

//filter by year
router.route("/year").get(verifytoken, filterYear);

export default router;
