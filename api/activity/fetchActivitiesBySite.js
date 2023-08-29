const mongoActivityDB = require('../../config/mongoActivity');
const Intervention = mongoActivityDB.model('intervention', require('../../schemas/Activity/intervention'));
const Routine = mongoActivityDB.model('routine', require('../../schemas/Activity/routine'));
const General = mongoActivityDB.model('general', require('../../schemas/Activity/general'));


const fetchActivitiesBySite = (req, res) => {

  let {acronym} = req.body;

  const activities = [];
  Intervention.find({site: acronym}).then(data => {
    Array.prototype.push.apply(activities,data); 
    Routine.find({site: acronym}).then(data => {
      Array.prototype.push.apply(activities,data); 
      General.find({site: acronym}).then(data => {
        Array.prototype.push.apply(activities,data); 
        res.status(200).json({
          error: false,
          message: "Les activitées ont bien été récolté",
          data: activities
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Une erreur s'est produit lors de la recherche d'activité,\n réessayer.",
          data: null
        })
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produit lors de la recherche d'activité,\n réessayer.",
        data: null
      })
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produit lors de la recherche d'activité,\n réessayer.",
      data: null
    })
  })
};

module.exports = fetchActivitiesBySite;