import Feelist from "../models/feelist.js";
import { Createerr } from "../utils/error.js";

export const addFees = async (req, res, next) => {
  try {
    if (!req.params.id) return next(Createerr(404, "Class is required."));
    if (!req.body.amount) return next(Createerr(404, "Fees is required."));
    const updateFee = await Feelist.findByIdAndUpdate(req.params.id, {
      $set: { fees: req.body.amount },
    });

    res.status(200).json("Fees Updated!");
  } catch (error) {
    next(error);
  }
};

//get fees list
export const getFee = async (req, res, next) => {
  try {
    const getfee = await Feelist.find();
    res.status(200).json(getfee);
  } catch (error) {
    next(error);
  }
};
