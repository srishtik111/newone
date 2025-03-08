const express = require('express');
const multer = require('multer');
const router = express.Router();
const Participant = require('../models/Participant');

// ✅ File Upload Configuration
const storage = multer.memoryStorage(); // Store file as Buffer in memory
const upload = multer({ storage: storage });


// ✅ Create Participant Route
router.post('/register', upload.single('resume'), async (req, res) => {
  try {

    const { name, gender, age, phone, degree, college, github, linkedin, skills } = req.body;
    const resume = req.file ? req.file.buffer : null;

    if (!name || !gender || !age || !phone || !degree || !college || !github || !linkedin || !skills || !resume) {
      return res.status(400).json({ message: '❌ Missing required fields' });
    }

    const skillsArray = Array.isArray(skills) ? skills : skills.split(',');

    const newParticipant = new Participant({
      name,
      gender,
      age,
      phone,
      degree,
      college,
      github,
      linkedin,
      skills: skillsArray,
      resume
    });

    await newParticipant.save();
    console.log("✅ Participant registered successfully!");
    res.status(201).json({ message: '✅ Registration Successful!' });

  } catch (error) {
    console.error('❌ Error registering participant:', error);
    res.status(500).json({ message: '❌ Registration Failed.', error: error.message });
  }
});


// ✅ Fetch all Participants with Resume
router.get('/all', async (req, res) => {
  try {
    const participants = await Participant.find();

    const participantsWithResumes = participants.map(participant => ({
      ...participant.toObject(),
      resume: participant.resume ? `data:application/pdf;base64,${participant.resume.toString('base64')}` : null,
    }));

    res.json(participantsWithResumes);
  } catch (error) {
    console.error('❌ Error fetching participants:', error);
    res.status(500).json({ message: '❌ Error fetching participants' });
  }
});


// ✅ Fetch Specific Participant by ID
router.get('/:id', async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);

    if (!participant) {
      return res.status(404).json({ message: '❌ Participant not found' });
    }

    const participantWithResume = {
      ...participant.toObject(),
      resume: participant.resume ? `data:application/pdf;base64,${participant.resume.toString('base64')}` : null,
    };

    res.json(participantWithResume);
  } catch (error) {
    console.error('❌ Error fetching participant:', error);
    res.status(500).json({ message: '❌ Error fetching participant' });
  }
});


module.exports = router;
