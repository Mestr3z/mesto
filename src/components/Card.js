export default class Card {
  constructor(
    { data, cardClickAction, likeClickAction, confirmDeleteAction },
    cardSelector,
    userId
  ) {
    this._cardSelector = document.querySelector(cardSelector);
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._cardClickAction = cardClickAction;
    this._likeClickAction = likeClickAction;
    this._ownerId = data.owner._id;
    this._confirmDeleteAction = confirmDeleteAction;
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
    this._likeButton = this._cardElement.querySelector(".cards__like");
    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._cardElement
        .querySelector(".cards__like")
        .classList.add("cards__like_active");
    }
    if (!(this._ownerId === this._userId)) {
      this._cardElement.querySelector(".cards__delete").style.display = "none";
    }
    this._cardElement.querySelector(".cards__likes").textContent =
      this._likes.length;

    this._setEventListeners();
    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.closest(".cards__content").remove();
  }

  updateLikesCount(value) {
    this._likes = value;
    this.setLikeCount(value.length);
  }

  setLikeCount(likes) {
    this._cardElement.querySelector(".cards__likes").textContent = likes;
    this._toggleLikeButton(this._userId);
  }

  likedByUser() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  _toggleLikeButton() {
    if (this.likedByUser(this._userId)) {
      this._likeButton.classList.add("cards__like_active");
    } else {
      this._likeButton.classList.remove("cards__like_active");
    }
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like")
      .addEventListener("click", () => this._likeClickAction());
    this._cardElement
      .querySelector(".cards__delete")
      .addEventListener("click", () => this._confirmDeleteAction());
    this._cardElement
      .querySelector(".cards__grid")
      .addEventListener("click", () =>
        this._cardClickAction({
          name: this._cardName,
          link: this._cardLink,
        })
      );
  }
}
