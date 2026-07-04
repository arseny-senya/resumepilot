import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResetPasswordEmail } from "../services/email.service.js";

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
/* ======================
   FORGOT PASSWORD
====================== */

export const forgotPassword = async (req, res) => {
  try {
    const { email, lang } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Введите email",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Безопаснее не раскрывать, есть пользователь или нет
    if (!user) {
      return res.json({
        message: "Если аккаунт существует, ссылка отправлена на email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 минут

    await user.save();

    const frontendUrl = "https://resumepilotonline.com";

    const resetUrl =
      lang === "en"
        ? `${frontendUrl}/en/reset-password.html?token=${resetToken}`
        : `${frontendUrl}/reset-password.html?token=${resetToken}`;

    await sendResetPasswordEmail({
      email: user.email,
      name: user.name,
      resetUrl,
      lang,
    });

    return res.json({
      message: "Если аккаунт существует, ссылка отправлена на email",
    });
  } catch (err) {
    console.error("Forgot password error:", err);

    return res.status(500).json({
      message: "Ошибка восстановления пароля",
    });
  }
};

/* ======================
   RESET PASSWORD
====================== */

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Некорректный запрос",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Пароль должен быть не короче 6 символов",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Ссылка недействительна или устарела",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      message: "Пароль успешно изменён",
    });
  } catch (err) {
    console.error("Reset password error:", err);

    return res.status(500).json({
      message: "Ошибка смены пароля",
    });
  }
};
