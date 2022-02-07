const USERS_FILE_NAME = "./data/users.json"
const users = require(USERS_FILE_NAME);
const fs = require('fs');

const MANAGER = "Manager";
const EMPLOYEE = "Employee";
const SUPPLIER = "Supplier";
const CUSTOMER = "Customer";

//Add user by user request clasification
function addUser(reqUserName, userToAdd) {
  const reqUsertype = getUserType(reqUserName);
  const newUsertype = userToAdd.Type;
  if (reqUsertype == CUSTOMER || reqUsertype == SUPPLIER) {
    return false;
  }
  if (reqUsertype == EMPLOYEE && newUsertype != CUSTOMER) {
    return false;
  }
  _addUser(userToAdd);
  return true;
}

function removeUser(reqUserName, userNameToRemove){
    const reqUsertype = getUserType(reqUserName);
    const oldUsertype = getUserType(userNameToRemove)
    if(reqUsertype != MANAGER || oldUsertype == MANAGER){
        return false;
    } 
    _removeUser(userNameToRemove);
    return true;
}

function _removeUser(userName){
    users = users.filter(user => user.Name != userName);
    updateUsers();
}

//TODO:: add validation
function _addUser(user) {
  users.push(user);
  updateUsers();
}


function changeUserName(reqUserName, userName, newUserType){
    const reqUserType = getUserType(reqUserName);
    if(reqUserType != MANAGER){
        return false;
    }
    findUser(userName).Type = newUserType;
    updateUsers();
    return true;
}

/**
 * update the users on the users file
 */
 function updateUsers(){
  const json = JSON.stringify(users);
  fs.writeFile(USERS_FILE_NAME, json, 'utf8');
}

function getUsers(reqUserName) {
  const type = getUserType(reqUserName);
  switch (type) {
    case MANAGER:
      return users;
    case EMPLOYEE:
      const safeUsers = users.map((user) => {
        const userClone = { ...user };
        delete userClone.Password;
        return userClone;
      });
      return safeUsers;
    default:
      return undefined;
  }
}

//return user type by user name
function getUserType(userName) {
  return findUser(userName).Type;
}

function findUser(userName){
    return users.find(user => userName == user.Name);
}

function login(userName, password){
  const user =  findUser(userName);
  if (user){
    return user.Password == password;
  }
  return false;
}

function userExist(userName){
  const user = findUser(userName);
  return user != undefined;
}

// module.exports.addCustomer = addCustomer;
module.exports.getUserType = getUserType;
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.changeUserName = changeUserName;
module.exports.login = login;
module.exports.userExist = userExist;