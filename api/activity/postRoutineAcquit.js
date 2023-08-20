const mongoActivityDB = require('../../config/mongoActivity');
const RoutineAcquit = mongoActivityDB.model('acquitRoutine', require('../../schemas/Activity/acquitRoutine'));
const Activity = mongoActivityDB.model('activities', require('../../schemas/Activity/activity'));

const postRoutineAcquit = (req, res) => {
  let {activityId, comments, personne, dateCreated, creator} = req.body;
  if ( comments === "" ) {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
    Activity.updateOne({_id: activityId}, {
      acquit: true
    }).then(() => {
      // Capitalize first
      comments = comments.charAt(0).toUpperCase() + comments.slice(1);
      const newAcquit = new RoutineAcquit({
        activityId,
        comments,
        personne,
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

module.exports = postRoutineAcquit
;