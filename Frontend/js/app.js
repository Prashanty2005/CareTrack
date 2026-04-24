const API_URL = `${import.meta.env.VITE_API_BASE_URL}/medicines`;

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('medicineList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');

    let debounceTimer;

    // Initialize Auth UI
    const authContainer = document.getElementById('authContainer');
    if (authContainer) {
        if (Auth.isAuthenticated()) {
            let isAdmin = false;
            try {
                const token = Auth.getToken();
                const payload = JSON.parse(atob(token.split('.')[1]));
                isAdmin = payload.role === 'admin';
            } catch (e) {}

            authContainer.innerHTML = `
                ${isAdmin ? '<a href="admin.html" class="info-btn" style="background: var(--surface-light); color: var(--accent); border: 1px solid var(--accent); text-decoration: none;">Admin Panel</a>' : ''}
                <a href="#" id="watchlistLink" class="info-btn" style="background: var(--surface-light); color: var(--text-primary); border: 1px solid var(--border-color); text-decoration: none;">My Watchlist</a>
                <button id="logoutBtn" class="info-btn" style="background: #ef4444;">Log Out</button>
            `;
            
            document.getElementById('logoutBtn').addEventListener('click', () => {
                Auth.clearToken();
                window.location.reload();
            });

            document.getElementById('watchlistLink').addEventListener('click', async (e) => {
                e.preventDefault();
                listContainer.innerHTML = '<div class="loading">Loading your watchlist...</div>';
                try {
                    const res = await Auth.fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/watchlist`);
                    if (!res.ok) throw new Error('Failed to fetch watchlist');
                    const data = await res.json();
                    renderMedicines(data);
                } catch (err) {
                    console.error('Error fetching watchlist:', err);
                    listContainer.innerHTML = '<div class="no-results">Failed to load watchlist.</div>';
                }
            });
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="info-btn" style="background: var(--surface-light); color: var(--text-primary); border: 1px solid var(--border-color); text-decoration: none;">Log In</a>
                <a href="register.html" class="info-btn" style="text-decoration: none;">Sign Up</a>
            `;
        }
    }

    const fetchMedicines = async () => {
        listContainer.innerHTML = '<div class="loading">Loading medicines...</div>';
        try {
            const query = new URLSearchParams();
            if (searchInput.value.trim()) query.append('search', searchInput.value.trim());
            if (sortSelect.value) query.append('sort', sortSelect.value);

            const res = await fetch(`${API_URL}?${query.toString()}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            
            renderMedicines(data);
        } catch (err) {
            console.error('Error fetching medicines:', err);
            listContainer.innerHTML = '<div class="no-results">Failed to load data. Please ensure backend is running.</div>';
        }
    };

    const renderMedicines = (medicines) => {
        if (!medicines || medicines.length === 0) {
            listContainer.innerHTML = '<div class="no-results">No medicines found matching your criteria.</div>';
            return;
        }

        listContainer.innerHTML = '';
        medicines.forEach(med => {
            const card = document.createElement('div');
            card.className = 'glass-panel med-card';
            
            const savings = ((med.mrp - med.regulated_price) / med.mrp * 100).toFixed(0);

            card.innerHTML = `
                <div>
                    <div class="med-header">
                        <h2 class="med-title">${med.name}</h2>
                        <div class="med-company">${med.company_name}</div>
                        <div class="med-generic">${med.generic_name}</div>
                    </div>
                    <div class="med-pricing">
                        <div class="price-item mrp">
                            <span class="price-label">Printed MRP</span>
                            <span class="price-value">₹${med.mrp}</span>
                        </div>
                        <div class="price-item regulated">
                            <span class="price-label">Regulated Price</span>
                            <span class="price-value">₹${med.regulated_price}</span>
                        </div>
                    </div>
                </div>
                <div class="med-footer">
                    <div class="rank-badge">
                        ★ ${med.rank_score} 
                    </div>
                    <a href="details.html?id=${med.id}" class="info-btn">View Details</a>
                </div>
            `;
            listContainer.appendChild(card);
        });
    };

    // Initial fetch
    fetchMedicines();

    // Event listeners
    searchBtn.addEventListener('click', fetchMedicines);
    
    // Intercept "View Details" clicks
    listContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.classList.contains('info-btn') && e.target.innerText === 'View Details') {
            if (!Auth.isAuthenticated()) {
                e.preventDefault();
                alert('Please log in to view medicine details and prices.');
                window.location.href = 'login.html';
            }
        }
    });
    
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fetchMedicines, 500);
    });

    sortSelect.addEventListener('change', fetchMedicines);
});
