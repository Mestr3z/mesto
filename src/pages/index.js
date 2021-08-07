import "../pages/index.css";
import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

import {options,
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
config} from '../components/constants'






let userId;
const api = new Api(options);

api
  .getData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((error) => console.log(error));

const userInfo = new UserInfo({
  name: userName,
  description: userJob,
  avatar: userAvatar,
});

const popupWithAvatar = new PopupWithForm(popupAvatar, (values) => {
  popupWithAvatar.renderLoading(true);
  api
    .changeUserAvatar(values)
    .then((data) => {
      userInfo.setUserAvatar(data);
      avatarEditFormValidator.disableSubmitButton();
      popupWithAvatar.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupWithAvatar.renderLoading(false));
});
popupWithAvatar.setEventListeners();



const addCardFormValidator = new FormValidator(config, formAddCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, formEditProfile);
editProfileFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const avatarEditFormValidator = new FormValidator(config, formAvatarProfile);
avatarEditFormValidator.enableValidation();

const popupWithAddForm = new PopupWithForm(popupAdd, (values) => {
  popupWithAddForm.renderLoading(true);
  api
    .addCard(values)
    .then((data) => {
      const card = createCard(data);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      addCardFormValidator.disableSubmitButton();
      popupWithAddForm.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupWithAddForm.renderLoading(false));
});
popupWithAddForm.setEventListeners();

const popupWithDeleteForm = new PopupWithConfirm(popupDelete);
popupWithDeleteForm.setEventListeners();

const popupWithEditForm = new PopupWithForm(popupEdit, (values) => {
  popupWithEditForm.renderLoading(true);
  api
    .setUserInfoByApi(values)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithEditForm.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupWithEditForm.renderLoading(false));
});
popupWithEditForm.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      cardClickAction: () => {
        popupWithImage.open(data);
      },
      likeClickAction: () => {
        if (!card.likedByUser()) {
          api
            .addLike(card._id)
            .then((data) => {
              card.updateLikesCount(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteLike(card._id)
            .then((data) => {
              card.updateLikesCount(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      confirmDeleteAction: () => {
        popupWithDeleteForm.open();
        popupWithDeleteForm.setSubmitAction(() => {
          popupWithDeleteForm.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.deleteCard();
              popupWithDeleteForm.close();
            })
            .catch((error) => console.log(error))
            .finally(() => popupWithDeleteForm.renderLoading(false));
        });
      },
    },
    cardTemplate,
    userId
  );
  return card;
};
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

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

avatarButton.addEventListener("click", () => {
  popupWithAvatar.open();
  avatarEditFormValidator.hideErrors();
});

