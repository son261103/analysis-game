export function showLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

export function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Add loading animation to all page transitions
document.addEventListener('DOMContentLoaded', () => {
    hideLoader();

    // Add click event listeners to all navigation links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                showLoader();
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
});
