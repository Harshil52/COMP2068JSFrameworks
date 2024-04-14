// Importing mongoose
const mongoose = require("mongoose");

// Importing PLM - Passport Local Mongoose
const plm = require("passport-local-mongoose");

// creating the schema object for user
const userSchemaObj = {
    // username and password for user
    username : {type: String, require: true},
    password : {type: String, require: true},
    // OAuth Authentication variables
    oauthId: { type: String},
    oauthProvider: { type: String},
    created: { type: Date}
};

// creating a new userSchema using the above SchemaObj
const userSchema = mongoose.Schema(userSchemaObj);

userSchema.plugin(plm);

// exporting the model
module.exports = mongoose.model("User", userSchema);