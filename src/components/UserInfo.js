export default class UserInfo {
  constructor(userInfoSelectors, avatar) {
    this._profileName = document.querySelector(userInfoSelectors.name);
    this._profileAvatar = document.querySelector(userInfoSelectors.avatar);
    this._profileDescription = document.querySelector(
      userInfoSelectors.description
    );
  }
  setUserAvatar(data) {
    if (data.avatar) {
    this._profileAvatar.src = data.avatar;
    };
    }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return this._userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this.setUserAvatar(data);
  }
}
