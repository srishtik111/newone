const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/xyz', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;