// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.admin-sidebar');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// View message functionality
const viewMessageButtons = document.querySelectorAll('.btn-view-message');
const messageModal = document.getElementById('messageModal');
const modalMessageContent = document.getElementById('modalMessageContent');

if (viewMessageButtons.length > 0 && messageModal) {
    viewMessageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const messageFull = row.querySelector('.message-full');
            if (messageFull) {
                modalMessageContent.innerHTML = messageFull.innerHTML;
                messageModal.style.display = 'block';
            }
        });
    });
}

// Close modal
const closeModalButtons = document.querySelectorAll('.close-modal');
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (messageModal) {
            messageModal.style.display = 'none';
        }
        const formModals = document.querySelectorAll('.form-modal');
        formModals.forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

// Close modal when clicking outside
if (messageModal) {
    window.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });
}

// Auto-hide alerts
setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.style.transition = 'opacity 0.5s';
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
        }, 500);
    });
}, 5000);

