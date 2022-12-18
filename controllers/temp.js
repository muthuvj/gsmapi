import Temp from "../models/temp.js";

export const temp = async (req, res, next) => {
  const addtemp = new Temp({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    standard: req.body.standard,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    mobile: req.body.mobilenumber,
  });
  try {
    const temp = await Temp.find({ name: { $in: req.body.name } });

    if (temp.length !== 0)
      return next(Createerr(403, "User already exists this name!"));
    addtemp.save();
    res.status(200).json("registered successfully!");
  } catch (err) {
    next(err);
  }
};

export const gettemp = async (req, res, next) => {
  try {
    const getstudent = await Temp.find();
    res.status(200).json(getstudent);
  } catch (error) {
    next(error);
  }
};

export const deletetemp = async (req, res, next) => {
  try {
    const deletetemp = await Temp.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted!");
  } catch (error) {
    next(error);
  }
};
