const router = require('express').Router();
const { Skill, Tutor } = require('../../models');

// The `/api/tutor` endpoint

router.get('/', async (req, res) => {
    // find all tutors
    try {
      req.session.logged = true;
      
      const data = await Tutor.findAll({
        include: [{ all: true, nested: true }],
      });
      
      const tutors = data.map((item) => item.get({ plain: true }));

      console.log({tutors});

      res.render('manage_tutors', {tutors});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    // find one tutor by its `id` value
    // be sure to include its associated Skills
    try {
      const readerData = await Tutor.findByPk(req.params.id);
  
      if (!readerData) {
        res.status(404).json({ message: 'No tutor found with that id!' });
        return;
      }
  
      res.status(200).json(readerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    // create a new Tutor
    try {
      const readerData = await Tutor.create(req.body);

      res.status(200);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    Tutor.update(
      {
        // All the fields you can update and the data attached to the request body.
        naTutor_nameme: req.body.Tutor_name,
        Tutor_email: req.body.Tutor_email,
        Tutor_jobtitle: req.body.Tutor_jobtitle,
      },
      {
        // Gets the books based on the isbn given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTutor) => {
        // Sends the updated book as a json response
        res.json(updatedTutor);
      })
      .catch((err) => res.json(err));
  });

  router.delete('/:id', async (req, res) => {
    // delete a Tutor by its `id` value
    try {
      const readerData = await Tutor.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!readerData) {
        res.status(404).json({ message: 'No tutor found with that id!' });
        return;
      }
  
      res.status(200).json(readerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;