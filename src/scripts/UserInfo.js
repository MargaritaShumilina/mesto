export default class UserInfo {
    constructor({name, status}) {
        this.name = name;
        this.status = status;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {name: this.name, status: this.status};
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo() {
        this.name = document.querySelector('.popup__input_type_name').textContent;
        this.status = document.querySelector('.popup__input_type_status').textContent;
    }

}