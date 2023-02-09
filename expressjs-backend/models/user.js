const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { collection: "users_list" }
);  

const User = mongoose.model("User", UserSchema);
  
module.exports = User;