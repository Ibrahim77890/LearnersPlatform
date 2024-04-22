const mongoose = require("mongoose");

const connectDb = async() => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "DataBase connected",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit();
    }
}

module.exports = connectDb