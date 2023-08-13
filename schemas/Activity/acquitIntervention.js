const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acquitInterventionSchema = new Schema({
  activityId: String,
  context: String,
  personne: Array,
  equipment: String,
  description: String,
  result: String,
  observation: String,
  dateCreated: Date,
  creator: String,
});


module.exports = acquitInterventionSchema;