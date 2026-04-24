const API_URL = `${import.meta.env.VITE_API_BASE_URL}/medicines`;

document.addEventListener('DOMContentLoaded', () => {
    // Immediate Route Guard
    if (!Auth.isAuthenticated()) {
        alert('Please log in to view medicine details and prices.');
        window.location.href = 'login.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        document.getElementById('loadingDetail').innerHTML = 'No medicine ID provided.';
        document.getElementById('similarList').innerHTML = '';
        return;
    }

    fetchMedicineDetail(id);
});

async function fetchMedicineDetail(id) {
    try {
        const res = await Auth.fetchWithAuth(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch detail');
        const med = await res.json();

        // Populate detail section
        document.getElementById('loadingDetail').style.display = 'none';
        document.getElementById('detailContent').style.display = 'block';

        document.getElementById('medName').innerText = med.name;
        document.getElementById('medCompany').innerText = med.company_name;
        document.getElementById('medGeneric').innerText = med.generic_name;
        document.getElementById('medDesc').innerText = med.description;
        document.getElementById('medMrp').innerText = `₹${med.mrp}`;
        document.getElementById('medRegPrice').innerText = `₹${med.regulated_price}`;

        const pillText = med.pills_per_day > 1 ? `${med.pills_per_day} pills a day` : `1 pill a day`;
        document.getElementById('medPills').innerText = pillText;

        document.getElementById('similarGenericLabel').innerText = med.generic_name;

        // Fetch similar medicines
        fetchSimilarMedicines(med.generic_name, med.id);

        // Render Where to Buy section
        renderPharmacies(med.pharmacies, med.regulated_price);

        // Setup Watchlist Button if authenticated
        setupWatchlistButton(med.id);
    } catch (err) {
        console.error(err);
        document.getElementById('loadingDetail').innerHTML = 'Medicine not found or server error.';
    }
}

let isSavedInWatchlist = false;

async function setupWatchlistButton(medicineId) {
    const saveBtn = document.getElementById('saveBtn');

    if (!Auth.isAuthenticated()) {
        saveBtn.style.display = 'block';
        saveBtn.innerText = 'Login to Save';
        saveBtn.disabled = true;
        return;
    }

    saveBtn.style.display = 'block';

    try {
        // Check if it's already in the watchlist
        const res = await Auth.fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/watchlist`);
        if (res.ok) {
            const watchlist = await res.json();
            isSavedInWatchlist = watchlist.some(item => item.id === parseInt(medicineId));
            updateSaveButtonUI();
        }
    } catch (err) {
        console.error('Error fetching watchlist:', err);
    }

    saveBtn.addEventListener('click', async () => {
        saveBtn.disabled = true;
        try {
            if (isSavedInWatchlist) {
                // Remove from watchlist
                const res = await Auth.fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/watchlist/${medicineId}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    isSavedInWatchlist = false;
                }
            } else {
                // Add to watchlist
                const res = await Auth.fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/watchlist`, {
                    method: 'POST',
                    body: JSON.stringify({ medicine_id: medicineId })
                });
                if (res.ok) {
                    isSavedInWatchlist = true;
                }
            }
            updateSaveButtonUI();
        } catch (err) {
            console.error('Error toggling watchlist:', err);
        }
        saveBtn.disabled = false;
    });
}

function updateSaveButtonUI() {
    const saveBtn = document.getElementById('saveBtn');
    if (isSavedInWatchlist) {
        saveBtn.innerText = 'Remove from Watchlist';
        saveBtn.style.backgroundColor = '#ef4444'; // Red-ish
    } else {
        saveBtn.innerText = 'Save to Watchlist';
        saveBtn.style.backgroundColor = 'var(--accent)';
    }
}

async function fetchSimilarMedicines(genericName, currentId) {
    const listContainer = document.getElementById('similarList');
    try {
        const res = await fetch(`${API_URL}/generic/${encodeURIComponent(genericName)}`);
        if (!res.ok) throw new Error('Failed to fetch similar');
        let meds = await res.json();

        // Filter out the current one
        meds = meds.filter(m => m.id !== parseInt(currentId));

        if (meds.length === 0) {
            listContainer.innerHTML = '<div class="no-results">No similar medicines found.</div>';
            return;
        }

        listContainer.innerHTML = '';
        meds.forEach(med => {
            const card = document.createElement('div');
            card.className = 'glass-panel med-card';

            card.innerHTML = `
                <div>
                    <div class="med-header">
                        <h3 class="med-title" style="font-size: 1.1rem;">${med.name}</h3>
                        <div class="med-company" style="font-size: 0.8rem;">${med.company_name}</div>
                    </div>
                    <div class="med-pricing" style="padding: 0.8rem; margin: 0.5rem 0;">
                        <div class="price-item regulated">
                            <span class="price-label">Price</span>
                            <span class="price-value" style="font-size: 1.1rem;">₹${med.regulated_price}</span>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 0.8rem;">
                    <a href="details.html?id=${med.id}" class="info-btn" style="width: 100%; text-align: center;">View Details</a>
                </div>
            `;
            listContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        listContainer.innerHTML = '<div class="no-results">Error loading similar medicines.</div>';
    }
}

function renderPharmacies(pharmacies, regulatedPrice) {
    const pharmacyList = document.getElementById('pharmacyList');

    if (!pharmacies || pharmacies.length === 0) {
        pharmacyList.innerHTML = '<div class="no-results" style="padding: 2rem;">No online purchase links currently available for this medicine.</div>';
        return;
    }

    pharmacyList.innerHTML = '';

    pharmacies.forEach(pharm => {
        const isCheaper = parseFloat(pharm.current_price) < parseFloat(regulatedPrice);
        const card = document.createElement('div');
        card.className = 'glass-panel';
        card.style.cssText = 'padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-radius: 12px; background: rgba(255, 255, 255, 0.02);';

        card.innerHTML = `
            <div>
                <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.3rem; color: #fff;">${pharm.pharmacy_name}</h4>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.2rem; font-weight: 700; color: ${isCheaper ? 'var(--success-color)' : '#fff'};">₹${pharm.current_price}</span>
                    ${isCheaper ? '<span style="background: rgba(16, 185, 129, 0.1); color: #34d399; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(16, 185, 129, 0.2);">Below Regulated Price!</span>' : ''}
                </div>
                ${!pharm.in_stock ? '<div style="color: #ef4444; font-size: 0.85rem; margin-top: 0.3rem;">Out of Stock</div>' : ''}
            </div>
            <div>
                <a href="${pharm.url}" target="_blank" rel="noopener noreferrer" class="admin-btn" style="text-decoration: none; display: inline-block; padding: 0.8rem 1.5rem; border-radius: 8px; ${!pharm.in_stock ? 'opacity: 0.5; pointer-events: none;' : ''}">
                    Buy Now
                </a>
            </div>
        `;
        pharmacyList.appendChild(card);
    });
}
