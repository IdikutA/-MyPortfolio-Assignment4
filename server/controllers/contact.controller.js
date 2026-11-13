
import Contact from "../models/contact.model.js";

const create = async (req, res) => {
  const contact = new Contact(req.body);

  try {
    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};


const read = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    return res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const update = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        message: req.body.message
      },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    return res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const remove = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    return res.json({
      message: "Contact deleted successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});

    return res.json({
      message: "All contacts deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export default { create, list, read, update, remove, removeAll };