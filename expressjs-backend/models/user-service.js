const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");

dotenv.config();

const uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PWD + "@" + process.env.MONGO_CLUSTER + "/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

async function getUsers() {
    return await userModel.find();
}

async function findUserById(id) {
    try {
        return await userModel.findById(id);
    } 
    catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(usernameInput, user) {
    try {
        if ((await userModel.find({username: usernameInput})).length == 0){
            const userToAdd = new userModel(user);
            const savedUser = await userToAdd.save();
            return savedUser;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function findUserByUsername(username) {
    return await userModel.find({ username: username });
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.findUserByUsername = findUserByUsername;