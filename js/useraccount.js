document.addEventListener("DOMContentLoaded", () => {
  fetch("../fieldtrips23/get_user.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((user) => {
      document.getElementById("userId").textContent = user.id;
      document.getElementById("userName").textContent = user.name;
      document.getElementById("userEmail").textContent = user.email;
      document.getElementById("userSince").textContent = user.created_at;

      // Update profile picture if available
      if (user.profile_picture && document.getElementById("profilePicturePreview")) {
        document.getElementById("profilePicturePreview").src =
          user.profile_picture + "?t=" + new Date().getTime(); // prevent caching
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

function editProfile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", function () {
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    fetch("edit_profile_picture.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.success && data.path) {
          const img = document.getElementById("profilePicturePreview");
          if (img) {
            img.src = data.path + "?t=" + new Date().getTime(); // force refresh
          }
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("An error occurred while uploading.");
      });
  });

  input.click();
}

function deleteAccount() {
  if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
    // Placeholder — you can wire this to a real PHP endpoint
    alert("Account deletion not yet implemented.");
  }
}
