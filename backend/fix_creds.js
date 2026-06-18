import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();
connectDB();

const fixCredentials = async () => {
  try {
    const password = bcrypt.hashSync('123456', 10);
    
    // Fix Admin
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      await User.create({ name: 'Admin User', email: 'admin@example.com', password, isAdmin: true });
    } else {
      admin.password = password;
      admin.isAdmin = true;
      await admin.save();
    }

    // Fix Customer
    let customer = await User.findOne({ email: 'customer@example.com' });
    if (!customer) {
      await User.create({ name: 'Demo Customer', email: 'customer@example.com', password, isAdmin: false });
    } else {
      customer.password = password;
      customer.isAdmin = false;
      await customer.save();
    }

    console.log('Fixed demo credentials successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixCredentials();
