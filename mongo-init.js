db.createUser(
    {
        user: "admin",
        pwd: "mauFJcuf5dhRMQrjjsc",
        roles: [
            {
                role: "readWrite",
                db: "postDb"
            }
        ]
    }
);


db = db.getSiblingDB('postDb')
db.createCollection('users')
db.getCollection('users').insert({
    username: 'admin',
    password: '$2a$10$ivdgYOk0pMK3abEsdwAZ.uu/bKcgmPifX2Uwa0HurO/fZGMy2sgO6',
    givenName: 'admin',
    surName: 'as',
    age: 34,
    email: 'admin@gmail.com',
    address: '',
    photoURL: '',
    isAdmin: true,

  });