const mongoActivityDB = require('../../config/mongoActivity');

const Activity = mongoActivityDB.model('activities', require('../../schemas/Activity/activity'));


const fetchActivitiesBySite = (req, res) => {

  let {acronym} = req.body;
  Activity.find({site: acronym}).then(data => {
    // if (data.length) === activity found
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "Les activité ont bien été récolté",
        data: data
      })
    } else {
      res.status(403).json({
        error: true,
        message: "Aucune activité n'a été trouvé.",
        data: null
      });
    }
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