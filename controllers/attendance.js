import Attendance from "../models/attendance.js";
import { Createerr } from "../utils/error.js";
import Student from "../models/student.js";

//add attendance
export const addAttendance = async (req, res, next) => {
  try {
    const check = await Attendance.find({ date: req.body[0].date });

    if (check.length <= 0) {
      await Attendance.insertMany(req.body);

      res.status(200).json("Submit successfully!");
    } else {
      next(Createerr(403, "Already taken for this date!.."));
    }
    //await addattendance.save();
  } catch (error) {
    next(error);
  }
};

//filter by day
export const filterDay = async (req, res, next) => {
  try {
    const day = req.query.day;
    const filterday = await Attendance.find({ date: day });
    if (filterday.length < 1) return next(Createerr(404, "Data's not found"));
    res.status(200).json(filterday);
  } catch (error) {
    next(error);
  }
};

//filter by month
export const filterMonth = async (req, res, next) => {
  const month = req.query.month.slice(0, 7);
  try {
    const filtermonth = await Attendance.find({ date: { $regex: month } });
    res.status(200).json(filtermonth);
  } catch (error) {
    next(error);
  }
};

//filter by month for Admin
export const filterMonthAdmin = async (req, res, next) => {
  const month = req.query.month.slice(0, 7);
  try {
    const filtermonthadmin = await Student.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "name",
          foreignField: "name",
          pipeline: [{ $match: { date: { $regex: month } } }],
          as: "filters",
        },
      },
    ]);

    res.status(200).json(filtermonthadmin);
  } catch (error) {
    next(error);
  }
};

//filter by year
export const filterYear = async (req, res, next) => {
  try {
    const year = req.query.year.slice(0, 4);
    const filteryear = await Attendance.find({ date: { $regex: year } });
    res.status(200).json(filteryear);
  } catch (error) {
    next(error);
  }
};

//filter by year for admin
export const filterYearAdmin = async (req, res, next) => {
  const year = req.query.year.slice(0, 4);
  try {
    const filteradminyear = await Student.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "name",
          foreignField: "name",
          pipeline: [{ $match: { date: { $regex: year } } }],
          as: "filters",
        },
      },
    ]);
    res.status(200).json(filteradminyear);
  } catch (error) {
    next(error);
  }
};
