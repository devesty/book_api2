const mongoose = require('mongoose');

// const connectionString = 'your-mongodb-atlas-connection-string';
const connectionString = 'mongodb+srv://esther:AprilDeveloper1998@cluster0.7mgqjgc.mongodb.net/book-api2';


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});
