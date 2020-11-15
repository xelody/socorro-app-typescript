import mongoose from 'mongoose';

import '../services/v1/models/DiveEntry';
import '../services/v1/models/User';

const mongoDBUri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@development.6q1es.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const dbConnection = mongoose.connection;
dbConnection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error'),
);
dbConnection.once('open', function () {
  console.log('MongoDB connected!');
});
