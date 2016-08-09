const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' }
});

// Validations
UserSchema.path('name').required(true, 'Name is required.');
UserSchema.path('email').required(true, 'Email is required.');
UserSchema.path('username').required(true, 'Username is required.');

module.exports = mongoose.model('User', UserSchema);
