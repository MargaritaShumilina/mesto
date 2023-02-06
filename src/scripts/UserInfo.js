export default class UserInfo {
    constructor({nameSelector, statusSelector}) {
        // this.nameSelector = nameSelector;
        // this.statusSelector = statusSelector;
        this.nameSelector = document.querySelector(nameSelector).textContent;
        this.statusSelector = document.querySelector(statusSelector).textContent;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this.nameSelector,
            status: this.statusSelector
        };
    }

    // _setContent(selector, value) {
    //     document.querySelector(selector).textContent = value
    // }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, status) {
        // this._setContent(this.nameSelector, name)
        // this._setContent(this.statusSelector, status)
        console.log(1, this.nameSelector);
        console.log(2, name);
        this.nameSelector = name;
        console.log(3, this.nameSelector);
        this.statusSelector = status;
    }

}
