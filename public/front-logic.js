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

function displayUsers(users, editUserButtonClicked, deleteUserButtonClicked, addUserButtonClicked) {
  cleanMainElement();
  const main = getMainElement();
  const addUser = document.createElement("button");
  addUser.className = "btn btn-info";
  addUser.innerText = "Add User";
  addUser.setAttribute("data-bs-toggle", "modal");
  addUser.setAttribute("data-bs-target", "#edit-user");
  addUser.click = addUserButtonClicked;
  main.appendChild(addUser);
  if(users.length > 0){
    const table = document.createElement("table");
    table.appendChild(getUserTableHeader(users[0]));
    users.forEach(user => {
        table.appendChild(getUserInRow(user, editUserButtonClicked, deleteUserButtonClicked));
    });
    main.appendChild(table);
  }
  else{
      const message = "No user to present";
      main.appendChild(message);
  }
}


function getUserInRow(user, editUserButtonClicked, deleteUserButtonClicked) {
  const row = document.createElement("tr");
  const keys = Object.keys(user);
  keys.forEach((key) => {
    const cell = document.createElement("td");
    cell.innerText = user[key];
    row.appendChild(cell);
  });
  row.appendChild(getUserActionsCell(user, editUserButtonClicked, deleteUserButtonClicked));
  return row;
}

function getUserTableHeader(user){
    const header = document.createElement("tr");
    const keys = Object.keys(user);
  keys.forEach((key) => {
    const cell = document.createElement("th");
    cell.innerText = key;
    header.appendChild(cell);
  });
  return header;
}

function getUserActionsCell(user, editUserButtonClicked, deleteUserButtonClicked){
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "Delete";
  deleteButton.click = () => deleteUserButtonClicked(user);
  const editButten = document.createElement("button");
  editButten.className = "btn btn-light";
  editButten.innerText = "Edit";
  editButten.click = () => editUserButtonClicked(user);
  const cell  = document.createElement("td");
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
