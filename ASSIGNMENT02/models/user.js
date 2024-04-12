const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const userSchemaObj = {
    username : {type: String, require: true},
    password : {type: String, require: true},

    oauthId: { type: String},
    oauthProvider: { type: String},
    created: { type: Date}
};

const userSchema = mongoose.Schema(userSchemaObj);

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);