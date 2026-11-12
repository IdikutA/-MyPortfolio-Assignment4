
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: {
    type: String,
    select: false
  }
}, {
  timestamps: true
});

// To hash the password before saving a new user- Shataer Abulizi
UserSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

export default User;
