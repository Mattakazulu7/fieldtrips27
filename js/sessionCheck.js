// sessionCheck.js
document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userIdDiv = document.getElementById('user-id');
    const customNavLink = document.getElementById('customNavLink');
    const accountNavLink = document.getElementById('accountNavLink');

    fetch('check_session.php')
        .then(res => res.json())
        .then(data => {
            if (data.loggedIn) {
                if (signupBtn) signupBtn.style.display = 'none';
                if (loginBtn) loginBtn.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'block';
                if (userIdDiv) {
                    userIdDiv.innerText = `User ID: ${data.userId}`;
                    userIdDiv.style.display = 'block';
                }

                // Build profile link based on current path
                const currentPath = window.location.pathname;
                const basePath = currentPath.split('/')[1];  // Extract e.g. "fieldtrips22"
                const profileLink = `/${basePath}/profile`;

                // Fetch the first empty trip ID and build the "create a tour" link
                fetch("/fieldtrips/php/firstemptyid.php")
                    .then(response => response.text())
                    .then(rawData => {
                        try {
                            const jsonData = JSON.parse(rawData);
                            if (jsonData && jsonData.first_empty_id !== undefined) {
                                const incrementedId = Number(jsonData.first_empty_id);
                                if (customNavLink) {
                                    customNavLink.innerHTML = `<a href="${profileLink}?id=${incrementedId}" class="nav-link" id="custom">create a tour</a>`;
                                }
                            } else {
                                console.error("Invalid data format for trip ID");
                            }
                        } catch (e) {
                            console.error("Error parsing trip ID JSON:", e);
                        }
                    })
                    .catch(err => console.error("Failed to fetch first empty trip ID:", err));

                if (accountNavLink) {
                    accountNavLink.innerHTML = `<a href="useraccount.html" class="nav-link" id="accountBtn">
                        <i class="fas fa-user-circle"></i> My Account
                    </a>`;
                }

                // ✅ Fix: Apply mobile-specific left positioning after reload
                const navLinks = document.querySelectorAll('.nav-link');
               

            } else {
                if (signupBtn) signupBtn.style.display = 'inline-block';
                if (loginBtn) loginBtn.style.display = 'inline-block';
                if (logoutBtn) logoutBtn.style.display = 'none';
                if (userIdDiv) userIdDiv.style.display = 'none';
                if (customNavLink) customNavLink.innerHTML = '';
                if (accountNavLink) accountNavLink.innerHTML = '';
            }
        })
        .catch(err => {
            console.error('Session check failed:', err);
        });
});
