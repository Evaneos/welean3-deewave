export class User {
    constructor(data) {
        this.data = data || {};
    }

    set(key, value) {
        this.data[key] = value;
    }

    get(key) {
        return this.data[key];
    }
}
