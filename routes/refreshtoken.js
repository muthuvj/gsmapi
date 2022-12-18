import express from "express";
import { Createerr } from "../utils/error.js";
const router = express.Router();

import jwt from "jsonwebtoken";
import { Accesstoken, Refreshtoken } from "../controllers/student.js";
export let refreshtokenss = [];

router.route("/").post(async (req, res, next) => {
  const refreshtokens = req.body.token;

  if (!refreshtokens)
    return next(Createerr(403, "you are not refresh authiticated"));

  if (!refreshtokenss.includes(refreshtokens))
    return next(Createerr(403, "RefreshToken not valid"));

  jwt.verify(refreshtokens, process.env.RESECRETKEY, (err, user) => {
    if (err) return next(Createerr(404, "Token is not valid!"));

    refreshtokenss = refreshtokenss.filter((t) => t !== refreshtokens);

    const newaccesstoken = Accesstoken({ _id: user.id, isAdmin: user.isAdmin });
    const newrefreshtoken = Refreshtoken({
      _id: user.id,
      isAdmin: user.isAdmin,
    });
    refreshtokenss.push(newrefreshtoken);
    res.status(200).json({
      token: newaccesstoken,
      refreshtoken: newrefreshtoken,
    });
  });
});

export default router;
