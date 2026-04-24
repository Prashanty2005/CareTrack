document.addEventListener('DOMContentLoaded', () => {
    // If already authenticated, redirect to home
    if (Auth.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const registerForm = document.getElementById('registerForm');
    const errorMsg = document.getElementById('errorMsg');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const submitBtn = registerForm.querySelector('button');

        // Reset error message
        errorMsg.style.display = 'none';
        errorMsg.innerText = '';

        if (password !== confirmPassword) {
            errorMsg.innerText = 'Passwords do not match.';
            errorMsg.style.display = 'block';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = 'Creating account...';

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // After successful registration, we can either automatically log them in 
                // (requires backend to return a token on register) OR redirect to login page.
                // Our backend returns a success message, so let's redirect to login.
                alert('Account created successfully! Please log in.');
                window.location.href = 'login.html';
            } else {
                // Show error
                errorMsg.innerText = data.error || 'Registration failed.';
                errorMsg.style.display = 'block';
            }
        } catch (error) {
            console.error('Registration error:', error);
            errorMsg.innerText = 'An error occurred while connecting to the server.';
            errorMsg.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Sign Up';
        }
    });
});
