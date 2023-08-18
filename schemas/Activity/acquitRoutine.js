const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acquitRoutineSchema = new Schema({
  activityId: String,
  comments: String,
  personne: Array,
  dateCreated: Date,
  creator: String,
});


module.exports = acquitRoutineSchema;