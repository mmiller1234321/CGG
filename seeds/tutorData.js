const { Tutor, Skill } = require('../models');

const tutorData = [
  {
    name: "Jack Tripper",
    email: "jack@example.com",
    jobTitle: "Frontend Developer", 
    Skills: [1, 2], 
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
    jobTitle: "Frontend Developer", // Updated job title to match the model definition
    Skills: [1, 3], // Assuming the IDs of HTML and JavaScript skills are 1 and 3 respectively
  },
  {
    name: "Terri Alden",
    email: "terri@example.com",
    jobTitle: "Web Developer", // Updated job title to match the model definition
    Skills: [2, 4], // Assuming the IDs of CSS and React skills are 2 and 4 respectively
  },
  {
    name: "Furley",
    email: "furley@example.com",
    jobTitle: "Frontend Developer", // Updated job title to match the model definition
    Skills: [5, 6], // Assuming the IDs of Node.js and Python skills are 5 and 6 respectively
  },
  {
    name: "Carol Foster-Lambert",
    email: "carol@example.com",
    jobTitle: "UI/UX Developer", 
    Skills: [6, 7], 
  },
  // Add more tutors as needed
];

const seedTutors = () => {
  return Promise.all(
    tutorData.map(async (tutor) => {
      const newTutor = await Tutor.create(tutor);
      // Associate each tutor with skills
      for (const skillId of tutor.Skills) {
        const skill = await Skill.findByPk(skillId);
        if (skill) {
          await newTutor.addSkill(skill); // Corrected method name to addSkill
        }
      }
      return newTutor;
    })
  );
};

module.exports = seedTutors;