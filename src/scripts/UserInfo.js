export default class UserInfo {
    constructor({nameSelector, statusSelector}) {
        this.nameSelector = nameSelector;
        this.statusSelector = statusSelector;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._getContent(this.nameSelector),
            status: this._getContent(this.statusSelector)
        };
    }

    _getContent(selector) {
        const element = document.querySelector(selector);
        if (element) {
            return element.textContent;
        }
        return null;
    }

    _setContent(selector, value) {
        document.querySelector(selector).textContent = value
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, status) {
        this._setContent(this.nameSelector, name)
        this._setContent(this.statusSelector, status)

    }

}
