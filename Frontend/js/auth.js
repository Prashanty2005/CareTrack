// js/auth.js

const Auth = {
    getToken() {
        return localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token);
    },

    clearToken() {
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    getAuthHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    // A reusable fetch wrapper to automatically attach JWT and handle 401s
    async fetchWithAuth(url, options = {}) {
        const headers = { ...this.getAuthHeaders(), ...options.headers };
        
        const response = await fetch(url, { ...options, headers });
        
        if (response.status === 401) {
            this.clearToken();
            // Optional: redirect to login or show modal
            console.warn('Unauthorized. Token cleared.');
        }
        
        return response;
    }
};

window.Auth = Auth;
