
import User from "../models/user.model.js";


const create = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    });

    await user.save();

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
      updated: user.updated
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const list = async (req, res) => {
  try {
    const users = await User.find()
      .select("-hashed_password -salt -password");

    return res.json(users);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-hashed_password -salt -password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.json(user);

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }

    if (req.body.password !== undefined) {
      user.password = req.body.password;
    }

    user.updated = new Date();

    await user.save();

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
      updated: user.updated
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};




const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.json({
      message: "User deleted successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});

    return res.json({
      message: "All users deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


// Find user by ID for authorization
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
      .select('-hashed_password -salt -password');

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    req.profile = user;
    next();

  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};


export default { create, list, read, update, remove, removeAll, userByID };
