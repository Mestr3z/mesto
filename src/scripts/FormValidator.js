export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._disableButtonClass = data.disabledButton;
    this._inputErrorClass = data.inputError;
    this._errorActiveClass = data.inputErrorActive;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorActiveClass);
    errorElement.textContent = errorMessage;
    console.log(errorElement);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorActiveClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else this._hideError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._disableButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._disableButtonClass);
    this._buttonElement.disabled = true;
  }

  enableValidation() {
    this._setEventListeners();
  }
  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
  enableSubmitButton() {
    this._buttonElement.classList.remove(this._disableButtonClass);
    this._buttonElement.disabled = false;
    }
}
    