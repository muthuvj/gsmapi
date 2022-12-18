import express from "express";
const router = express.Router();
import { addFees, getFee } from "../controllers/feelist.js";
import { verifyadmin, verifytoken } from "../utils/verify.js";

//update fees
router.route("/:id").put(verifyadmin, addFees);

//get fees list
router.route("/").get(verifytoken, getFee);

export default router;
