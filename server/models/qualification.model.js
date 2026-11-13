import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  email: String,
  completionDate: Date,
  description: String
});

const Qualification = mongoose.model(
  "Qualification",
  QualificationSchema
);

export default Qualification;

