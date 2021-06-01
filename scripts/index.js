const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button");
const popupCloseButtonEdit = document.querySelector(".popup__close-button_edit");
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");
const popupCloseButtonImg = document.querySelector(".popup__close-button-image");
const popupImgDescription = document.querySelector('.popup__description-image');
const formEdit = document.querySelector('.popup__list_edit');
const formAdd = document.querySelector('.popup__list_add')
const jobInput = document.querySelector('input[name="job"]');
const nameInput = document.querySelector('input[name="name"]');
const cardNameInput = document.querySelector('input[name="cardname"]');
const picAddInput = document.querySelector('input[name="piclink"]');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__status');
const saveButtun = document.querySelector('.popup__save-button_edit');
const addButton = document.querySelector('.popup__save-button_add')
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const card = document.querySelector('#cards__template').content.querySelector('.cards__content');
const cards = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_image');
const popupPic = document.querySelector('.popup__pic');

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

const toggleLike = (evt) => {
        evt.target.classList.toggle('cards__like_active')
};

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
popupImgDescription.textContent = event.target.alt;
popupPic.alt = "Фото " + event.target.alt


    openPopup(popupImage);
}

function closePopupImg(){
    closePopup(popupImage);
}


initialCards.forEach((item) => {
    const newCard = createCard(item)
    cards.append(newCard);
})



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
    const item = event.currentTarget;
    if(event.target.classList.contains('cards__delete')){
        item.removeEventListener('click', toggleLike);
        item.removeEventListener('click', deleteCards);
    item.remove()
    }
}




formAdd.addEventListener('submit', addCard);
buttonEdit.addEventListener('click', popupEditOpen);
popupCloseButtonEdit.addEventListener('click', popupEditClose);
popupCloseButtonAdd.addEventListener('click', popupAddClose);
formEdit.addEventListener('submit', formEditSubmitHandler);
buttonAdd.addEventListener('click', popupAddOpen);
popupCloseButtonImg.addEventListener('click', closePopupImg);