document.addEventListener('DOMContentLoaded', () => {
    // If already authenticated, redirect to home
    if (Auth.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = loginForm.querySelector('button');

        // Reset error message
        errorMsg.style.display = 'none';
        errorMsg.innerText = '';
        submitBtn.disabled = true;
        submitBtn.innerText = 'Logging in...';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and redirect
                Auth.setToken(data.token);
                window.location.href = 'index.html';
            } else {
                // Show error
                errorMsg.innerText = data.error || 'Login failed. Please check your credentials.';
                errorMsg.style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMsg.innerText = 'An error occurred while connecting to the server.';
            errorMsg.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Log In';
        }
    });
});
