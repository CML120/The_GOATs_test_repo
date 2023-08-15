const { Schema, model } = require("mongoose");
const { default: Contact } = require("../../client/src/components/contact");

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Contact = model("Contact", contactSchema);
module.exports = Contact;
