const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: [validator.isEmail, "Please Enter a valid Email"], },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: {
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
},
});

module.exports = mongoose.model("User", userSchema);
