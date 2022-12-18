import express from "express";
import { temp, gettemp, deletetemp } from "../controllers/temp.js";
import { verifyadmin } from "../utils/verify.js";
const router = express.Router();

router.route("/").post(verifyadmin, temp);

router.route("/").get(gettemp);

router.route("/:id").delete(verifyadmin, deletetemp);

export default router;
