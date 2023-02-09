const express = require('express');
const router = express.Router();

const userServices = require("./models/user-service");

var cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.post('/account/login', async (req, res) => {
    console.log("Request: POST - Check if user exists");
    const usernameInput = req.body.value.username
    const passwordInput = req.body.value.password
    let result = await userServices.findUserByUsername(usernameInput);
    if (result.length == 1){
        if (passwordInput ==  result[0].password){
            const token = 123456789;
            res.status(200).json({ token, usernameInput, passwordInput });
            console.log("Response status: 200");
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
            console.log("Response status: 401")
        }
    }
    else {
        res.status(401).json({ message: 'Username does not exist' });
        console.log("Response status: 401")
    }
})

function containsUppercase(string) {
    return /[A-Z]/.test(string);
}

function containsNumber(string) {
    return /\d/.test(string);
}

app.post('/account/register', async (req, res) => {
    console.log("Request: POST - Add a user to list");
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    const confirmPasswordInput = req.body.confirmPassword;
    if (usernameInput.length < 8 || passwordInput.length < 8) {
        console.log("Response status: 401")
        res.status(404).json({message: 'Username and password must be at least 8 characters long.'});
    }
    else if (passwordInput != confirmPasswordInput){
        console.log("Response status: 401")
        res.status(404).json({message: 'Passwords must match.'});
    }
    else if (!containsUppercase(passwordInput)){
        console.log("Response status: 401")
        res.status(404).json({message: 'Passwords must contain an upercase letter.'});
    }
    else if (!containsNumber(passwordInput)){
        console.log("Response status: 401")
        res.status(404).json({message: 'Passwords must contain an integer.'});
    }
    else{
        let result = await userServices.addUser(usernameInput, req.body);
        if (result === undefined || result === null) {
            res.status(404).json({message: 'Username already exists.'});
        }
        else {
            res.send(result);
        }
    }
})

app.get('/account/users', async (req, res) => {
    console.log("Request: GET - All users")
    let result = await userServices.getUsers();
    if (result === undefined || result === null) {
        res.status(404).send("Error Occured.");
    }
    else {
        res.send(result);
    }
})

app.get('/account/users/:userid', async (req, res) => {
    const myUserId = req.params.userid;
    let result = await userServices.findUserByUsername(myUserId);
    if (result === undefined || result === null) {
        res.status(404).send("Resource not found.");
    }
    else {
        res.send(result);
    }
})

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
});