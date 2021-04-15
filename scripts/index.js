const popupEdit = document.querySelector(".popup__edit");
const buttonEdit = document.querySelector(".profile__button");
const popupCloseButtonEdit = document.querySelector(".popup__close-button_edit");
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");
const popupCloseButtonImg = document.querySelector(".popup__close-button_image");
const popupImgDescription = document.querySelector('.popup__description_image');
const buttonLike = document.querySelector('.cards__like');
const formEdit = document.querySelector('.popup__list_edit');
const formAdd = document.querySelector('.popup__list_add')
const jobInput = document.querySelector('input[name="job"]');
let nameInput = document.querySelector('input[name="name"]');
let cardNameInput = document.querySelector('input[name="cardname"]');
let picAddInput = document.querySelector('input[name="piclink"]');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__status');
let saveButtun = document.querySelector('.popup__save-button_edit');
let addButton = document.querySelector('.popup__save-button_add')
const popupAdd = document.querySelector('.popup__add');
const buttonAdd = document.querySelector('.profile__add-button');
const card = document.querySelector('#cards__template').content.querySelector('.cards__content');
const cards = document.querySelector('.cards');
const popupImage = document.querySelector('.popup__image');
const popupPic = document.querySelector('.popup__pic');
const toggleLike = (evt) => {
    if (evt.target.classList.contains('cards__like')) {
        evt.target.classList.toggle('cards__like_active')
    };
};


function popupAddOpen () {
    openPopup(popupAdd);
}

function addCard(event) {
    event.preventDefault();
    const addCards = {
        name:'',
        link:''
    }
    addCards.name = cardNameInput.value;
    addCards.link = picAddInput.value;
    cards.prepend(createCard(addCards));
    formAdd.reset();
    popupAddClose();
}


function closePopup(popup) {
    popup.classList.remove('popup_active');
}



function openPopup(popup){
    popup.classList.add('popup_active');
}

function createCard(element){
    const newCard = card.cloneNode(true);
    const cardPic = newCard.querySelector('.cards__grid');
    newCard.querySelector('.cards__name').textContent = element.name;
    cardPic.src = element.link;
    cardPic.alt = element.name;
    const cardLike = newCard.querySelector('.cards__like');
    cardLike.addEventListener('click', toggleLike);
    newCard.addEventListener('click', deleteCards);
    cardPic.addEventListener('click', openImagePopup);
    return newCard;

}
function openImagePopup(event){
popupPic.src = event.target.src;
popupImgDescription.textContent = event.target.alt

    openPopup(popupImage);
}

function closePopupImg(){
    closePopup(popupImage);
}

function createCards() {
for(let i =  0; i < initialCards.length; i++){
const newCard = createCard(initialCards[i]);
cards.append(newCard);
}
};
createCards();

const popupEditOpen = () => {
    openPopup(popupEdit);
    jobInput.value = userJob.textContent;
    nameInput.value = userName.textContent;
};

const popupEditClose = () => {
    closePopup(popupEdit);
};


const popupAddClose = () => {
    closePopup(popupAdd);
};


const formEditSubmitHandler = (evt) => {
    evt.preventDefault();
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    userName.textContent = nameValue;
    userJob.textContent = jobValue;

    popupEditClose();
}

function deleteCards(event) {
    event.preventDefault();
    const item = event.currentTarget;
    if(event.target.classList.contains('cards__delete_img')){
        item.removeEventListener('click', toggleLike);
        item.removeEventListener('click', deleteCards);
    item.remove()
    }
}




addButton.addEventListener('click', addCard);
buttonEdit.addEventListener('click', popupEditOpen);
popupCloseButtonEdit.addEventListener('click', popupEditClose);
popupCloseButtonAdd.addEventListener('click', popupAddClose);
formEdit.addEventListener('submit', formEditSubmitHandler);
buttonAdd.addEventListener('click', popupAddOpen);
popupCloseButtonImg.addEventListener('click', closePopupImg);