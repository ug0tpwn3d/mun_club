// Delegate registration form handler
function initRegistrationForm() {
    const form = document.getElementById('registerForm');
    const note = document.getElementById('formNote');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (note) {
                note.textContent = 'Portfolio request received — check your inbox for confirmation.';
            }
            form.reset();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegistrationForm);
} else {
    initRegistrationForm();
}
