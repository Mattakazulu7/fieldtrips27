function editProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', function () {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        fetch('edit_profile_picture.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    // Optional: update UI with new image
                    const img = document.getElementById('profilePicturePreview');
                    if (img) {
                        img.src = data.path + '?t=' + new Date().getTime(); // prevent caching
                    }
                }
            })
            .catch(err => {
                console.error('Upload error:', err);
                alert('An error occurred while uploading.');
            });
    });

    input.click();
}
