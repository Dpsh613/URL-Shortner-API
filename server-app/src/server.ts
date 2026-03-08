import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig.js";
import shortUrl from "./routes/shortUrl.js";
dotenv.config(); // if Error here It just means `process.env.MY_SECRET` will be `undefined`
connectDb(); // app will crash here because the connection string is missing.

const port = process.env.PORT || 5001; // actually open the connection to MongoDB.
// Computers have 65,535 "doors" (ports). 0–1023 are reserved for system stuff. Developers picked 3000, 5000, 8000 by convention because they are easy to remember. You can pick almost any number between 1024 and 65535.

const app = express(); // creates the actual "App" object.
app.use(express.json()); ///When data comes from the frontend, it arrives as a raw string. This line forces Express to look at that string, realize it is JSON, and convert it into a JavaScript Object (`req.body`). Without this, `req.body` is `undefined`.

app.use(express.urlencoded({ extended: true })); // This allows your backend to understand data sent from standard HTML Forms (`<form>`). `extended: true` just means it uses a powerful library to parse nested objects.
app.use(
  cors({
    origin: "https://url-shortner-api-1egd.onrender.com",
    credentials: true, // If your frontend sends Cookies (for login sessions), this must be set to `true`, or the browser will throw the cookies away.
  }),
);

app.use("/api/", shortUrl);

app.listen(port, () => {
  console.log(`Server started successfully: ${port}`);
});
