const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  profileIconColor: String,
  profileIconBackgroundColor: String,
  online: Boolean
});


module.exports = userSchema;