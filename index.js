 const facilityButtons = document.querySelectorAll(
        '.facility-card .button'
    );

    const facilitySelect = document.getElementById('facility');
    facilityButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const facilityCard = button.closest('.facility-card');
            const facilityName = facilityCard.querySelector('h3').textContent;
            const options = Array.from(facilitySelect.options);
            const matchingOption = options.find(option =>
                option.textContent.trim() === facilityName.trim()
            );
            if (matchingOption) {
                facilitySelect.value = matchingOption.value;
            }
        });
    });

    const bookingForm = document.querySelector('.booking-box form');
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const booking = {
            name: document.getElementById('student-name').value,
            studentId: document.getElementById('student-id').value,
            email: document.getElementById('email').value,
            facility: facilitySelect.options[facilitySelect.selectedIndex].text,
            date: document.getElementById('booking-date').value,
            time: document.getElementById('time-slot').selectedOptions[0].text,
            additionalInfo: document.getElementById('additional-info').value,
            bookingDate: new Date().toLocaleString()
        };

        let clients = JSON.parse(localStorage.getItem('campusfitClients')) || [];
        clients.push(booking);
        localStorage.setItem('campusfitClients', JSON.stringify(clients));
        alert('Booking Request Saved Successfully!');
        bookingForm.reset();
        displayClients();
    });

    function displayClients() {
        const clientList = document.getElementById('client-list');
        const clients = JSON.parse(localStorage.getItem('campusfitClients')) || [];
        if (clients.length === 0) {
            clientList.innerHTML = `
            <div class="information-card">
                <h3>No Clients Found</h3>
                <p>Currently, there are no saved booking requests.</p>
            </div>
        `;
            return;
        }

        clientList.innerHTML = clients.map((client, index) => `
        <div class="facility-card" style="margin-bottom: 20px;">
            <h3>Client ${index + 1}: ${escapeHTML(client.name)}</h3>
            <p><strong>Student ID:</strong> ${escapeHTML(client.studentId)}</p>
            <p><strong>Email:</strong> ${escapeHTML(client.email)}</p>
            <p><strong>Facility:</strong> ${escapeHTML(client.facility)}</p>
            <p><strong>Booking Date:</strong> ${escapeHTML(client.date)}</p>
            <p><strong>Time Slot:</strong> ${escapeHTML(client.time)}</p>
            <p><strong>Additional Information:</strong> ${escapeHTML(client.additionalInfo || 'N/A')}</p>
            <p><strong>Request Submitted:</strong> ${escapeHTML(client.bookingDate)}</p>
            <button class="button" onclick="deleteClient(${index})">
                Delete Client
            </button>

        </div>
    `).join('');
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char]);
    }


    function deleteClient(index) {
        let clients = JSON.parse(localStorage.getItem('campusfitClients')) || [];
        clients.splice(index, 1);
        localStorage.setItem('campusfitClients', JSON.stringify(clients));
        displayClients();
    }
    displayClients();
