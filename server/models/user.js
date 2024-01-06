const mongoose = require("mongoose");  

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    age : {
        type: Number,
        required: true,
        min: 6,
        max: 255,
    },

})

module.exports = mongoose.model("Person", userSchema);