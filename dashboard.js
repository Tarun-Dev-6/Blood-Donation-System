// Check if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Fetch user data from Firestore
        firebase.firestore().collection("users").doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    document.getElementById("user-name").textContent = doc.data().fullName;
                    document.getElementById("user-blood-group").textContent = doc.data().bloodGroup;
                    document.getElementById("user-location").textContent = doc.data().location;
                } else {
                    console.log("No user data found!");
                }
            })
            .catch((error) => console.log("Error fetching user data:", error));

        // Fetch Blood Requests
        firebase.firestore().collection("bloodRequests").get().then((querySnapshot) => {
            let requestList = "";
            querySnapshot.forEach((doc) => {
                let request = doc.data();
                requestList += `<li>🏥 ${request.hospital} - 🩸 ${request.bloodType} [Request Now]</li>`;
            });
            document.getElementById("blood-requests").innerHTML = requestList || "<li>No requests found</li>";
        });

        // Fetch Blood Banks
        firebase.firestore().collection("bloodBanks").get().then((querySnapshot) => {
            let bankList = "";
            querySnapshot.forEach((doc) => {
                let bank = doc.data();
                bankList += `<li>🏥 ${bank.name} - 📍 ${bank.location}</li>`;
            });
            document.getElementById("blood-banks").innerHTML = bankList || "<li>No blood banks found</li>";
        });

        // Fetch Donation History
        firebase.firestore().collection("donations").where("donorId", "==", user.uid).get().then((querySnapshot) => {
            let historyList = "";
            querySnapshot.forEach((doc) => {
                let donation = doc.data();
                historyList += `<li>🏥 ${donation.hospital} - 🩸 ${donation.bloodType} - ✅ ${donation.status}</li>`;
            });
            document.getElementById("donation-history").innerHTML = historyList || "<li>No donation history</li>";
        });

    } else {
        // Redirect to login if user is not authenticated
        window.location.href = "login.html";
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html";
    }).catch((error) => console.log("Logout Error:", error));
});

// Check if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // Redirect to login if user is not authenticated
        alert("You need to log in first!");
        window.location.href = "login.html";
    }
});

