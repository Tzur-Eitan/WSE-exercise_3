function displayAbout(about){
    cleanMainElement();
    const main = getMainElement();
    main.innerText= about;
}

function displayContact(contact){
    cleanMainElement();
    const main = getMainElement();
    const keys = Object.keys(contact);
    keys.forEach(key => {
        const div = document.createElement("div");
        div.innerText = `${key}: ${contact[key]}`;
        main.appendChild(div);
    })
}

function displayFlowers(flowers){
    cleanMainElement();
    const main = getMainElement();
    const flowersContainer = document.createElement("div");
    flowersContainer.className= 'wrap-panel';
    flowers.forEach(flower => {flowersContainer.appendChild(getFlowerCard(flower))});
    main.appendChild(flowersContainer);
}

function getFlowerCard(flower){
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 10rem;" ;

    const img = document.createElement('img');
    img.src = flower.Image;
    img.className = "card-img-top";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement('h5');
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

function getMainElement(){
    return document.getElementsByTagName("main")[0];
}

function cleanMainElement(){
    const main = getMainElement();
    main.innerText= "";
    main.innerHTML= "";
}