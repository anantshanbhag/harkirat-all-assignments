import { Router } from "express";

import { AdminModel } from "../../db/index.js";
import { generateJwtAdmin, authenticateAdmin } from "../../middleware/auth.js";

const router = Router();

// check for logged in
router.get("/me", authenticateAdmin, async (req, res) => {
  const {
    currentAdmin: { username },
  } = req;

  const foundAdmin = await AdminModel.findOne({ username });
  if (!foundAdmin) {
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

export default router;
