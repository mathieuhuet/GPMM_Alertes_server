const mongoActivityDB = require('../../config/mongoActivity');
const Activity = mongoActivityDB.model('activities', require('../../schemas/Activity/activity'));


const postActivity = (req, res) => {
  let {title, description, creator, dateCreated, activityDate, type, level, department, employee, site, system} = req.body;
  if ( title === "" || description === "") {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
    // Capitalize first
    title = title.charAt(0).toUpperCase() + title.slice(1);
    if (description) {
      description = description.charAt(0).toUpperCase() + description.slice(1);
    }
    const newActivity = new Activity({
      title,
      description,
      creator,
      dateCreated,
      activityDate,
      type,
      level,
      department,
      employee,
      site,
      system,
      acquit: false
    });
    newActivity.save().then(result => {
      res.status(201).json({
        error: false,
        message: 'Activité créé avec succès.',
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
  }
};

module.exports = postActivity
;