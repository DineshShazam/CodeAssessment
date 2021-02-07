const mongoose = require('mongoose');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
  })
  console.log(`MongoDB Connected: ${connection.connection.host}`);
}

module.exports = connectDB; 