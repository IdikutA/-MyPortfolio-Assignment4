
import User from '../models/user.model.js';

const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('Admin credentials are missing in .env');
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      if (existingAdmin.role !== 'admin') {
        throw new Error(
          'Admin email belongs to a non-admin account'
        );
      }

      console.log('Administrator already exists');
      return;
    }

    const admin = new User({
      name: 'Administrator',
      email: email,
      password: password,
      role: 'admin'
    });

    await admin.save();

    console.log('Administrator account created successfully');

  } catch (err) {
    console.error('Admin seeding error:', err.message);
    throw err;
  }
};

export default seedAdmin;
