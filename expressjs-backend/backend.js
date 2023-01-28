const express = require('express');
const router = express.Router();

var users = [
    {userid: "Bharath", password: "1121"}
];

var cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.post('/account/login', (req, res) => {
    console.log("Request: POST - Check if user exists");
    const usernameInput = req.body.value.username
    const passwordInput = req.body.value.password
    var found = false;
    for (let i = 0; i < users.length; i++) {
        const tempUser = users[i].userid;
        const tempPass = users[i].password;
        if(usernameInput === tempUser && passwordInput === tempPass){
            const token = 123456789;
            res.status(200).json({ token, usernameInput, passwordInput });
            console.log("Response status: 200");
            found = true;
        }
    }
    if(!found){
        res.status(401).json({ message: 'Invalid Credentials' });
        console.log("Response status: 401")
    }
})

function containsUppercase(string) {
    return /[A-Z]/.test(string);
}

function containsNumber(string) {
    return /\d/.test(string);
}

app.post('/account/register', (req, res) => {
    console.log("Request: POST - Add a user to list");
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    const confirmPassInput = req.body.confirmPass;
    if (usernameInput.length < 8 || passwordInput.length < 8) {
        console.log("Response status: 401")
        res.status(401).json({message: 'Username and password must be at least 8 characters long.'});
    }
    else if (passwordInput != confirmPassInput){
        console.log("Response status: 401")
        res.status(401).json({message: 'Passwords must match.'});
    }
    else if (!containsUppercase(passwordInput)){
        console.log("Response status: 401")
        res.status(401).json({message: 'Passwords must contain an upercase letter.'});
    }
    else if (!containsNumber(passwordInput)){
        console.log("Response status: 401")
        res.status(401).json({message: 'Passwords must contain an integer.'});
    }
    else{
        var flag = false;
        for (let i = 0; i < users.length; i++) {
            const userTemp = users[i].userid;
            if(usernameInput == userTemp){
                flag = true;
                break;
            }
            
        }
        if(!flag){
            users.push({userid: usernameInput, password: passwordInput});
            console.log("Response status: 200")
            res.status(200).json(users);
        }
        else{
            console.log("Response status: 401")
            res.status(401).json({message: 'Username already exists.'});
        }
    }
})

app.get('/account/users', (req, res) => {
    console.log("Request: GET - All users")
    res.send(users)
})

app.get('/account/users/:userid', (req, res) => {
    const myUserId = req.params.userid
    var flag = false;
    for (let i = 0; i < users.length; i++) {
        const userTemp = users[i].userid;
        if(myUserId == userTemp){
            res.send(users[i]);
            flag = true;
            console.log("Request: GET - One user")
            break;
        }
        
    }
    if(!flag){
        console.log("Response status: 401")
        res.status(401).send('Invalid Username');
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});