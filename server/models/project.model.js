
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  email: String,
  completionDate: Date,
  description: String
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
