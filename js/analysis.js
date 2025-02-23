import { analysisData } from '../data/analysisData.js';
import { showLoader, hideLoader } from './loading.js';
import { navigateToGameDetail, handleCardClick } from './navigation.js';

let games = [];
let filteredGames = [];
const ITEMS_PER_PAGE = 8;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    initializeGames();

    // Add event listeners for pagination
    document.querySelector('[data-page="prev"]').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderGames();
            updatePagination();
        }
    });

    document.querySelector('[data-page="next"]').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderGames();
            updatePagination();
        }
    });

    // Add view switching functionality
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const grid = document.getElementById('analysisGrid');
            grid.className = `analysis-grid view-${view}`;
        });
    });
});

function initializeGames() {
    showLoader();
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    games = analysisData;
    filteredGames = [...games];
    initializeFilters();
    renderTrendingGames();
    renderGames();
    updatePagination();
    hideLoader();
}

// Initialize filters with available categories
function initializeFilters() {
    const genreFilter = document.getElementById('genreFilter');
    const uniqueCategories = [...new Set(games.map(game => game.category))];
    
    uniqueCategories.sort().forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        genreFilter.appendChild(option);
    });

    // Add event listeners
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('genreFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('genreFilter').value.toLowerCase();
    const sortBy = document.getElementById('sortFilter').value;

    filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || 
            game.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort games
    filteredGames.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return b.date.localeCompare(a.date);
            case 'oldest':
                return a.date.localeCompare(b.date);
            case 'rating-high':
                return parseFloat(b.rating) - parseFloat(a.rating);
            case 'rating-low':
                return parseFloat(a.rating) - parseFloat(b.rating);
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    currentPage = 1;
    renderGames();
    updatePagination();
}

function renderGames() {
    const grid = document.getElementById('analysisGrid');
    grid.innerHTML = '';

    const gamesForCurrentPage = filteredGames.slice(
        (currentPage - 1) * ITEMS_PER_PAGE, 
        currentPage * ITEMS_PER_PAGE
    );

    gamesForCurrentPage.forEach(game => {
        const card = createAnalysisCard(game);
        grid.appendChild(card);
    });

    if (filteredGames.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>Không tìm thấy bài đánh giá nào phù hợp.</p>
            </div>
        `;
    }
}

// Helper function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short'
    });
}

// Add new function to render trending section
function renderTrendingGames() {
    const trendingList = document.getElementById('trendingList');
    const trendingGames = games.slice(0, 10); // Get top 10 games

    trendingList.innerHTML = trendingGames.map((game, index) => `
        <div class="trending-item">
            <span class="trending-number">${index + 1}</span>
            <div class="trending-info">
                <div class="trending-title">${game.title}</div>
                <div class="trending-meta">
                    <span>${game.category}</span>
                    <span>${game.rating}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Xóa phần populate popular categories
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const paginationElement = document.querySelector('.page-numbers');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderGames();
            updatePagination();
        });
        paginationElement.appendChild(button);
    }
}

function createAnalysisCard(game) {
    const card = document.createElement('div');
    card.className = 'analysis-card';
    card.dataset.gameId = game.title;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-duration', '800');
    card.setAttribute('data-aos-delay', '100');
    card.innerHTML = `
        <div class="card-image">
            <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="card-content">
            <h3>${game.title}</h3>
            <div class="card-pros">
                <ul>
                    ${game.pros.slice(0, 2).map(pro => `<li><i class="fas fa-check"></i>${pro}</li>`).join('')}
                </ul>
            </div>
            <div class="analysis-meta">
                <div class="meta-info">
                    <span class="platform">
                        <i class="fas fa-gamepad"></i> ${game.platform}
                    </span>
                    <span class="analysis-date">
                        <i class="far fa-calendar-alt"></i> ${game.date}
                    </span>
                </div>
                <span class="read-analysis">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToGameDetail(game.title);
    });
    
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const analysisGrid = document.getElementById('analysisGrid');
    
    // Clear existing content
    analysisGrid.innerHTML = '';
    
    // Add analysis cards
    analysisData.forEach(game => {
        const card = createAnalysisCard(game);
        analysisGrid.appendChild(card);
    });

    // Initialize click handlers
    handleCardClick();
});
