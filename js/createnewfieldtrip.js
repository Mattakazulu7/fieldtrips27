//createnewfieldtrip.js
window.onload = function() {
    // Get the current directory path (e.g., "/fieldtrips22")
    const currentPath = window.location.pathname;

    // Build the base URL for the profile, assuming the page is in a subdirectory like "/fieldtrips22"
    const basePath = currentPath.split('/')[1];  // Extracts "fieldtrips22" part from "/fieldtrips22/"

    // Construct the URL for the profile link
    const profileLink = `/${basePath}/profile`;

    fetch("/fieldtrips/php/firstemptyid.php")  // Updated endpoint
    .then(response => response.text())
    .then(data => {
        console.log("Response Data: ", data);
        try {
            const jsonData = JSON.parse(data);
            console.log("Parsed JSON: ", jsonData);

            const totalTripsElement = document.getElementById('total-trips');
            if (totalTripsElement) {
                if (jsonData && jsonData.first_empty_id !== undefined) {
                    totalTripsElement.innerText = `Next Available Trip ID: ${jsonData.first_empty_id}`;

                    const incrementedId = Number(jsonData.first_empty_id);
                    const tripLink = document.getElementById('trip');
                    if (tripLink) {
                        tripLink.href = `${profileLink}?id=${incrementedId}`; // Dynamically created URL
                    }
                } else {
                    totalTripsElement.innerText = "No available trip ID found";
                }
            } else {
                console.error("Element with ID 'total-trips' not found.");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            const totalTripsElement = document.getElementById('total-trips');
            if (totalTripsElement) {
                totalTripsElement.innerText = "Error: Invalid response from server";
            }
        }
    })
    .catch(error => {
        console.error("Error fetching first empty trip ID:", error);
        const totalTripsElement = document.getElementById('total-trips');
        if (totalTripsElement) {
            totalTripsElement.innerText = "Error loading trip ID";
        }
    });
};
