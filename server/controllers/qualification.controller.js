
import Qualification from "../models/qualification.model.js";

const create = async (req, res) => {
  const qualification = new Qualification(req.body);

  try {
    await qualification.save();
    return res.status(201).json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    return res.json(qualifications);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const read = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);

    if (!qualification) {
      return res.status(404).json({
        error: "Qualification not found"
      });
    }

    return res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const update = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        completionDate: req.body.completionDate,
        description: req.body.description
      },
      { new: true, runValidators: true }
    );

    if (!qualification) {
      return res.status(404).json({
        error: "Qualification not found"
      });
    }

    return res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const remove = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);

    if (!qualification) {
      return res.status(404).json({
        error: "Qualification not found"
      });
    }

    return res.json({
      message: "Qualification deleted successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});

    return res.json({
      message: "All qualifications deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export default { create, list, read, update, remove, removeAll };
