
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  completionDate: Date,
  description: String
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
