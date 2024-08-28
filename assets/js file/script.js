document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');
    const addSessionBtn = document.getElementById('add-session');
    const saveScheduleBtn = document.getElementById('save-schedule');
    const scheduleContainer = document.getElementById('schedule');

    // Set the current date
    const today = new Date();
    dateElement.innerText = today.toDateString();

    // Add a new session
    addSessionBtn.addEventListener('click', function() {
        const sessionDiv = document.createElement('div');
        sessionDiv.classList.add('session');
        sessionDiv.innerHTML = `
            <input type="text" placeholder="Enter time">
            <input type="text" placeholder="Enter your task...">
        `;
        scheduleContainer.appendChild(sessionDiv);
    });

    // Save the schedule
    saveScheduleBtn.addEventListener('click', function() {
        const sessions = document.querySelectorAll('.session input');
        const priorityList = document.getElementById('priority-list').value;
        const notes = document.getElementById('notes').value;
        const reminders = document.getElementById('reminders').value;

        const daySchedule = {
            date: today.toDateString(),
            sessions: [],
            priorityList: priorityList,
            notes: notes,
            reminders: reminders
        };

        sessions.forEach((input, index) => {
            if (index % 2 === 0) {
                daySchedule.sessions.push({
                    time: input.value,
                    task: sessions[index + 1].value
                });
            }
        });

        // Send the data to the server (you'll need to set up a backend)
        fetch('/save-schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(daySchedule)
        }).then(response => response.json())
          .then(data => alert('Schedule saved!'))
          .catch(error => console.error('Error:', error));
    });
});
