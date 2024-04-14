// Importing the Mongoose
const mongoose = require("mongoose");

// Creating a new SchemaObj for relation
const relationSchemaObj = {
    relation:{
        type: String
    }
};

// defining a new Schema using the SchemaObj
var relationSchema = new mongoose.Schema(relationSchemaObj);
// Exporting the model
module.exports = mongoose.model('Relations', relationSchema);