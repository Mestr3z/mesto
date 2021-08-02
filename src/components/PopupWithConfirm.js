import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._formSelector = this._popupElement.querySelector(".popup__list");
    this._popupButton = this._formSelector.querySelector(".popup__save-button");
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Сохранение...";
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitCallback();
    });
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}
