const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

const databaseConnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => {
      console.log(`Connected to DB: ${conn.connection.host}  `);
    })
    .catch((err) => console.log(err.message));
};

module.exports = databaseConnect;
