export default class User {
    constructor({
        document,
        names,
        email,
        phone
    }) {
        this.document = document;
        this.names = names;
        this.email = email;
        this.phone = phone;
    }
}