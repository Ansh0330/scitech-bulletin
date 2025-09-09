import express, { urlencoded } from "express";
import connectDB from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./utils/cloudinaryConnect.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

//import all the routes
import authRoutes from "./routes/auth.routes.js";
import bulletinRoutes from "./routes/bulletin.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp",
  })
);
//cloudinary connection
cloudinaryConnect();

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

//user routes
app.use("/api/v1/auth", authRoutes);

//bulletins routes
app.use("/api/v1/bulletins", bulletinRoutes);

// blog routes
app.use("/api/v1/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
