export default class UserInfo {
    constructor({nameInfo, statusInfo}) {
        this.nameInfo = nameInfo.textContent;
        this.statusInfo = statusInfo.textContent;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        console.log(this.nameInfo, this.statusInfo);
        return {name: this.nameInfo, status: this.statusInfo};
    }

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(nameI, statusI) {
        nameI.value = this.getUserInfo({name: this.nameInfo});
        statusI.value = this.getUserInfo({status: this.statusInfo});
    }

}