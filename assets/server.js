const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dayPlannerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define a schema for the schedule
const scheduleSchema = new mongoose.Schema({
    date: String,
    sessions: [{
        time: String,
        task: String
    }],
    priorityList: String,
    notes: String,
    reminders: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

// Save schedule to MongoDB
app.post('/save-schedule', (req, res) => {
    const scheduleData = new Schedule(req.body);

    scheduleData.save()
        .then(() => res.json({ message: 'Schedule saved!' }))
        .catch(err => res.status(400).json({ error: err }));
});

// Retrieve all schedules (optional, for admin panel)
app.get('/get-schedules', (req, res) => {
    Schedule.find({})
        .then(schedules => res.json(schedules))
        .catch(err => res.status(400).json({ error: err }));
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
