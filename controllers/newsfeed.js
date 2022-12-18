import Newsfeed from "../models/newsfeed.js";
import { Createerr } from "../utils/error.js";

export const postNews = async (req, res, next) => {
  try {
    const postnews = new Newsfeed({
      news: req.body.news,
    });
    if (!req.body.news) return next(Createerr(404, "Enter the news..."));
    await postnews.save();
    res.status(200).json("News posted!");
  } catch (error) {
    next(error);
  }
};

//get news
export const getNews = async (req, res, next) => {
  try {
    const news = await Newsfeed.find();
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

//delete news
export const delNews = async (req, res, next) => {
  try {
    const delnews = await Newsfeed.deleteMany();
    res.status(200).json("Post deleted!");
  } catch (error) {
    next(error);
  }
};
