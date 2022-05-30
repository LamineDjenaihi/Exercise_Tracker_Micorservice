require('../config/connectDB').connect();
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {type: String, required: true}
});

const exersiseSchema = new mongoose.Schema({
    username : {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: Date,
    _id: {type: mongoose.Schema.Types.ObjectId,
            ref: "User"}
});
const logSchema = new mongoose.Schema({
    count : {type: NUmber, default: 0},
    _id: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    log: [exersiseSchema]

});
const User = mongoose.model("User", userSchema);
const Exersise = mongoose.model("Exersise", exersiseSchema);
const Log = mongoose.model("Log", logSchema);

module.exports = {User,Exersise,Log };