//import express from "express";
//var express = require("express");
//var app = express();
import seedAdmin from './server/utils/seedAdmin.js';
import app from "./server/express.js";
import router from "./server/assets-router.js";
//const assetsRouter = require("./server/assets-router");
import mongoose from "mongoose";
import Contact from "./server/models/contact.model.js";
import Project from "./server/models/project.model.js";
import Qualification from "./server/models/qualification.model.js";
import User from "./server/models/user.model.js";



const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await seedAdmin();
    await Contact.createCollection();
    await Project.createCollection();
    await Qualification.createCollection();
    await User.createCollection();

    console.log("Four collections created successfully");
  })
  .catch((err) => console.log("MongoDB error:", err.message));

app.use("/src", router);
app.use("/", function (req, res) {
 res.send("Welcome to User application");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log("Server running at http://localhost:" + PORT + "/");
//module.exports = app;
export default app;
