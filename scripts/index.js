import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button");
const popupCloseButtonEdit = document.querySelector(
  ".popup__close-button_edit"
);
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");
const popupCloseButtonImg = document.querySelector(
  ".popup__close-button-image"
);
export const popupImgDescription = document.querySelector(".popup__description-image");
const formEdit = document.querySelector(".popup__list_edit");
const formAdd = document.querySelector(".popup__list_add");
const jobInput = document.querySelector('input[name="job"]');
const nameInput = document.querySelector('input[name="name"]');
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__status");
const popupAdd = document.querySelector(".popup_add");
const buttonAdd = document.querySelector(".profile__add-button");
export const popupImage = document.querySelector(".popup_image");
export const popupPic = document.querySelector(".popup__pic");
const formAddCard = popupAdd.querySelector('.popup__list_add')
const formEditProfile = popupEdit.querySelector('.popup__list_edit')

const config = {
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save-button",
  inputError: "popup__info_error",
  disabledButton: "popup__save-button_disabled",
  inputErrorActive: "popup__input-error_active",
};

const addCardFormValidator = new FormValidator(config, formAddCard);
addCardFormValidator.enableValidation();

function popupAddOpen() {
  openPopup(popupAdd);
}

const editProfileFormValidator = new FormValidator(config, formEditProfile);
editProfileFormValidator.enableValidation();


function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener('keydown', popupEscClose);
  popup.removeEventListener('mousedown', popupOverlayClose);
}

export function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener('keydown', popupEscClose);
  popup.addEventListener('mousedown', popupOverlayClose);
}

const addCard = (item) => {
  const card = new Card('#cards__template', item.name, item.link);
  const newCard = card.generateCard();
  document.querySelector('.cards').prepend(newCard);
  };
  
  initialCards.forEach ((item) => {
  addCard(item);
  });



const openEditPopup = () => {
  openPopup(popupEdit);
  jobInput.value = userJob.textContent;
  nameInput.value = userName.textContent;
  updateInputValue(jobInput, userJob.textContent);
  updateInputValue(nameInput, userName.textContent);
};

const formEditSubmitHandler = (evt) => {
  evt.preventDefault();
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;
  userName.textContent = nameValue;
  userJob.textContent = jobValue;

  closePopup(popupEdit);
};


const popupEscClose = (evt) => {
    if(evt.key === 'Escape') {
        const popupEsc = document.querySelector('.popup_active');
        closePopup(popupEsc);
    }
}

const popupOverlayClose = (evt) => {
    if(evt.target === evt.currentTarget) {
        const popupOverlay = document.querySelector('.popup_active');
        closePopup(popupOverlay, evt.target);
    }
}

const updateInputValue = (inputElement, value) => {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
    };


formAdd.addEventListener("submit", addCard);
buttonEdit.addEventListener("click", openEditPopup);
popupCloseButtonEdit.addEventListener("click", () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener("click", () => closePopup(popupAdd));
formEdit.addEventListener("submit", formEditSubmitHandler);
buttonAdd.addEventListener("click", popupAddOpen);
popupCloseButtonImg.addEventListener("click", () => closePopup(popupImage));