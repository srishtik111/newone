const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const participantRoutes = require('./routes/ParticipationRoutes');
const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve Static Files
app.use('/uploads', express.static('uploads'));



// ✅ Routes

// app.use('/participants', require('./routes/ParticipationRoutes.js'));

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/xyz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error connecting MongoDB", err));

// ✅ Routes
app.use('/', userRoutes);

app.use('/api/participants', require('./routes/ParticipationRoutes'));

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

