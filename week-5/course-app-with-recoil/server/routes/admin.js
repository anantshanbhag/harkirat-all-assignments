import { Router } from "express";

import { CourseModel, AdminModel } from "../db/index.js";
import { generateJwtAdmin, authenticateAdmin } from "../middleware/auth.js";

const router = Router();

// check for logged in
router.get("/me", authenticateAdmin, async (req, res) => {
  const {
    currentAdmin: { username },
  } = req;

  const admin = await AdminModel.findOne({ username });
  if (!admin) {
    return res.status(403).json({ msg: "Admin doesn't exist" });
  }
  res.json({ username });
});

// logic to sign up admin
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(404)
      .send({ error: "username & password mandatory to signup" });
  }
  const foundAdmin = await AdminModel.findOne({ username });
  if (foundAdmin) {
    return res.status(403).send({ error: "Admin already exists" });
  }

  const newAdmin = { username, password };
  const adminModel = new AdminModel(newAdmin);
  await adminModel.save();

  const token = generateJwtAdmin(newAdmin);
  res.json({ message: "Admin created successfully", token });
});

// logic to log in admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(404)
      .send({ error: "username & password mandatory to signup" });
  }

  const foundAdmin = await AdminModel.findOne({ username });
  if (!foundAdmin) {
    return res.status(403).send({ error: "Admin not found" });
  }

  const token = generateJwtAdmin(foundAdmin);
  res.json({ message: "Admin logged-in successfully", token });
});

// logic to create a course
router.post("/courses", authenticateAdmin, async (req, res) => {
  const newCourse = req.body;
  const { title, price } = newCourse;

  if (!title || !price) {
    return res
      .status(404)
      .send({ error: "title & price mandatory to create new course" });
  }

  const foundCourse = await CourseModel.findOne({ title });
  if (foundCourse) {
    return res.status(404).send({ error: "Course already exists" });
  }

  const courseModel = new CourseModel(newCourse);
  await courseModel.save();
  const id = courseModel.id;

  res.json({ message: "Course created successfully", courseId: id });
});

// logic to edit a course
router.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
  const { courseId } = req.params;
  const courseToUpdate = req.body;
  const updatedCourse = await CourseModel.findByIdAndUpdate(
    courseId,
    courseToUpdate,
    { new: true }
  );
  if (!updatedCourse) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json({ message: "Course updated successfully" });
});

// logic to get all courses
router.get("/courses", authenticateAdmin, async (req, res) => {
  const courses = await CourseModel.find({});
  res.json({ courses });
});

// logic to a course
router.get("/course/:courseId", authenticateAdmin, async (req, res) => {
  const { courseId } = req.params;
  const course = await CourseModel.findById(courseId);
  res.json({ course });
});

export default router;
