export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._cardSelector = document.querySelector(cardSelector);
    this._cardName = data.name;
    this._cardLink = data.link;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._cardElement = this._cardSelector.content
      .querySelector(".cards__content")
      .cloneNode(true);
  }
  generateCard() {
    this._getTemplate();
    const imageSelector = this._cardElement.querySelector(".cards__grid");
    imageSelector.src = this._cardLink;
    imageSelector.alt = this._cardName;
    this._cardElement.querySelector(".cards__name").textContent =
      this._cardName;
    this._setEventListeners();
    return this._cardElement;
  }
  _cardLike() {
    this._cardElement
      .querySelector(".cards__like")
      .classList.toggle("cards__like_active");
  }
  _deleteCard() {
    this._cardElement.closest(".cards__content").remove();
  }
  
  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like")
      .addEventListener("click", () => this._cardLike());
    this._cardElement
      .querySelector(".cards__delete")
      .addEventListener("click", () => this._deleteCard());
    this._cardElement
      .querySelector(".cards__grid")
      .addEventListener("click", () =>
        this._handleCardClick({
          name: this._cardName,
          link: this._cardLink,
        })
      );
  }
}
