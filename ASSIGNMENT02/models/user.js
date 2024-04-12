const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const userSchemaObj = {
    username : {type: String, require: true},
    password : {type: String, require: true},
};

const userSchema = mongoose.Schema(userSchemaObj);

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);