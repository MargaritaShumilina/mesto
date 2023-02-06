export default class UserInfo {
    constructor({nameSelector, statusSelector}) {
        this.nameSelector = document.querySelector(nameSelector);
        this.statusSelector = document.querySelector(statusSelector);
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this.nameSelector.textContent,
            status: this.statusSelector.textContent
        };
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, status) {
        this.nameSelector.textContent = name;
        this.statusSelector.textContent = status;
    }

}
