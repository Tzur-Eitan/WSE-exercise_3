const express = require("express");
const flowers = require("./data/flowers.json");
const usersUtils = require("./users");
const aboutCompany = require("./data/about.json");
const contctInfo = require("./data/contact.json");
const bodyParser = require('body-parser');
const path = require('path');

const ERROR = "ERROR";
const SUCCESS  = "SUCCESS"; 

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

function verifyLogin(req, res, next){
  const userName = req.query.reqUserName;
  const userExist = usersUtils.userExist(userName);
  if (userExist){
    next()
  }
  else{
    res.json({Type: ERROR, Content: "Please log in first"})
  }
}

//return flowers list
app.get("/Flowers", verifyLogin, function (req, res) {
  res.json({Type: SUCCESS, Content: flowers});
});

//return all the users without password filed
app.get("/Users", verifyLogin, function (req, res) {
  const userName = req.query.reqUserName;
  const users = usersUtils.getUsers(userName);
  if (users == undefined) {
    res.json({ Type: ERROR, Content: "Authorization required" });
  } else {
    res.json({Type: SUCCESS, Content: users});
  }
});

//add user
app.get("/AddUser", verifyLogin, function (req, res) {
  const userToAdd = {
    Name: req.query.userName,
    Password: req.query.userPassword,
    Email: req.query.userEmail,
    Type: req.query.userType,
  };
  const reqUserName = req.query.reqUserName;
  const manageToAdd = usersUtils.addUser(reqUserName, userToAdd);
  if (manageToAdd) {
    res.json({ Type: SUCCESS, Content: "Manage to add user" });
  }
  else{
    res.json({ Type: ERROR, Content: "Authorization required" });
  }
});

app.get("/RemoveUser", verifyLogin, function(req, res){
    const userNameToRemove = req.query.userName;
    const reqUserName = req.query.reqUserName;
    const manageToRemove = usersUtils.removeUser(reqUserName, userNameToRemove);
    if(manageToRemove){
        res.json({ Type: SUCCESS, Content: "Manage to remove user" });
    }
    else{
        res.json({ Type: ERROR, Content: "Authorization required" });
    }
})

app.get("/userType", verifyLogin, function(req, res){
  const reqUserName = req.query.reqUserName;
  const userType = usersUtils.getUserType(reqUserName);
  if(userType !== undefined){
    res.json({Type:SUCCESS, Content: userType});
  }
  else {
    res.json({Type: ERROR, Content: "User name not found"})
  }
});

app.get("/ChangeUserType", verifyLogin, function(req, res){
    const reqUserName = req.query.reqUserName;
    const userName = req.query.userName;
    const newUserType = req.query.newUserType;
    const manageToChange = usersUtils.changeUserName(reqUserName, userName, newUserType);
    if(manageToChange){
        res.json({Type: SUCCESS, Content: "Manage to change user type" });
    }
    else{
        res.json({ Type: ERROR, Content: "Authorization required" });
    }
})

//About company
app.get("/About", function(req, res){
  res.json({Type: SUCCESS, Content: aboutCompany.Data});
})

//Contact company
app.get("/Contact", function(req, res){
  res.json({Type: SUCCESS, Content: contctInfo});
})

app.post("/login", function(req, res){
  const body  =req.body;
  const userName = body.userName;
  const password = body.password;
  const logInSuccess = usersUtils.login(userName, password);
  if (logInSuccess){
    res.sendStatus(200);
  }
  else{
    res.sendStatus(400);
  }
})

app.listen(8080, function(){
    console.log('server running at port 8080');
});
