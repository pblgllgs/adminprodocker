const mongoose = require('mongoose');
const mongoDbConnection = async () =>{

    try {
        await mongoose.connect(process.env.DB_CONN, {});
        console.log('MongoDB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD, ver logs.')
    }
}

module.exports = {
    mongoDbConnection
}