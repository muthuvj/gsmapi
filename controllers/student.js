import Student from "../models/student.js";
import { Createerr } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { refreshtokenss } from "../routes/refreshtoken.js";

//post user
export const register = async (req, res, next) => {
  const addStudent = new Student({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    standard: req.body.standard,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    mobile: req.body.mobile,
  });
  try {
    const getstudent = await Student.find({ name: { $in: req.body.name } });

    if (getstudent.length !== 0)
      return next(Createerr(403, "User already exists this name!"));
    addStudent.save();
    res.status(200).json("registered successfully!");
  } catch (err) {
    next(err);
  }
};

//access token
export const Accesstoken = (getStudent) => {
  return jwt.sign(
    { id: getStudent._id, isAdmin: getStudent.isAdmin },
    process.env.SECRETKEY,
    { expiresIn: "10s" }
  );
};

//refresh token
export const Refreshtoken = (getStudent) => {
  return jwt.sign(
    { id: getStudent._id, isAdmin: getStudent.isAdmin },
    process.env.RESECRETKEY,
    { expiresIn: "3d" }
  );
};

//get a single user//login
export const login = async (req, res, next) => {
  try {
    const getStudent = await Student.findOne({ email: req.body.email });

    if (!getStudent || !getStudent.isApprove)
      return next(Createerr(401, "User not found!"));

    if (getStudent.password === req.body.password) {
      const token = Accesstoken(getStudent);

      const retoken = Refreshtoken(getStudent);

      refreshtokenss.push(retoken);
      //console.log(refreshtokenss);

      const { password, ...others } = getStudent._doc;

      res
        .cookie("tok", retoken, { httpOnly: true })
        .status(200)
        .json({ ...others, token: token, refreshtoken: retoken });
    } else {
      return next(Createerr(404, "Password incorrect!"));
    }
  } catch (error) {
    next(error);
  }
};

//logout
export const Logout = async (req, res) => {
  const refreshtoken = req.body.token;
  refreshtokenss = refreshtokenss.filter((t) => t !== refreshtoken);
  // res.clearCookie("refreshtoken").status(200).json("Logged out");
  res.status(200).json("Logged out");
};

//get a single student
export const getStudentUser = async (req, res, next) => {
  try {
    const getstudent = await Student.find({ _id: req.params.id });

    if (!getstudent) return next(Createerr(404, "Student not found!"));

    res.status(200).json(getstudent);
  } catch (error) {
    next(error);
  }
};

//get all student
export const getAllStudent = async (req, res, next) => {
  try {
    const getallstudent = await Student.find();
    res.status(200).json(getallstudent);
  } catch (error) {
    next(error);
  }
};

//update student
export const updateStudent = async (req, res, next) => {
  try {
    const updatestudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Updated successfully!");
  } catch (error) {
    next(error);
  }
};

//delete student
export const deleteStudent = async (req, res, next) => {
  try {
    const deletestudent = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted!");
  } catch (error) {
    next(error);
  }
};
