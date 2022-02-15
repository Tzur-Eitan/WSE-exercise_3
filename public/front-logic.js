function displayAbout(about) {
  cleanMainElement();
  const main = getMainElement();
  main.innerText = about;
}

function displayContact(contact) {
  cleanMainElement();
  const main = getMainElement();
  const keys = Object.keys(contact);
  keys.forEach((key) => {
    const div = document.createElement("div");
    div.innerText = `${key}: ${contact[key]}`;
    main.appendChild(div);
  });
}

function displayFlowers(flowers) {
  cleanMainElement();
  const main = getMainElement();
  const flowersContainer = document.createElement("div");
  flowersContainer.className = "wrap-panel";
  flowers.forEach((flower) => {
    flowersContainer.appendChild(getFlowerCard(flower));
  });
  main.appendChild(flowersContainer);
}

function displayUsers(users, deleteUserButtonClicked) {
  cleanMainElement();
  const main = getMainElement();
  const addUser = document.createElement("button");
  addUser.className = "btn btn-info";
  addUser.innerText = "Add User";
  addUser.setAttribute("data-bs-toggle", "modal");
  addUser.setAttribute("data-bs-target", "#edit-user");
  addUser.addEventListener("click", () => {
    editUserModalForInsertion();
  });
  main.appendChild(addUser);
  if (users.length > 0) {
    const table = document.createElement("table");
    table.appendChild(getUserTableHeader(users[0]));
    users.forEach((user) => {
      table.appendChild(getUserInRow(user, deleteUserButtonClicked));
    });
    main.appendChild(table);
  } else {
    const message = "No user to present";
    main.appendChild(message);
  }
}

function getFormControls() {
  return document.getElementById("user-edit-form").childNodes;
}

function editUserModalForInsertion() {
  document.getElementById("user-modal-title").innerText = "Create";
  document
    .getElementById("edit-user")
    .setAttribute("user-operation-type", "Create");
  showUserTypeOptioms(window.userType === "Employee" ? ["Customer"] : []);
  clearAndShowAllUserForm();
}

function clearAndShowAllUserForm() {
  getFormControls().forEach((child) => {
    if (child.tagName === "DIV") {
      child.style.display = "block";
      child.childNodes.forEach((child2) => {
        if (child2.tagName === "INPUT") {
          child2.value = "";
        }
      });
    }
  });
}

function editUserModalForEdit(user) {
  document.getElementById("user-modal-title").innerText = `Edit ${user.Name}`;
  document
    .getElementById("edit-user")
    .setAttribute("user-operation-type", "Edit");
  document.getElementById("edit-user").setAttribute("user-name", user.Name);
  let controlsToShow = ["user-type-form-control"];
  document.getElementById("user-type").value = user.Type;

  getFormControls().forEach((child) => {
    if (child.tagName !== "DIV") return;
    if (controlsToShow.includes(child.id)) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  });
}

function getUserInRow(user, deleteUserButtonClicked) {
  const row = document.createElement("tr");
  const keys = Object.keys(user);
  keys.forEach((key) => {
    const cell = document.createElement("td");
    cell.innerText = user[key];
    row.appendChild(cell);
  });
  if (window.userType === "Manager") {
    row.appendChild(getUserActionsCell(user, deleteUserButtonClicked));
  }
  return row;
}

function getUserTableHeader(user) {
  const header = document.createElement("tr");
  const keys = Object.keys(user);
  keys.forEach((key) => {
    const cell = document.createElement("th");
    cell.innerText = key;
    header.appendChild(cell);
  });
  return header;
}

function getUserActionsCell(user, deleteUserButtonClicked) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteUserButtonClicked(user));
  const editButten = document.createElement("button");
  editButten.className = "btn btn-light";
  editButten.innerText = "Edit";
  editButten.setAttribute("data-bs-toggle", "modal");
  editButten.setAttribute("data-bs-target", "#edit-user");
  editButten.addEventListener("click", () => {
    editUserModalForEdit(user);
  });
  const cell = document.createElement("td");
  cell.appendChild(editButten);
  cell.appendChild(deleteButton);
  return cell;
}

function getFlowerCard(flower) {
  const card = document.createElement("div");
  card.className = "card";
  card.style = "width: 10rem;";

  const img = document.createElement("img");
  img.src = flower.Image;
  img.className = "card-img-top";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title text-black-50";
  title.innerText = flower.Name;

  const color = document.createElement("span");
  color.className = "card-text text-black-50";
  color.innerText = "Color: " + flower.Color;

  const price = document.createElement("span");
  price.className = "card-text text-black-50";
  price.innerText = "Price: " + flower.Price;

  cardBody.appendChild(title);
  cardBody.appendChild(color);
  cardBody.appendChild(price);

  card.appendChild(img);
  card.appendChild(cardBody);

  return card;
}

function getMainElement() {
  return document.getElementsByTagName("main")[0];
}

function cleanMainElement() {
  const main = getMainElement();
  main.innerText = "";
  main.innerHTML = "";
}

/**
 *
 * @param {*} optionsToShow If empty, show all
 */
function showUserTypeOptioms(optionsToShow = []) {
  const optionsElements = document
    .getElementById("user-type")
    .getElementsByTagName("option");
  for (let option of optionsElements) {
    if (optionsToShow.length === 0 || optionsToShow.includes(option.value)) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
}

/**
 * Manage the page, decide which component to show and which not.
 */
function userLogedIn() {
  document.getElementById("open-login-btn").classList.add("hide");
  document.getElementById("logout-btn").classList.remove("hide");
  document.getElementById("flowers-btn").classList.remove("hide");
  document.getElementById("users-btn").classList.remove("hide");
  clearLogInFormData();
}

/**
 * Manage the page, decide which component to show and which not.
 */
function userLogedOut() {
  document.getElementById("open-login-btn").classList.remove("hide");
  document.getElementById("logout-btn").classList.add("hide");
  document.getElementById("flowers-btn").classList.add("hide");
  document.getElementById("users-btn").classList.add("hide");
}

function clearLogInFormData(){
  document.getElementById("userName-login").value = "";
    document.getElementById("password-login").value = "";
}

function getUserDataFromLoginForm() {
  const userName = document.getElementById("userName-login").value;
  const password = document.getElementById("password-login").value;
  return {
    userName,
    password,
  };
}

function getUserDataFromUserEditForm() {
  const modalElement = document.getElementById("edit-user");
  const userType = document.getElementById("user-type").value;
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const userNameToEdit = modalElement.getAttribute("user-name");
  const userOperationType = modalElement.getAttribute("user-operation-type");
  return {
    userType,
    userName,
    password,
    email,
    userNameToEdit,
    userOperationType,
  };
  
}

function activeNavBtn(hash){
  const nav = document.getElementById("nav-bar");
  const navBtns = nav.getElementsByTagName("a");
  hash = (hash == "#" || hash == "") ? "#about" : hash; 
  for (let btn of navBtns){
    if (btn.hash.toLowerCase() != hash){
      btn.classList.remove("active");
    }
    else{
      btn.classList.add("active");
    }
  }
}
