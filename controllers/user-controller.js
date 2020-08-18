var db = require('../services/db.js');

class UserController {
    async getAll(req, res, next) {
        const database = new db();
        const q = 'SELECT * FROM users';
        await database.connect().catch(err => {
            console.log('caught', err.message);
            next(err.message);
        });
        await database.execute(q).then(response => {
            res.status(200).json(response.data);
        }).catch(err => {
            console.log('caught', err.message);
            next(err.message);
        }).finally(() => {
            database.close();
        });
    }
    async getById(req, res, next) {
        const database = new db();
        const q = 'SELECT * FROM USERS WHERE ID = :id';
        const params = {
            binds: {
                id: req.params.id
            }
        }
        await database.connect().catch(err => {
            console.log('caught', err.message);
            next(err.message);
        });
        await database.execute(q, params).then(response => {
            res.status(200).json(response.data);
        }).catch(err => {
            console.log('caught', err.message);
            next(err.message);
        }).finally(() => {
            database.close();
        });
    }
    async destroy(req, res, next) {
        const database = new db();
        const q = 'DELETE FROM USERS WHERE ID = :id';
        const params = {
            binds: {
                id: req.params.id
            }
        }
        await database.connect().catch(err => {
            console.log('caught', err.message);
            next(err.message);
        });
        await database.execute(q, params).then(response => {
            res.status(200).send('user deleted');
        }).catch(err => {
            console.log('caught', err.message);
            next(err.message);
        }).finally(() => {
            database.close();
        });
    }
    async create(req, res, next) {
        const database = new db();
        const q = `INSERT INTO
                    USERS (FIRSTNAME, LASTNAME, MIDDLENAME, USERNAME,
                        ADDRESS, PHONE_NUMBER, GENDER, IMG, STATUS, EMAIL, PASSWORD)
                    VALUES(:firstname, :lastname, :middlename, :username, :address,
                        :phone_number, :gender, :img, :status, :email, :password)
        `;        
        const params = {
            binds: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                middlename: req.body.middlename || '',
                address: req.body.address || '',
                phone_number: req.body.phone_number || '',
                gender: req.body.gender,
                img: req.body.img || '',
                status: req.body.status,
                email: req.body.email,
                password: req.body.password,
            }
        }
        await database.connect().catch(err => {
            console.log('caught', err.message);
            next(err.message);
        });
        await database.execute(q, params).then(response => {
            res.status(200).send('user created');
        }).catch(err => {
            console.log('caught', err.message);
            next(err.message);
        }).finally(() => {
            database.close();
        });
    }
    async update(req, res, next) {
        const database = new db();
        const q = `UPDATE USERS
                    SET FIRSTNAME = :firstname, 
                        LASTNAME = :lastname,
                        username = :username,
                        middlename = :middlename,
                        address = :address,
                        phone_number = :phone_number,
                        gender = :gender,
                        img = :img,
                        status = :status,
                        email = :email,
                        password = :password
                    WHERE ID = :id
        `;
        const params = {
            binds: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                middlename: req.body.middlename || '',
                address: req.body.address || '',
                phone_number: req.body.phone_number || '',
                gender: req.body.gender,
                img: req.body.img || '',
                status: req.body.status,
                email: req.body.email,
                password: req.body.password,
                id: req.params.id
            }
        }
        await database.connect().catch(err => {
            console.log('caught', err.message);
            next(err.message);
        });
        await database.execute(q, params).then(response => {
            res.status(200).send('user updated');
        }).catch(err => {
            console.log('caught', err.message);
            next(err.message);
        }).finally(() => {
            database.close();
        });
    }    
}

module.exports = UserController;