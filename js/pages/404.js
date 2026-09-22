// 404 Interactive micro-animations
document.addEventListener('DOMContentLoaded', () => {
    const errorCode = document.querySelector('.error-code');
    if (errorCode) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 16;
            const y = (e.clientY / window.innerHeight - 0.5) * 16;
            errorCode.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});
