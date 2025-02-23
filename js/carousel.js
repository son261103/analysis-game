export function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    // Auto rotate slides every 5 seconds
    setInterval(nextSlide, 5000);
}
