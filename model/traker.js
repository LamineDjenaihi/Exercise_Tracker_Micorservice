require("../config/database").connect();
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {type: String, required: true}
});

const exerciseSchema = new mongoose.Schema({
    username : {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: Date,
    _id: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"}
});
const logSchema = new mongoose.Schema({
    count : {type: Number, default: 0},
    _id: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    log: [exerciseSchema]

});
const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Log = mongoose.model("Log", logSchema);

module.exports = { User, Exercise, Log };