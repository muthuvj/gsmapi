import jwt from "jsonwebtoken";
import { Createerr } from "./error.js";

export const verifytoken = (req, res, next) => {
  const access = req.headers.token.split(" ")[1];

  if (access) {
    jwt.verify(access, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return next(Createerr(404, "Token is not valid!"));
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return next(Createerr(403, "you are not authenticated!"));
  }
};

export const verifyuser = (req, res, next) => {
  verifytoken(req, res, () => {
    if (!req.user) return next(Createerr(404, "Token expired!"));

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(Createerr(403, "you are not authorized!"));
    }
  });
};

export const verifyadmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(Createerr(403, "you are not authorized!"));
    }
  });
};
