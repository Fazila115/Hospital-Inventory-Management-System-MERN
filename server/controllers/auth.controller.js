import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'email-validator'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

// 1. register admin - Only run once to create admin manually using Postman
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password });
    res.status(201).json({ message: "Admin created" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const valid = validator.validate(email);

    if (!valid) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect!" });
    }

    res.status(200).json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {
  registerAdmin,
  loginAdmin
}
