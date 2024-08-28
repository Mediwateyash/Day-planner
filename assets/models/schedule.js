const mongoose = require('mongoose');

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

module.exports = mongoose.model('Schedule', scheduleSchema);
