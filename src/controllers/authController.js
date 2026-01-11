import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateEmail } from '../utils/validation.js';

export const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    if (!email || !validateEmail(email) || !password || password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Paramter email tidak sesuai format atau password kurang dari 8 karakter",
        data: null
      });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
       return res.status(400).json({
        status: 102,
        message: "Email sudah terdaftar",
        data: null
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      first_name,
      last_name,
      password: hashedPassword
    });

    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !validateEmail(email)) {
       return res.status(400).json({
        status: 102,
        message: "Paramter email tidak sesuai format",
        data: null
      });
    }
    
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null
      });
    }

    // Generate JWT
    const payload = {
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null
    });
  }
};
