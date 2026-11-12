
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  contactNumber: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;

