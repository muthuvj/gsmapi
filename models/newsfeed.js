import mongoose from "mongoose";

const feedschema = new mongoose.Schema({
  news: { type: String, required: true },
});

const Newsfeed = mongoose.model("Newsfeed", feedschema);
export default Newsfeed;
