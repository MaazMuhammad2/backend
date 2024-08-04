import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Specifies which origins are allowed to make requests to the server.
    credentials: true, // Allows cookies to be sent with requests
  })
);

app.use(
  express.json({
    // Parses incoming JSON requests and sets a size limit of 16 kilobytes.
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({ // Parses URL-encoded data (like form submissions) and sets a size limit of 16 kilobytes.
    extended: true, // Allows for rich objects and arrays to be encoded into the URL-encoded format.
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());



// Routes import
import userRouter from './routes/user.routes.js'  

// routes declaration
app.use('/api/v1/users', userRouter)
// https://localhost:8000/api/v1/users/register

export { app };