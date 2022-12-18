import Fees from "../models/fees.js";
import Student from "../models/student.js";
import { Createerr } from "../utils/error.js";

export const addFees = async (req, res, next) => {
  try {
    if (!req.body.amount || !req.body.date)
      return next(Createerr(500, "Please fill all fildes"));

    const addfees = new Fees({
      name: req.body.name,
      standard: req.body.standard,
      amount: req.body.amount,
      dueamount: req.body.dueamount,
      date: req.body.date,
    });

    await addfees.save();
    res.status(200).json("Fees added!");
  } catch (error) {
    next(error);
  }
};

//get paid user list
export const getList = async (req, res, next) => {
  try {
    // const student = await Student.find();
    const select = req.body.date.slice(0, 7);

    const student = await Student.aggregate([
      {
        $lookup: {
          from: "feelists",
          localField: "standard",
          foreignField: "class",
          as: "fees",
        },
      },
      {
        $lookup: {
          from: "fees",
          localField: "name",
          foreignField: "name",
          pipeline: [
            {
              $match: {
                date: { $regex: select },
              },
            },
          ],
          as: "feelist",
        },
      },
    ]);

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

//update fees
export const updateUser = async (req, res, next) => {
  try {
    if (!req.body.amount || !req.body.date)
      return next(Createerr(500, "Please fill all fildes"));
    const feesUpdate = await Fees.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        standard: req.body.standard,
        amount: req.body.amount,
        dueamount: req.body.dueamount,
        date: req.body.date,
      },
    });
    res.status(200).json("Updated!");
  } catch (error) {
    next(error);
  }
};

//filter by month
export const filterMonth = async (req, res, next) => {
  try {
    const select = req.query.month;
    const student = await Student.aggregate([
      {
        $lookup: {
          from: "feelists",
          localField: "standard",
          foreignField: "class",
          as: "fees",
        },
      },
      {
        $lookup: {
          from: "fees",
          localField: "name",
          foreignField: "name",
          pipeline: [{ $match: { date: { $regex: select } } }],
          as: "feelist",
        },
      },
    ]);
    // const studentname = student.map((sn) => sn.name);

    // const fee = await Fees.find({
    //   $and: [
    //     { name: studentname },
    //     { date: { $regex: select } },
    //     { dueamount: 0 },
    //   ],
    // });
    // const list = fee.map((li) => li.name);

    // const filtermonth = await Student.find({ name: { $not: { $in: list } } });
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

//filter by year
export const filterYear = async (req, res, next) => {
  try {
    const select = req.query.year.slice(0, 4);
    const student = await Student.aggregate([
      {
        $lookup: {
          from: "feelists",
          localField: "standard",
          foreignField: "class",
          as: "fees",
        },
      },
      {
        $lookup: {
          from: "fees",
          localField: "name",
          foreignField: "name",
          pipeline: [{ $match: { date: { $regex: select } } }],
          as: "feelist",
        },
      },
    ]);
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};
