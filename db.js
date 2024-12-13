const mongoose = require('mongoose');

// Establish the database connection
const connectdb=async()=>{
    try{
        const conn=await mongoose.connect('mongodb://127.0.0.1:27017/portfolio', )
    console.log( `mongodb connected :${conn.connection.host}`)


} catch (err){
    console.log(err);
    process.exit(1);
}
};

// Handle successful connection


// Export mongoose for use in other files
module.exports = connectdb;
