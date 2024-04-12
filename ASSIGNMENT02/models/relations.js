const mongoose = require("mongoose");

const relationSchemaObj = {
    relation:{
        type: String
    }
};

var relationSchema = new mongoose.Schema(relationSchemaObj);
module.exports = mongoose.model('Relations', relationSchema);