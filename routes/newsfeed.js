import express from "express";
import { delNews, postNews, getNews } from "../controllers/newsfeed.js";
import { verifyadmin, verifytoken } from "../utils/verify.js";
const router = express.Router();

//post a news
router.route("/").post(verifyadmin, postNews);

//delete a news
router.route("/").delete(verifyadmin, delNews);

//get a news
router.route("/").get(getNews);

export default router;
