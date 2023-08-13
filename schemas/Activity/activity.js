const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: String,
  description: String,
  creator: String,
  dateCreated: Date,
  activityDate: Date,
  level: String,
  department: String,
  employee: String,
  site: String,
  system: String,
  activityType: String,
});


module.exports = activitySchema;