export default class UserInfo {
    constructor({nameElement, statusElement, avatarElement}) {
        this.nameElement = document.querySelector(nameElement);
        this.statusElement = document.querySelector(statusElement);
        this.avatarElement = document.querySelector(avatarElement);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.statusElement.textContent,
            avatar: this.avatarElement.src
        };
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, about, avatar) {
        this.nameElement.textContent = name;
        this.statusElement.textContent = about;
        this.avatarElement.src = avatar;
    }

}
