const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      cors = require('cors');

const app = express();

// Database
mongoose.connect('mongodb://localhost/pizza-api');

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function() {
  console.log('Connected to pizza-api database.');
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/users', require('./routes/users'));

// app.use(function(req, res, next) {
//   User.findById(req.get('Authorization'), function(err, user) {
//     // If user doesn't exist, respond with Unauthorized
//     if (err || user === null) {
//       res.send(401, 'You\'re not authorized');
//       return;
//     }
//
//     // Else add user to req.user and go to next route
//     req.user = user;
//     next();
//   });
// });

// Routes
app.use('/menus', require('./routes/menus'));

// Run application
app.listen(3001, function() {
  console.log('Pizza-api is running!');
});
