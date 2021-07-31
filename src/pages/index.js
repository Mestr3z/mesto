import "../pages/index.css";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/initialCards.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button");
export const popupImgDescription = document.querySelector(
  ".popup__description-image"
);

const jobInput = document.querySelector('input[name="job"]');
const nameInput = document.querySelector('input[name="name"]');
const userName = ".profile__name";
const userJob = ".profile__status";
const popupAdd = document.querySelector(".popup_add");
const buttonAdd = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup_image");
const formAddCard = popupAdd.querySelector(".popup__list_add");
const formEditProfile = popupEdit.querySelector(".popup__list_edit");
const cardTemplate = "#cards__template";
const cardsContainer = ".cards";
const userInfo = new UserInfo({ name: userName, description: userJob });

const config = {
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save-button",
  inputError: "popup__info_error",
  disabledButton: "popup__save-button_disabled",
  inputErrorActive: "popup__input-error_active",
};

const addCardFormValidator = new FormValidator(config, formAddCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, formEditProfile);
editProfileFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupWithAddForm = new PopupWithForm(popupAdd, (inputValues) => {
  const card = createCard(inputValues);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  addCardFormValidator.disableSubmitButton();
});
popupWithAddForm.setEventListeners();

const popupWithEditForm = new PopupWithForm(popupEdit, () => {
  userInfo.setUserInfo(nameInput, jobInput);
});
popupWithEditForm.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupWithImage.open(data);
      },
    },
    cardTemplate
  );
  return card;
};
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);
cardList.renderItems();

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfileFormValidator.enableSubmitButton();
  editProfileFormValidator.hideErrors();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  popupWithEditForm.open();
});

buttonAdd.addEventListener("click", () => {
  popupWithAddForm.open();
  addCardFormValidator.hideErrors();
});
