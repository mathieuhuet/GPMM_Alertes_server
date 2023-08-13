const mongoActivityDB = require('../../config/mongoActivity');

const acquitGeneral = mongoActivityDB.model('acquitGeneral', require('../../schemas/Activity/acquitGeneral'));
const acquitRoutine = mongoActivityDB.model('acquitRoutine', require('../../schemas/Activity/acquitRoutine'));
const acquitIntervention = mongoActivityDB.model('acquitIntervention', require('../../schemas/Activity/acquitIntervention'));


const fetchAcquit = (req, res) => {
  let {activityType, activityId} = req.body;
  if (activityType === 'intervention') {
    acquitIntervention.find({activityId}).then(data => {
      // if (data.length) === activity found
      if (data.length) {
        res.status(200).json({
          error: false,
          message: "L'acquitement ont bien été récolté",
          data: data
        })
      } else {
        res.status(403).json({
          error: true,
          message: "Aucune acquitement n'a été trouvé.",
          data: null
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produit lors de la recherche d'acquitement,\n réessayer.",
        data: null
      })
    })
  } else if (activityType === 'routine') {
    acquitRoutine.find({activityId}).then(data => {
      // if (data.length) === activity found
      if (data.length) {
        res.status(200).json({
          error: false,
          message: "L'acquitement ont bien été récolté",
          data: data
        })
      } else {
        res.status(403).json({
          error: true,
          message: "Aucune acquitement n'a été trouvé.",
          data: null
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produit lors de la recherche d'acquitement,\n réessayer.",
        data: null
      })
    })
  } else {
    acquitGeneral.find({activityId}).then(data => {
      // if (data.length) === activity found
      if (data.length) {
        res.status(200).json({
          error: false,
          message: "L'acquitement ont bien été récolté",
          data: data
        })
      } else {
        res.status(403).json({
          error: true,
          message: "Aucune acquitement n'a été trouvé.",
          data: null
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produit lors de la recherche d'acquitement,\n réessayer.",
        data: null
      })
    })
  }
};

module.exports = fetchAcquit;