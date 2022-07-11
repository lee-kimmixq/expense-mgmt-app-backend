import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import bindRoutes from "./routes.mjs";
import cors from "cors";
import passport from "passport";
import {} from "./middleware/passport.mjs";

import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

dotenv.config();

// Initialise Express instance
const app = express();
// Set CORS headers
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
// Set the Express view engine to expect EJS templates
app.set("view engine", "ejs");
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride("_method"));
// Expose the files stored in the public folder
app.use(express.static("public"));

app.use(passport.initialize());

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const multerUpload = multer({
  storage: multerS3({
    s3,
    bucket: "make-cents-bucket",
    acl: "public-read",
    metadata: (request, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, Date.now().toString());
    },
  }),
});
