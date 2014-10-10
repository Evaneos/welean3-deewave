var store = require('../../Store');
var User = require('./User').User;

export class UserManager {
    insert(user) {
        return S.promiseCallback((done) => store.collection('user').save(user.data, done));
    }
    update(user) {
        return S.promiseCallback((done) => store.collection('user').save(user.data, done));
    }

    findOneById(id) {
        return S.promiseCallback((done) => store.collection('user').findOne({ _id: id }, done))
            .then((res) => res && new User(res));
    }
}

module.exports = new UserManager();
