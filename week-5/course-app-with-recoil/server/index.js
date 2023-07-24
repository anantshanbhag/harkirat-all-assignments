import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connect to MongoDB
const connectionString =
  "mongodb+srv://anants888:o2CO0m2UxCqf5d6L@cluster0.7otij2p.mongodb.net";
const dBName = "courses";
connect(`${connectionString}/${dBName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => console.log("Server running on port 3000"));
