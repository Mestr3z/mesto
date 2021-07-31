export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOverlayClose
    );
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());
  }
}
