const router = require('express').Router();
const { Skill, Tutor } = require('../../models');

// The `/api/skill` endpoint

router.get('/', async (req, res) => {

  console.log("APD /api/skill");

    // find all skills
    try {
      req.session.logged = true;
      
      const data = await Skill.findAll({
        include: [{ all: true, nested: true }],
      });
      
      const skills = data.map((item) => item.get({plain: true}))

      console.log({skills});

      res.render('manage_skills', {skills});
    } catch (err) {

      console.log("APD" + err);

      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // find one Skill by its `id` value
    try {
      const readerData = await Skill.findByPk(req.params.id);
  
      if (!readerData) {
        res.status(404).json({ message: 'No skill found with that id!' });
        return;
      }
  
      res.status(200).json(readerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    // create a new Skill
    try {
      const readerData = await Skill.create(req.body);
      res.status(200).json(readerData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
    // update a Skill by its `id` value
    Skill.update(
      {
        name: req.body.name,
        color: req.body.color
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedSkill) => {
        // Sends the updated book as a json response
        res.json(updatedSkill);
      })
      .catch((err) => res.json(err));
  });

  router.delete('/:id', async (req, res) => {
    // delete a Tutor by its `id` value
    try {
      const readerData = await Skill.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!readerData) {
        res.status(404).json({ message: 'No Skill found with that id!' });
        return;
      }
  
      res.status(200).json(readerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;