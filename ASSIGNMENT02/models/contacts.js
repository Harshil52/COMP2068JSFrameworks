// importing mongoose
const mongoose = require("mongoose");

// create a schema object for mapping
const dataSchemaObj = {
    // adding the elements and their types
  name: { type: String, require: true },
  contact: { type: Number, require: true },
  relation: { type: String },
  email: { type: String, required: true },
};

// defining a new schema using the above schema object
var contactsSchema = mongoose.Schema(dataSchemaObj);

// exporting the model
module.exports = mongoose.model("Contact", contactsSchema);
