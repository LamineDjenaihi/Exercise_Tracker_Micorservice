require("../config/database").connect();
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {type: String, required: true}
});

const exerciseSchema = new mongoose.Schema({
    username : {type: String, required: true},
    description: {type: String, 
        required: true, 
        maxlength: [25, 'Description too long, not greater than 25']
    },
    duration: {type: Number, 
        required: true,
        min: [1, 'Duration too short, at least 1 minute']
    },
    date: Date,
    userId: {type: mongoose.Types.ObjectId , required: true  }
});
const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);


module.exports = { User, Exercise };