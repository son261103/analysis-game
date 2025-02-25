import { analysisData } from '../data/analysisData.js';
import { showLoader, hideLoader } from './loading.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = decodeURIComponent(urlParams.get('id'));

    if (gameId) {
        loadGameDetails(gameId);
    }
    initializeComments();
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
});

async function loadGameDetails(gameId) {
    showLoader();
    try {
        // Clean up the game ID and search more flexibly
        const searchTitle = gameId.toLowerCase().replace(' review', '').trim();
        
        // Find game in analysisData
        const gameData = analysisData.find(game => 
            game.title.toLowerCase().includes(searchTitle) || 
            searchTitle.includes(game.title.toLowerCase())
        );

        if (!gameData) {
            throw new Error('Game not found');
        }

        // Update page content
        document.title = `${gameData.title} - Game Analysis`;
        document.getElementById('gameTitle').textContent = gameData.title;
        document.getElementById('gameImage').src = gameData.image;
        document.getElementById('gameDescription').innerHTML = gameData.description;
        
        // Update scores and meta information
        document.querySelector('.release-date').textContent = gameData.date;
        document.querySelector('.genre').textContent = gameData.category;
        document.querySelector('.rating').textContent = gameData.rating;
        
        // Update other game details as needed
        document.getElementById('gameplayScore').textContent = calculateScore(gameData, 'gameplay');
        document.getElementById('graphicsScore').textContent = calculateScore(gameData, 'graphics');
        document.getElementById('soundScore').textContent = calculateScore(gameData, 'sound');

        const fullReview = generateFullReview(gameData);
        document.getElementById('fullReview').innerHTML = fullReview;

    } catch (error) {
        console.error('Error loading game details:', error);
        document.getElementById('gameTitle').textContent = 'Game not found';
    } finally {
        hideLoader();
    }
}

function calculateScore(gameData, aspect) {
    // Giả lập điểm số dựa trên rating tổng thể
    const baseScore = parseFloat(gameData.rating) || 8.0;
    const variance = Math.random() * 1 - 0.5; // Random variance between -0.5 and 0.5
    return Math.min(10, Math.max(1, (baseScore + variance))).toFixed(1);
}

function generateFullReview(gameData) {
    return `
        <div class="review-section">
            <h3>Tổng Quan</h3>
            <p>${gameData.description}</p>
            
            <h3>Điểm Nổi Bật</h3>
            <ul>
                ${gameData.pros.map(pro => `<li>${pro}</li>`).join('')}
            </ul>
            
            <h3>Thông Tin Chi Tiết</h3>
            <div class="game-info-grid">
                <div class="info-item">
                    <span class="label">Nhà phát triển:</span>
                    <span class="value">${gameData.developer}</span>
                </div>
                <div class="info-item">
                    <span class="label">Thời lượng:</span>
                    <span class="value">${gameData.playtime}</span>
                </div>
                <div class="info-item">
                    <span class="label">Nền tảng:</span>
                    <span class="value">${gameData.platform}</span>
                </div>
                <div class="info-item">
                    <span class="label">Thể loại:</span>
                    <span class="value">${gameData.category}</span>
                </div>
            </div>
        </div>
    `;
}

// Add comment functionality
function initializeComments() {
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    
    // Load existing comments from localStorage
    loadComments();
    
    // Handle comment submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = commentInput.value.trim();
        
        if (content) {
            addComment(content);
            commentInput.value = '';
        }
    });
    
    document.getElementById('submitComment').addEventListener('click', () => {
        const content = commentInput.value.trim();
        if (content) {
            addComment(content);
            commentInput.value = '';
        }
    });
}

// Add sample comments
const sampleComments = [
    {
        id: 1,
        user: 'GameMaster',
        content: 'Một trong những tựa game hay nhất mà tôi từng chơi! Đồ họa tuyệt vời và gameplay rất cuốn.',
        date: '2023-12-20T10:30:00'
    },
    {
        id: 2,
        user: 'RPGLover',
        content: 'Cốt truyện rất hay và sâu sắc. Tuy nhiên có một số bug nhỏ cần được fix trong các bản cập nhật tiếp theo.',
        date: '2023-12-19T15:45:00'
    },
    {
        id: 3,
        user: 'ProGamer',
        content: 'Hệ thống chiến đấu rất thú vị và đa dạng. Mong chờ DLC tiếp theo!',
        date: '2023-12-18T09:15:00'
    }
];

// Modify loadComments function
function loadComments() {
    const commentsList = document.getElementById('commentsList');
    const gameId = new URLSearchParams(window.location.search).get('id');
    let comments = JSON.parse(localStorage.getItem(`comments_${gameId}`)) || [];
    
    // Add sample comments if no comments exist
    if (comments.length === 0) {
        comments = sampleComments;
        localStorage.setItem(`comments_${gameId}`, JSON.stringify(comments));
    }
    
    commentsList.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
}

function addComment(content) {
    const gameId = new URLSearchParams(window.location.search).get('id');
    const comments = JSON.parse(localStorage.getItem(`comments_${gameId}`)) || [];
    
    const newComment = {
        id: Date.now(),
        user: 'User', // You can replace this with actual user data
        content: content,
        date: new Date().toISOString()
    };
    
    comments.unshift(newComment);
    localStorage.setItem(`comments_${gameId}`, JSON.stringify(comments));
    
    const commentsList = document.getElementById('commentsList');
    commentsList.insertAdjacentHTML('afterbegin', createCommentHTML(newComment));
}

// Update createCommentHTML function
function createCommentHTML(comment) {
    const date = new Date(comment.date);
    const formattedDate = date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
        <div class="comment-item" data-aos="fade-up" data-aos-delay="100" data-comment-id="${comment.id}">
            <div class="comment-header">
                <div class="comment-user">
                    <div class="user-avatar">${comment.user[0]}</div>
                    <div class="user-info">
                        <div class="user-name">${comment.user}</div>
                    </div>
                </div>
                <div class="comment-date">
                    <i class="far fa-clock"></i>
                    ${formattedDate}
                </div>
            </div>
            <div class="comment-content">${comment.content}</div>
        </div>
    `;
}
