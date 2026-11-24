
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';

// Sign in
const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    }).select('+hashed_password +salt');

    if (!user) {
      return res.status(401).json({
        error: "User not found"
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: "Email and password don't match."
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET
    );

    res.cookie('t', token, {
      httpOnly: true,
      sameSite: 'lax'
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in"
    });
  }
};


// Sign out
const signout = (req, res) => {
  res.clearCookie('t');

  return res.status(200).json({
    message: "signed out"
  });
};


// Verify JWT token
const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth'
});


// Check user authorization
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth &&
    req.profile._id.toString() === req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }

  next();
};


const requireAdmin = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth._id) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    const user = await User.findById(req.auth._id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        error: 'Administrator access required'
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      error: 'Authorization check failed'
    });
  }
};


export default { signin, signout, requireSignin, hasAuthorization, requireAdmin };
