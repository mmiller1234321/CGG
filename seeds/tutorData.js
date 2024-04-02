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
   
  },
  {
    name: "Chrissy Snow",
    email: "chrissy@example.com",
    jobTitle: "Frontend Engineer",
    Skills: [5, 6],
  
  },
  {
    name: "Larry Dallas",
    email: "larry@example.com",
    jobTitle: "Frontend Developer",
    Skills: [1, 3],
  
  },
  {
    name: "Terri Alden",
    email: "terri@example.com",
    jobTitle: "Web Developer",
    Skills: [2, 4],
  },
  {
    name: "Mr. Furley",
    email: "furley@example.com",
    jobTitle: "Frontend Developer",
    Skills: [5, 6],

  },
  {
    name: "Mrs. Roper",
    email: "mrsroper@example.com",
    jobTitle: "UI/UX Developer",
    Skills: [6, 7],

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
