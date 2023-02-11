export default class Section {
    constructor({renderer}, selector) {
        // this._initialArray = items;
        this._container = document.querySelector(selector);
        this._renderer = renderer;
    }

    //метод вывода картинок с сервера
    renderItems(data) {
        console.log(data);
        data.forEach(item =>
            this._renderer(item));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}