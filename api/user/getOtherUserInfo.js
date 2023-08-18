const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const getOtherUserInfo = (req, res) => {
  let {userId} = req.body;
  User.find({_id: userId}).then(data => {
    // if (data.length) === activity found
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "L'usagé ont bien été récolté",
        data: data[0]
      })
    } else {
      res.status(403).json({
        error: true,
        message: "Aucune usagé n'a été trouvé.",
        data: null
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produit lors de la recherche d'usagé,\n réessayer.",
      data: null
    })
  })
};

module.exports = getOtherUserInfo;