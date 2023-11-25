document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();


    function fetchAndRenderEvents() {
        fetch('event/api/events', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('User deletion failed');
        })
        .then(data => {
            // Clear all existing events from the calendar
            calendar.removeAllEvents();

            // Add new events to the calendar
            data.forEach(event => {
                calendar.addEvent({
                    title: event.name,
                    start: `${event.eventDate}T${event.startTime}:00`,
                    end: `${event.eventDate}T${event.endTime}:00`
                });
            });
        })
        .catch(err => {
            console.error('Error fetching events:', err);

            // Handle user deletion failure
            if (err.message === 'User deletion failed') {
                alert('Failed to delete user. Please try again.');
            }
        });
    }

    // Fetch and render events when the page is loaded
    fetchAndRenderEvents();


    // Add an event listener to update the calendar when a user is deleted
    document.addEventListener('userDeleted', fetchAndRenderEvents);
});
