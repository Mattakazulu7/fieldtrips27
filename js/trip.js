// trip.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the last id when the page is loaded
    console.log("Fetching last ID...");  // Debugging

    fetch('php/getlastid.php')
        .then(response => response.text())  // Get raw text instead of JSON for debugging
        .then(data => {
            console.log("Raw response from the server:", data);  // Log the raw response
            
            // Try to parse the response as JSON
            try {
                const jsonData = JSON.parse(data);  // Try parsing the data as JSON
                if (jsonData.last_id) {
                    let newUrl = `https://freetoursamsterdam.nl/fieldtrips/profile?id=${jsonData.last_id}`;
                    console.log("Setting href to: ", newUrl);

                    const tripLink = document.getElementById('trip');
                    if (tripLink) {
                        tripLink.setAttribute('href', newUrl);
                        console.log("Updated href to: ", tripLink.href);
                    } else {
                        console.error('Element with id "trip" not found.');
                    }
                } else {
                    console.error('Error fetching the last id:', jsonData.error);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
