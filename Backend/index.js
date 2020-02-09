require('./src/models/Users');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

console.log(process.env.DB_USERNAME);

const authRoutes = require('./src/routes/authRoutes');
const packageRoutes = require('./src/routes/packageRoutes');
const requireAuth = require('./src/middlewares/requireAuth');

const app = express();

// passes request to bodyparser, then authRoutes.
app.use(bodyParser.json());
app.use(authRoutes);
app.use(packageRoutes);

const dbUsername = 'dbUser'; //process.env.dbUsername || 'admin';
const dbPassword = 'sbUserPassword'; // process.env.dbPassword || 'password';
// const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-ox29c.azure.mongodb.net/test?retryWrites=true&w=majority`;
const mongoUri = `mongodb://127.0.0.1:27017/myapp`;

console.log('trying to connect to Mongo');
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {

  console.error('Error Connecting to mongo', err);
});


app.get('/', requireAuth ,(req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(PORT, ()  => {
  console.log(`Listening on Port ${PORT}`);
});