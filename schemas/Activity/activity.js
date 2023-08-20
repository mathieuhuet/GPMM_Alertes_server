const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: String,
  description: String,
  creator: String,
  dateCreated: Date,
  activityDate: Date,
  type: String,
  level: String,
  department: String,
  employee: Array,
  site: String,
  system: String,
  activityType: String,
  acquit: Boolean,
});


module.exports = activitySchema;