import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../services/email.service.js";

/* ======================
   REGISTER
====================== */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Пользователь уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    sendWelcomeEmail({
      email: user.email,
      name: user.name,
    }).catch((err) => {
      console.error("Welcome email error:", err);
    });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPro: user.isPro,
      },
      token,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Register error",
    });
  }
};

/* ======================
   LOGIN
====================== */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        isPro: user.isPro,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка входа" });
  }
};

/* ======================
   ME (current user)
====================== */

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Me error" });
  }
};
