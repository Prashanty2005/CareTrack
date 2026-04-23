document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check Auth & Role
    const token = Auth.getToken();
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Decode JWT (hacky client-side decode to check role before fetching)
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role !== 'admin') {
            alert('Access Denied. You are not an admin.');
            window.location.href = 'index.html';
            return;
        }
    } catch (e) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Setup Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        Auth.clearToken();
        window.location.href = 'login.html';
    });

    // 3. Load Medicines
    await loadMedicines();

    // 4. Modal Setup
    document.getElementById('addMedicineBtn').addEventListener('click', () => {
        openModal();
    });

    document.getElementById('medicineForm').addEventListener('submit', handleFormSubmit);
});

let medicinesList = [];

async function loadMedicines() {
    const tbody = document.getElementById('medicineTableBody');
    try {
        const res = await fetch('http://localhost:5000/api/medicines');
        if (!res.ok) throw new Error('Failed to fetch');
        medicinesList = await res.json();
        renderTable();
    } catch (err) {
        console.error(err);
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load medicines.</td></tr>';
    }
}

function renderTable() {
    const tbody = document.getElementById('medicineTableBody');
    tbody.innerHTML = '';

    if (medicinesList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No medicines found.</td></tr>';
        return;
    }

    medicinesList.forEach(med => {
        const tr = document.createElement('tr');
        tr.id = `row-${med.id}`;
        tr.innerHTML = `
            <td>${med.id}</td>
            <td><strong>${med.name}</strong></td>
            <td>${med.generic_name}</td>
            <td>${med.company_name}</td>
            <td>₹${med.regulated_price}</td>
            <td class="action-btns">
                <button class="admin-btn" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick='editMedicine(${JSON.stringify(med).replace(/'/g, "\\'")})'>Edit</button>
                <button class="admin-btn danger" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="deleteMedicine(${med.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Logic
const modal = document.getElementById('medicineModal');
const form = document.getElementById('medicineForm');

function openModal(med = null) {
    document.getElementById('modalTitle').innerText = med ? 'Edit Medicine' : 'Add Medicine';
    
    if (med) {
        document.getElementById('medId').value = med.id;
        document.getElementById('medName').value = med.name;
        document.getElementById('medGeneric').value = med.generic_name;
        document.getElementById('medCompany').value = med.company_name;
        document.getElementById('medMrp').value = med.mrp;
        document.getElementById('medRegPrice').value = med.regulated_price;
        document.getElementById('medPills').value = med.pills_per_day;
        document.getElementById('medRank').value = med.rank_score;
        document.getElementById('medDesc').value = med.description;
    } else {
        form.reset();
        document.getElementById('medId').value = '';
    }

    modal.classList.add('active');
}

window.closeModal = function() {
    modal.classList.remove('active');
}

window.editMedicine = function(med) {
    openModal(med);
}

// Form Submit (Create or Update)
async function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('modalSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Saving...';

    const id = document.getElementById('medId').value;
    const isEdit = !!id;

    const payload = {
        name: document.getElementById('medName').value,
        generic_name: document.getElementById('medGeneric').value,
        company_name: document.getElementById('medCompany').value,
        mrp: parseFloat(document.getElementById('medMrp').value),
        regulated_price: parseFloat(document.getElementById('medRegPrice').value),
        pills_per_day: parseInt(document.getElementById('medPills').value),
        rank_score: parseFloat(document.getElementById('medRank').value),
        description: document.getElementById('medDesc').value
    };

    const url = isEdit ? `http://localhost:5000/api/admin/medicines/${id}` : 'http://localhost:5000/api/admin/medicines';
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const res = await Auth.fetchWithAuth(url, {
            method,
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            showToast(isEdit ? 'Medicine updated successfully!' : 'Medicine added successfully!');
            closeModal();
            loadMedicines(); // Reload to get fresh data/IDs
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to save medicine');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Save Medicine';
    }
}

// Delete Medicine
window.deleteMedicine = async function(id) {
    if (!confirm('Are you sure you want to delete this medicine? This action cannot be undone.')) {
        return;
    }

    try {
        const res = await Auth.fetchWithAuth(`http://localhost:5000/api/admin/medicines/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            // Instantly remove from DOM
            document.getElementById(`row-${id}`).remove();
            
            // Remove from array memory
            medicinesList = medicinesList.filter(m => m.id !== id);
            
            showToast('Medicine deleted successfully!');
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to delete');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred');
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
