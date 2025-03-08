const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    phone: String,
    age: String,
    degree: String,
    college: String,
    github: String,
    linkedin: String,
    skills: [String],
    resume: String
});

module.exports = mongoose.model('Participant', ParticipantSchema);
