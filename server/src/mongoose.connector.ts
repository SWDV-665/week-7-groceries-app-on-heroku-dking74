import mongoose from 'mongoose';

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = process.env.MONGODB_DATABASE;
const DOMAIN = process.env.MONGODB_DOMAIN;
if (!(USERNAME && PASSWORD && DATABASE && DOMAIN)) {
  console.error(
    'Mongoose parameters not set. Please setup environment for following variables:\n' +
    'MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE, and MONGODB_DOMAIN'
  );
  process.exit();
}

const mongooseURL = `mongodb+srv://${USERNAME}:${PASSWORD}@${DOMAIN}/${DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(mongooseURL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => {
  console.error('Unable to connect to mongoose database. Original Error: ' + error.toString());
  process.exit();
});
