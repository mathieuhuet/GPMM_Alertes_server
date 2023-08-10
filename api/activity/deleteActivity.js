const mongoActivityDB = require('../../config/mongoActivity');
const Activity = mongoActivityDB.model('activities', require('../../schemas/Activity/activity'));


const deleteActivity = async (req, res) => {
  try {
    let _idActivity = req.body._id;
    if (!_idActivity) {
      res.status(400).json({
        error: true,
        message: "ID de l'activité manque à la requête"
      });
    } else {
      const result = await Activity.deleteOne({_id: _idActivity});
      res.status(200).json({
        error: false,
        message: "Activité a été supprimer avec succès",
        data: result.deletedCount
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produite durant la requête",
      data: null
    })
  }
};

module.exports = deleteActivity;