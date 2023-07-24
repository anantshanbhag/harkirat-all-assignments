import { Schema, model } from "mongoose";

// Define mongoose schemas
const userSchema = new Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  username: String,
  password: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose models
export const UserModel = model("User", userSchema);
export const AdminModel = model("Admin", adminSchema);
export const CourseModel = model("Course", courseSchema);
