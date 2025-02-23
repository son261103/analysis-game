export function navigateToGameDetail(gameId) {
    // Lưu state hiện tại
    sessionStorage.setItem('lastScrollPosition', window.scrollY);
    
    // Chuyển đến trang game-detail với ID game
    window.location.href = `/views/game-detail.html?id=${gameId}`;
}

export function handleCardClick() {
    document.querySelectorAll('.game-card, .analysis-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const gameId = card.dataset.gameId || card.querySelector('h3').textContent;
            navigateToGameDetail(encodeURIComponent(gameId));
        });
    });
}

// Thêm các hàm xử lý khác
