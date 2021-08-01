export default class UserInfo {
  constructor(userInfoSelectors) {
    this._profileName = document.querySelector(userInfoSelectors.name);
    this._profileDescription = document.querySelector(
      userInfoSelectors.description
    );
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return this._userData;
  }

  setUserInfo(profileNameInput, profileDescriptionInput) {
    this._profileName.textContent = profileNameInput.value;
    this._profileDescription.textContent = profileDescriptionInput.value;
  }
}
