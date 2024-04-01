const { Tutor, Skill } = require('../models');

const tutorData = [
  {
    name: "Jack Tripper",
    email: "jack@example.com",
    jobTitle: "Frontend Developer",
    Skills: [1, 2],
    picture: "jack.jpg" // Assuming the picture filename for Jack Tripper is jack.jpg
  },
  {
    name: "Janet Wood",
    email: "janet@example.com",
    jobTitle: "UI/UX Designer",
    Skills: [3, 4],
    picture: "janet.jpg" // Assuming the picture filename for Janet Wood is janet.jpg
  },
  {
    name: "Chrissy Snow",
    email: "chrissy@example.com",
    jobTitle: "Frontend Engineer",
    Skills: [5, 6],
    picture: "chrissy.jpg" // Assuming the picture filename for Chrissy Snow is chrissy.jpg
  },
  {
    name: "Larry Dallas",
    email: "larry@example.com",
    jobTitle: "Frontend Developer",
    Skills: [1, 3],
    picture: "larry.jpg" // Assuming the picture filename for Larry Dallas is larry.jpg
  },
  {
    name: "Terri Alden",
    email: "terri@example.com",
    jobTitle: "Web Developer",
    Skills: [2, 4],
    picture: "terri.jpg" // Assuming the picture filename for Terri Alden is terri.jpg
  },
  {
    name: "Mr. Furley",
    email: "furley@example.com",
    jobTitle: "Frontend Developer",
    Skills: [5, 6],
    picture: "furley.jpg" // Assuming the picture filename for Mr. Furley is furley.jpg
  },
  {
    name: "Mrs. Roper",
    email: "mrsroper@example.com",
    jobTitle: "UI/UX Developer",
    Skills: [6, 7],
    picture: "roper.jpg" // Assuming the picture filename for Carol Foster-Lambert is carol.jpg
  },
  // Add more tutors as needed
];

const seedTutors = () => {
  return Promise.all(
    tutorData.map(async (tutor) => {
      try {
        const newTutor = await Tutor.create(tutor);

        // Associate each tutor with skills
        for (const skillId of tutor.Skills) {
          const skill = await Skill.findByPk(skillId);
          if (skill) {
            await newTutor.addSkill(skill); // Corrected method name to addSkill
          }
        }
        
        return newTutor;
      } catch (error) {
        console.error("Error seeding tutor:", error);
      }
    })
  );
};

module.exports = seedTutors;
