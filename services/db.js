var mysql = require('mysql');

class db {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'users'
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject();
                }
                this.connection.config.queryFormat = function (query, values) {
                    if (!values) return query;
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                      if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                      }
                      return txt;
                    }.bind(this));
                  };                
                resolve();
            });
        })
    }

    close() {
        this.connection.end();
    }

    execute(q, params = {}) {
        return new Promise((resolve, reject) => {
            this.connection.query(q, params.binds || {}, (err, res, fields) => {
                if(err) {
                    reject(err);
                }
                resolve({
                    data: res,
                    fields
                });
            });

        });
    }
}

module.exports = db;