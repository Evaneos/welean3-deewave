var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

class Store {
    init() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.mongodb, (err, db) => {
                if (err) {
                    return reject(err);
                }
                this.db = db;
                resolve(this);
            });
        });
    }

    collection(name) {
        return this.db.collection(name);
    }
}

module.exports = new Store();
