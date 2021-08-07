 const options = {
  url: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "af92c62f-bae6-4253-ab2a-21f608ccf261",
    "Content-Type": "application/json",
  },
};
 const popupEdit = document.querySelector(".popup_edit");
 const buttonEdit = document.querySelector(".profile__button");
 const popupImgDescription = document.querySelector(
  ".popup__description-image"
);
 export default escape = "Escape";
 const popupAdd = document.querySelector(".popup_add"); 
 const popupDelete = document.querySelector(".popup_delete");
const popupAvatar = document.querySelector(".popup_avatar");
 const jobInput = document.querySelector('input[name="job"]');
 const nameInput = document.querySelector('input[name="profilename"]');
 const userName = ".profile__name";
 const userJob = ".profile__status";
const userAvatar = ".profile__avatar";
 const buttonAdd = document.querySelector(".profile__add-button");
 const popupImage = document.querySelector(".popup_image");
const formAddCard = popupAdd.querySelector(".popup__list_add");
 const formEditProfile = popupEdit.querySelector(".popup__list_edit");
 const cardTemplate = "#cards__template";
 const cardsContainer = ".cards";
 const formAvatarProfile = popupAvatar.querySelector(".popup__list_avatar");
 const avatarButton = document.querySelector(".profile__button-avatar");
 const config = {
    inputSelector: ".popup__info",
    submitButtonSelector: ".popup__save-button",
    inputError: "popup__info_error",
    disabledButton: "popup__save-button_disabled",
    inputErrorActive: "popup__input-error_active",
  };
  export {
    options,
    popupEdit,
    buttonEdit,
    popupImgDescription,
    popupDelete,
    popupAvatar,
    jobInput,
    nameInput,
    userName,
    userJob,
    userAvatar,
    buttonAdd,
    popupImage,
    formAddCard,
    formEditProfile,
    cardTemplate,
    cardsContainer,
    formAvatarProfile,
    avatarButton,
    popupAdd,
    config
  };