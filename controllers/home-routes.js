const router = require('express').Router();
const { User, Skill, Tutor, SkillTutors } = require('../models'); // added User 8:03 am 4.1//
const withAuth = require('../utils/auth');

// GET all skills for homepage
router.get('/', async (req, res) => {
  try {
    const skillsdata = await Skill.findAll({
      // include: [
      //   {
      //     attributes: ['id', 'name'],
      //     through: { attributes: [] } // Exclude pivot table attributes
      //   }
      // ] 
    });

    const skills = skillsdata.map((skill) =>
      skill.get({ plain: true }));

    res.render('homepage', { skills, logged:req.session.logged });
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// GET one skill
router.get('/skill/:id', withAuth, async (req, res) => {
  try {
    const skilldata = await Skill.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Tutor,
          through: SkillTutors,
          as: 'tutors',
          attributes: ['id', 'name', 'email', 'jobTitle', 'imageLink'],
          through: { attributes: [] } // Exclude pivot table attributes
        }
      ]
    });

    console.log(skilldata);

    if (!skilldata) {
      return res.status(404).render('error', { message: 'Skill not found' });
    }

    const skill = skilldata.get({ plain: true });
    res.render('skill-details', { skill, logged:req.session.logged });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: JSON.stringify(err) });
  }
});

// GET all tutors

router.get('/tutors', withAuth, async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      // attributes: { exclude: ['password'] }
    });

    const tutors = tutorData.map((tutor) =>
      tutor.get({ plain: true }));

    res.render('tutors', { tutors, logged:req.session.logged });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
})


// GET one tutor
router.get('/tutor/:id',withAuth, async (req, res) => {
  try {
    const tutorData = await Tutor.findByPk(req.params.id);

    if (!tutorData) {
      return res.status(404).render('error', { message: 'Tutor not found' });
    }
const tutor = tutorData.get({ plain: true });
    res.render('tutor', { tutor, logged:req.session.logged });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;