import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitButtonCallback) {
    super(popupElement);
    this._submitButtonCallback = submitButtonCallback;
    this._formSelector = this._popupElement.querySelector(".popup__list");
    this._inputList = this._formSelector.querySelectorAll(".popup__info");
    this._popupButton = this._formSelector.querySelector(".popup__save-button");
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
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
      this._submitButtonCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formSelector.reset();
  }
}
