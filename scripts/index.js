const popupEdit = document.querySelector(".popup_edit");
const buttonEdit = document.querySelector(".profile__button");
const popupCloseButtonEdit = document.querySelector(
  ".popup__close-button_edit"
);
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");
const popupCloseButtonImg = document.querySelector(
  ".popup__close-button-image"
);
const popupImgDescription = document.querySelector(".popup__description-image");
const formEdit = document.querySelector(".popup__list_edit");
const formAdd = document.querySelector(".popup__list_add");
const jobInput = document.querySelector('input[name="job"]');
const nameInput = document.querySelector('input[name="name"]');
const cardNameInput = document.querySelector('input[name="cardname"]');
const picAddInput = document.querySelector('input[name="piclink"]');
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__status");
const saveButtun = document.querySelector(".popup__save-button_edit");
const addButton = document.querySelector(".popup__save-button_add");
const popupAdd = document.querySelector(".popup_add");
const buttonAdd = document.querySelector(".profile__add-button");
const card = document
  .querySelector("#cards__template")
  .content.querySelector(".cards__content");
const cards = document.querySelector(".cards");
const popupImage = document.querySelector(".popup_image");
const popupPic = document.querySelector(".popup__pic");
const config = {
  formSelector: ".popup__list",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save-button",
  inputError: "popup__info_error",
  inputErrorActive: "popup__input-error_active",
};

function popupAddOpen() {
  openPopup(popupAdd);
}

function popupEditClose() {
  popupEdit.classList.remove("popup_active");
}

function addCard(event) {
  event.preventDefault();
  const addCards = {
    name: "",
    link: "",
  };
  addCards.name = cardNameInput.value;
  addCards.link = picAddInput.value;
  cards.prepend(createCard(addCards));
  formAdd.reset();
  closePopup(popupAdd);
  
  controlButton(addButton, [cardNameInput, picAddInput]);

}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener('keydown', popupEscClose);
  popup.removeEventListener('mousedown', popupOverlayClose);
}

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener('keydown', popupEscClose);
  popup.addEventListener('mousedown', popupOverlayClose);
}

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("cards__like_active");
};

function createCard(element) {
  const newCard = card.cloneNode(true);
  const cardPic = newCard.querySelector(".cards__grid");
  newCard.querySelector(".cards__name").textContent = element.name;
  cardPic.src = element.link;
  cardPic.alt = element.name;
  const cardLike = newCard.querySelector(".cards__like");
  cardLike.addEventListener("click", handleLikeClick );
  newCard
    .querySelector(".cards__delete")
    .addEventListener("click", deleteCard);
  cardPic.addEventListener("click", openImagePopup);
  return newCard;
}
function openImagePopup(event) {
  popupPic.src = event.target.src;
  popupImgDescription.textContent = event.target.alt;
  popupPic.alt = "Фото " + event.target.alt;

  openPopup(popupImage);
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cards.append(newCard);
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

function deleteCard(event) {
  event.target.closest(".cards__content").remove();
}

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

enableValidation(config);
