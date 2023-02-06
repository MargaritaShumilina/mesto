export default class UserInfo {
    constructor({nameElement, statusElement}) {
        this.nameElement = document.querySelector(nameElement);
        this.statusElement = document.querySelector(statusElement);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            status: this.statusElement.textContent
        };
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, status) {
        this.nameElement.textContent = name;
        this.statusElement.textContent = status;
    }

}
