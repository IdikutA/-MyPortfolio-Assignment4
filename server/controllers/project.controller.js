
import Project from "../models/project.model.js";

const create = async (req, res) => {
  const project = new Project(req.body);

  try {
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};

const list = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const read = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found"
      });
    }

    return res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
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

    if (!project) {
      return res.status(404).json({
        error: "Project not found"
      });
    }

    return res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found"
      });
    }

    return res.json({
      message: "Project deleted successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});

    return res.json({
      message: "All projects deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export default { create, list, read, update, remove, removeAll };
