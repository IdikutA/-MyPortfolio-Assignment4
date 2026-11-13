
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// To sign in a user - Shataer Abulizi
const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const match = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!match) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("t", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in"
    });
  }
};

export default { signin };
