const USERS_FILE_NAME = "./data/users.json"
let users = require(USERS_FILE_NAME);
const fs = require('fs');

const MANAGER = "Manager";
const EMPLOYEE = "Employee";
const SUPPLIER = "Supplier";
const CUSTOMER = "Customer";

function _getActiveUsers() {
  return users.filter(user => !user.IsDeleted);
}

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
  userToAdd.IsDeleted = false;
  _addUser(userToAdd);
  return true;
}

function removeUser(reqUserName, userNameToRemove) {
  const reqUsertype = getUserType(reqUserName);
  const oldUsertype = getUserType(userNameToRemove)
  if (reqUsertype != MANAGER || oldUsertype == MANAGER) {
    return false;
  }
  _removeUser(userNameToRemove);
  return true;
}

function _removeUser(userName) {
  users.find(user => user.Name === userName).IsDeleted = true;
  updateUsers();
}

//TODO:: add validation
function _addUser(user) {
  users.push(user);
  updateUsers();
}


function changeUserName(reqUserName, userName, newUserType) {
  const reqUserType = getUserType(reqUserName);
  if (reqUserType != MANAGER) {
    return false;
  }
  findUser(userName).Type = newUserType;
  updateUsers();
  return true;
}

/**
 * update the users on the users file
 */
function updateUsers() {
  const json = JSON.stringify(users);
  fs.writeFileSync(USERS_FILE_NAME, json);
}

function getUsers(reqUserName) {
  const type = getUserType(reqUserName);
  if (![EMPLOYEE, MANAGER].includes(type)) {
    return undefined;
  }

  const safeUsers = _getActiveUsers()
    .filter(user => type === MANAGER || user.Type === CUSTOMER)
    .map((user) => {
      const userClone = { ...user };
      if (type === EMPLOYEE) delete userClone.Password;
      delete userClone.IsDeleted;
      return userClone;
    });
  return safeUsers;
}

//return user type by user name
function getUserType(userName) {
  return findUser(userName).Type;
}

function findUser(userName) {
  return _getActiveUsers().find(user => userName == user.Name);
}

function login(userName, password) {
  const user = findUser(userName);
  if (user) {
    return user.Password == password;
  }
  return false;
}

function userExist(userName) {
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