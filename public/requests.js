const ERROR = "ERROR";
const SUCCESS  = "SUCCESS"; 

function login(userName, password, successCallback, failedCallback){
    const data = {
        userName,
        password
    };
    $.post("/login", data, function(data, status){
        if (status == "success"){
            successCallback(userName);
        }
        else{
            failedCallback();
        }
    })
}

function getFlowers(logUserName, successCallback, failedCallback){
    createGetRequest("/Flowers", {reqUserName: logUserName}, successCallback, failedCallback);
}

function getUsers(logUserName, successCallback, failedCallback){
    createGetRequest("/Users", {reqUserName: logUserName}, successCallback, failedCallback);
}

function addUser(logUserName, userName, password, email, type, successCallback, failedCallback){
    const userToAdd = {
        userName,
        userPassword: password,
        userEmail: email,
        userType: type
    };
    createGetRequest("/AddUser", {reqUserName: logUserName,...userToAdd}, successCallback, failedCallback);
}

function removeUser(logUserName, userNameToRemove, successCallback, failedCallback){
    const data = {
        reqUserName: logUserName, 
        userName: userNameToRemove
    };
    createGetRequest("/RemoveUser", data, successCallback, failedCallback);
}

function changeUserType(logUserName, userNameToEdit, newUserType, successCallback, failedCallback){
    const data = {
        reqUserName: logUserName,
        userName: userNameToEdit,
        newUserType
    };
    createGetRequest("/ChangeUserType", data, successCallback, failedCallback);
}

function getContact(successCallback){
    createGetRequest("/Contact", {}, successCallback, ()=>{})
}

function getAbout(successCallback){
    createGetRequest("/About", {}, successCallback, ()=>{})
}

function createGetRequest(url, data, successCallback, failedCallback){
    $.get(url, data, function(data, status){
        if (data.Type == SUCCESS){
            successCallback(data.Content);
        }
        else{
            failedCallback(data.Content);
        }
    })
}
