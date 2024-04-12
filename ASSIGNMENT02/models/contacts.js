const mongoose = require("mongoose");

const dataSchemaObj = {
    name: {type: String, require: true},
    contact: {type: Number, require:true},
    relation : {type: String},
    email: { type: String, required: true }
}

var contactsSchema = mongoose.Schema(dataSchemaObj);
module.exports = mongoose.model("Contact", contactsSchema);