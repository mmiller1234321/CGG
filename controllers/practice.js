router.get("/skills/:skillname", async (req, res) => {
    try {
        const tutorData = await Skill.findAll({
            where: {
                id: req.params.skillname
            },
            include:  [{
                model: Tutor, 
                through: TutorSkill
            }]
        })

        const tutors = tutorData.map((tutor)=> tutor.get({plain: true}))

        const tutorArray = tutors[0].tutors
        console.log(tutors[0].name)


    res.render('newPage', {
        tutorArray,
skillName: tutors[0].name
    })
    } catch (err) {
        res.status(500).json(err);
    }
   
})