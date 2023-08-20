const mongoActivityDB = require('../../config/mongoActivity');
const InterventionAcquit = mongoActivityDB.model('acquitIntervention', require('../../schemas/Activity/acquitIntervention'));
const Activity = mongoActivityDB.model('activities', require('../../schemas/Activity/activity'));

const postInterventionAcquit = (req, res) => {
  let {activityId, context, personne, equipment, description, result, observation, dateCreated, creator} = req.body;
  if ( result === "" ) {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
    Activity.updateOne({_id: activityId}, {
      acquit: true
    }).then(() => {
      const newAcquit = new InterventionAcquit({
        activityId,
        context,
        personne,
        equipment,
        description,
        result,
        observation,
        dateCreated,
        creator
      });
      newAcquit.save().then(result => {
        res.status(201).json({
          error: false,
          message: 'Activité acquitté avec succès.',
          data: result
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Une erreure s'est produite dans la base de donnée.",
          data: null
        });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Erreur interne, réessayer.",
        data: null
      })
    })
  }
};

module.exports = postInterventionAcquit
;