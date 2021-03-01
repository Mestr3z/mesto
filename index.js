const popupEdit = document.querySelector(".form");
const buttonEdit = document.querySelector(".profile__button");
const popupCloseButton = document.querySelector(".form__button");
const buttonLike = document.querySelector('.cards__like');
const formEdit = document.querySelector('.form__list');
const jobInput = document.querySelector('input[name="job"]');
let nameInput = document.querySelector('input[name="name"]');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__status');
let saveButtun = document.querySelector('.form__save-button');

const popupEditOpen = () => {
    popupEdit.classList.add('form_active');
    jobInput.value = userJob.textContent;
    nameInput.value = userName.textContent;
};

const popupEditClose = () => {
    popupEdit.classList.toggle('form_active');
};

const formEditSubmitHandler = (evt) => {
    evt.preventDefault();
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    userName.textContent = nameValue;
    userJob.textContent = jobValue;

    popupEditClose();
}


const toggleLike = (evt) => {
    evt.target.classList.toggle('cards__like_active');
};


buttonLike.addEventListener('click', toggleLike);
buttonEdit.addEventListener('click', popupEditOpen);
popupCloseButton.addEventListener('click', popupEditClose);
formEdit.addEventListener('submit', formEditSubmitHandler);
