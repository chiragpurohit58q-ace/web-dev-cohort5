// 1. Listen for a click on your actual button ID "Submit"
document.getElementById('Submit').addEventListener('click', async () => {
    const msg = document.getElementById('message');
    
    // 2. Gather values using the exact IDs from your HTML
    const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value // Added role since your HTML has it
    };

    // 3. Simple client-side check so you don't send empty data
    if (!data.username || !data.email || !data.password) {
        msg.textContent = "Please fill in all fields.";
        msg.style.color = "red";
        return;
    }

    try {
        msg.textContent = "Registering...";
        msg.style.color = "orange";

        const response = await fetch('https://api.freeapi.app/api/v1/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // 4. Update the UI message based on server response
        if (response.ok) {
            msg.textContent = "Success! Account registered.";
            msg.style.color = "green";
        } else {
            // FreeAPI returns error details inside result.message
            msg.textContent = result.message || "Registration failed.";
            msg.style.color = "red";
        }
    } catch (error) {
        msg.textContent = "Error connecting to API.";
        msg.style.color = "red";
    }
});
