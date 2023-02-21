const https = require("https");
const fs = require("fs");
const port = 5000;
const express = require('express');
const jwt = require('jsonwebtoken');
const userServices = require("./models/user-service");
var cors = require('cors')
const dotenv = require("dotenv");
const router = express.Router();
const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();

app.listen(port, () => {console.log(`Application listening at http://localhost:${port}`);});

// https.createServer(
//     {
//         key: fs.readFileSync("key.pem"),
//         cert: fs.readFileSync("cert.pem"),
//     },
//     app).listen(port, () => {console.log(`Application listening at https://localhost:${port}`);});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

function containsUppercase(string) {
    return /[A-Z]/.test(string);
}

function containsNumber(string) {
    return /\d/.test(string);
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if (err) return res.sendStatus(403)
        req.username = username
        next()
    })
}

app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})

app.post('/account/login', async (req, res) => {
    console.log("Request: POST - Check if user exists");
    const usernameInput = req.body.value.username
    const passwordInput = req.body.value.password
    let result = await userServices.findUserByUsername(usernameInput);
    if (result.length == 1){
        if (passwordInput ==  result[0].password){
            const token = generateAccessToken({username: usernameInput});
            res.cookie('jwt_token', token, { httpOnly: true });
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

app.post('/account/register', async (req, res) => {
    console.log("Request: POST - Add a user to list");
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    const confirmPasswordInput = req.body.confirmPassword;
    if (usernameInput && passwordInput && typeof usernameInput == 'string' && typeof passwordInput == 'string') {
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
    }
    else{}
})

app.get('/account/users', authenticateToken, async (req, res) => {
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