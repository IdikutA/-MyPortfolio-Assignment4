
import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema({
  title: String,
  completionDate: Date,
  description: String
});

const Qualification = mongoose.model('Qualification', QualificationSchema);

export default Qualification;
