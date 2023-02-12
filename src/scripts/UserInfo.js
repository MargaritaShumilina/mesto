export default class UserInfo {
    constructor({nameElement, statusElement, avatarElement}) {
        this.nameElement = document.querySelector(nameElement);
        this.statusElement = document.querySelector(statusElement);
        this.avatarElement = document.querySelector(avatarElement);
        this.id = null;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.statusElement.textContent,
            avatar: this.avatarElement.src
        };
    }

    setAvatar(avatar) {
        this.avatarElement.src = avatar;
        return this.avatarElement.src;
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, about, avatar, id) {
        this.nameElement.textContent = name;
        this.statusElement.textContent = about;
        this.avatarElement.src = avatar;
        this.id = id;
    }

    getUserId() {
        return this.id
    }

}
