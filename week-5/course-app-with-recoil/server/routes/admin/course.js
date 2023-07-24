import { Router } from "express";

import { CourseModel } from "../../db/index.js";
import { authenticateAdmin } from "../../middleware/auth.js";

const router = Router();

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
