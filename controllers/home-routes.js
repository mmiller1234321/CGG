const router = require('express').Router();
const { Skill, Tutor, SkillTutors } = require('../models');

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
      skill.get({ plain: true }))
  

    res.render('homepage', { skills });
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// GET one skill
router.get('/skill/:id', async (req, res) => {
  try {
    const skilldata = await Skill.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Tutor,
      //     attributes: ['id', 'name', 'email', 'jobTitle'],
      //     through: { attributes: [] } // Exclude pivot table attributes
      //   }
      // ]
    });
    console.log(skilldata);
    const skill = skilldata.get({ plain: true }); // Ne



    if (!skill) {
      return res.status(404).render('error', { message: 'Skill not found' });
    }

    res.render('skill-details', { skill });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: JSON.stringify(err) });
  }
});

// GET one tutor
router.get('/tutor/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);

    if (!tutor) {
      return res.status(404).render('error', { message: 'Tutor not found' });
    }

    res.render('tutor', { tutor });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

module.exports = router;
