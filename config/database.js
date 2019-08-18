// config/database.js
module.exports = {

    'url' : `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0-jwqok.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'dbName': process.env.DB_NAME
};

// mongodb+srv://dummytest:<password>@cluster0-jwqok.mongodb.net/test?retryWrites=true&w=majority
