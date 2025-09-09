import User from "../models/user.model.js";
import crypto from "crypto";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  sendMail,
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
} from "../utils/mail.js";

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    console.log(newUser);
    if (!newUser) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    newUser.verificationToken = token;
    await newUser.save();
    console.log("User saved to DB");

    const verificationUrl = `${process.env.FRONTEND_BASE_URL}/verify-email/${token}`;

    // TODO : Send email
    await sendMail({
      email: newUser.email,
      subject: "Verify your email",
      mailGenContent: emailVerificationMailGenContent(
        newUser.name,
        verificationUrl
      ),
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error: error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  // TODO : Verify a user
  const { token } = req.params; // params take the values from the url
  if (!token) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      // Check if there is a user with the token previously verified
      const verifiedUser = await User.findOne({ isVerified: true });
      if (verifiedUser) {
        return res.status(200).json({
          message: "User verified successfully.",
          success: true,
        });
      }
      return res.status(400).json({
        message: "Invalid or expired token",
        success: false,
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not verified",
      error,
      success: false,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    ); // agr user ke paas jwt/session token hai toh hi vo login kar payega... ek specified time ke liye logged in rehne ke liye jwt use hota hai ..taaki user ko baar baar login naa karna pade

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "User not logged In",
      error: error,
      success: false,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get me", error);
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {}
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetPasswordUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${resetToken}`;
    // TODO : Send email
    await sendMail({
      email: user.email,
      subject: "Reset your password",
      mailGenContent: forgotPasswordMailGenContent(user.name, resetPasswordUrl),
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Sending forgot password token",
    });
  }
};

const resetPassword = async (req, res) => {
  // TODO : Reset Password

  try {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
};

export {
  registerUser,
  verifyUser,
  login,
  getMe,
  logOut,
  forgotPassword,
  resetPassword,
};
