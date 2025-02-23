import { analysisData, trendingAnalysis } from '../data/analysisData.js';
import { newsData, featuredNews } from '../data/newsData.js';
import { handleCardClick } from './navigation.js';
import { upcomingGames, gameCategories, communityContent } from '../data/upcomingData.js';
import { createUpcomingCard, createCategoryCard, createCommunitySection } from './components.js';
import { placeholderImages, placeholderColors } from '../data/imageUrls.js';

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out'
});

// Sample data for games
const games = [
    {
        title: 'Baldur\'s Gate 3',
        image: 'assets/images/games/bg3.jpg',
        description: 'A masterpiece of RPG design with unprecedented player freedom and stunning visuals...',
        rating: '9.8/10',
        date: 'Dec 15, 2023',
        category: 'RPG',
        playtime: '100+ hours',
        pros: ['Story depth', 'Character customization', 'Combat system'],
        developer: 'Larian Studios'
    },
    {
        title: 'Spider-Man 2',
        image: 'assets/images/games/spiderman2.jpg',
        description: 'The ultimate Spider-Man experience with dual protagonists and enhanced web-swinging...',
        rating: '9.5/10',
        date: 'Dec 10, 2023',
        category: 'Action-Adventure',
        playtime: '30+ hours',
        pros: ['Web mechanics', 'City design', 'Graphics'],
        developer: 'Insomniac Games'
    },
    {
        title: 'Alan Wake 2',
        image: 'assets/images/games/alanwake2.jpg',
        description: 'A psychological horror masterpiece that pushes narrative boundaries...',
        rating: '9.3/10',
        date: 'Dec 5, 2023',
        category: 'Horror',
        playtime: '20+ hours',
        pros: ['Atmosphere', 'Story', 'Visuals'],
        developer: 'Remedy'
    },
    // Add 7 more similar objects for other games
];

// Sample data for news
const news = [
    {
        title: 'GTA 6 Release Date Announcement',
        image: 'assets/images/news/gta6.jpg',
        description: 'Rockstar Games finally reveals the release date for GTA 6...',
        date: 'Dec 15, 2023',
        category: 'Breaking News'
    },
    {
        title: 'Cyberpunk 2077 Major Update',
        image: 'assets/images/news/cyberpunk.jpg',
        description: 'New expansion pack and features coming to Night City...',
        date: 'Dec 14, 2023',
        category: 'Updates'
    },
    {
        title: 'PS6 Development Confirmed',
        image: 'assets/images/news/ps6.jpg',
        description: 'Sony hints at next-gen console features and improvements...',
        date: 'Dec 13, 2023',
        category: 'Hardware'
    },
    {
        title: 'Game Awards 2023 Winners',
        image: 'assets/images/news/awards.jpg',
        description: 'Complete list of winners from this year\'s Game Awards...',
        date: 'Dec 12, 2023',
        category: 'Events'
    },
    {
        title: 'New Zelda DLC Announced',
        image: 'assets/images/news/zelda.jpg',
        description: 'Nintendo reveals exciting new content for TOTK...',
        date: 'Dec 11, 2023',
        category: 'DLC'
    },
    {
        title: 'EA Sports FC 24 Update',
        image: 'assets/images/news/easports.jpg',
        description: 'Major gameplay improvements and new features added...',
        date: 'Dec 10, 2023',
        category: 'Updates'
    },
    {
        title: 'Xbox Game Pass Expansion',
        image: 'assets/images/news/gamepass.jpg',
        description: 'Microsoft adds 20 new titles to Game Pass library...',
        date: 'Dec 9, 2023',
        category: 'Services'
    },
    {
        title: 'Minecraft 2.0 Teaser',
        image: 'assets/images/news/minecraft.jpg',
        description: 'Mojang teases major overhaul for Minecraft...',
        date: 'Dec 8, 2023',
        category: 'Upcoming'
    },
    {
        title: 'Steam Deck 2 Leaked',
        image: 'assets/images/news/steamdeck.jpg',
        description: 'First look at Valve\'s next portable gaming device...',
        date: 'Dec 7, 2023',
        category: 'Leaks'
    },
    {
        title: 'Call of Duty 2024',
        image: 'assets/images/news/cod.jpg',
        description: 'Activision reveals next CoD setting and features...',
        date: 'Dec 6, 2023',
        category: 'Announcements'
    }
];

// Thêm hàm xử lý lỗi ảnh
function handleImageError(img) {
    img.onerror = function() {
        // Sử dụng ảnh backup từ placeholderColors nếu cả Picsum và ảnh gốc đều lỗi
        this.src = placeholderColors[this.dataset.type || 'games'];
        this.onerror = null;
    }
}

function createAnalysisCard(game) {
    return `
        <div class="analysis-card" data-aos="fade-up">
            <div class="analysis-image">
                <img src="${game.image}" 
                     alt="${game.title}"
                     data-type="games"
                     onerror="this.src='${placeholderColors.games}'">
                <span class="analysis-rating">${game.rating}</span>
            </div>
            <div class="analysis-content">
                <div class="analysis-header">
                    <h3>${game.title}</h3>
                    <small class="developer">${game.developer}</small>
                </div>
                <p class="analysis-desc">${game.description}</p>
                <div class="analysis-details">
                    <div class="pros">
                        ${game.pros.slice(0, 3).map(pro => `<span class="pro-tag">${pro}</span>`).join('')}
                    </div>
                </div>
                <div class="analysis-meta">
                    <small class="analysis-date">${game.date}</small>
                </div>
            </div>
        </div>
    `;
}

function createTrendingItem(item) {
    return `
        <div class="trending-item">
            <span class="trending-number">${item.number}</span>
            <div class="trending-info">
                <h4>${item.title}</h4>
                <small class="trending-rating">${item.rating}</small>
            </div>
        </div>
    `;
}

// Create game cards
function createGameCards() {
    const analysisMain = document.querySelector('.analysis-main');
    const trendingList = document.querySelector('.trending-list');
    
    if (analysisMain) {
        analysisMain.innerHTML = analysisData
            .map(game => createAnalysisCard(game)) // Remove slice to show all items
            .join('');
    }

    if (trendingList) {
        const trendingContent = `
            <h3 class="trending-title">Trending Reviews</h3>
            ${trendingAnalysis.map(item => createTrendingItem(item)).join('')}
        `;
        trendingList.innerHTML = trendingContent;
    }
}

// Create news cards
function createNewsCards() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    const featuredNews = newsData[0];
    const sideNews = newsData.slice(1, 4);

    const newsHTML = `
        <div class="news-featured">
            <div class="news-card" data-aos="fade-up">
                <div class="news-image">
                    <img src="${featuredNews.image}" alt="${featuredNews.title}">
                    <span class="news-category">${featuredNews.category}</span>
                </div>
                <div class="news-content">
                    <h3>${featuredNews.title}</h3>
                    <p class="news-desc">${featuredNews.description}</p>
                    <div class="news-tags">
                        ${featuredNews.tags.map(tag => `
                            <span class="news-tag">${tag}</span>
                        `).join('')}
                    </div>
                    <div class="news-meta">
                        <div class="meta-left">
                            <div class="author-info">
                                <div class="author-avatar">
                                    <img src="../assets/images/authors/default-avatar.jpg" alt="${featuredNews.author}">
                                </div>
                                <span class="author-name">${featuredNews.author}</span>
                            </div>
                            <span class="news-date">${featuredNews.date}</span>
                        </div>
                        <span class="read-time">${featuredNews.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="news-sidebar">
            ${sideNews.map(news => `
                <div class="news-card" data-aos="fade-left">
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}">
                        <span class="news-category">${news.category}</span>
                    </div>
                    <div class="news-content">
                        <h3>${news.title}</h3>
                        <div class="news-meta">
                            <span class="news-date">${news.date}</span>
                            <span class="read-time">${news.readTime}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    newsGrid.innerHTML = newsHTML;
}

function createFeaturedNewsCard(news) {
    return `
        <div class="news-card featured">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
                <span class="news-category">${news.category}</span>
            </div>
            <div class="news-content">
                <div>
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                </div>
                <div class="news-meta">
                    <span class="news-date">${news.date}</span>
                    <a href="#" class="read-more">Full Story →</a>
                </div>
            </div>
        </div>
    `;
}

function createSidebarNewsCards(newsItems) {
    return newsItems.map(item => `
        <div class="news-card sidebar">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <h3>${item.title}</h3>
                <div class="news-meta">
                    <small class="news-category">${item.category}</small>
                    <small class="news-date">${item.date}</small>
                </div>
            </div>
        </div>
    `).join('');
}

// Carousel functionality
let currentSlide = 0;
const carouselItems = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    carouselItems.forEach(item => {
        item.classList.remove('active');
        item.style.zIndex = 0;
    });
    currentSlide = (index + carouselItems.length) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
    carouselItems[currentSlide].style.zIndex = 1;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto advance carousel
setInterval(nextSlide, 5000);

// Handle active nav links
function handleNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active state
}

// Update navbar handling
function handleNavbarScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    function toggleNavbar() {
        const currentScroll = window.scrollY;
        
        // Determine scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past threshold
            header.classList.add('header-hidden');
        } else {
            // Scrolling up or at top
            header.classList.remove('header-hidden');
        }
        
        // At the very top
        if (currentScroll === 0) {
            header.classList.remove('sticky');
        } else {
            header.classList.add('sticky');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', toggleNavbar);
    toggleNavbar();
}

// Add carousel functionality
function initCarousel() {
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = 3;
    const transitionDelay = 10000; // Changed to 10 seconds
    const transitionDuration = 500; // 0.5 seconds for animation
    let isAnimating = false;
    
    function showSlide(index, direction = 'right') {
        if (isAnimating) return;
        isAnimating = true;

        slides.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
        });

        currentSlide = (index + totalSlides) % totalSlides;
        const activeSlide = slides[currentSlide];

        // Simple fade transition
        setTimeout(() => {
            activeSlide.classList.add('active');
            activeSlide.style.opacity = '1';
            updateDots(currentSlide);
            setTimeout(() => {
                isAnimating = false;
            }, 600); // Match with CSS transition duration
        }, 50);
    }

    // Ensure only 3 slides are active
    slides.forEach((slide, index) => {
        if (index >= totalSlides) {
            slide.remove();
        }
    });

    // Update dots
    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Add click events to dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            const direction = slideIndex > currentSlide ? 'right' : 'left';
            showSlide(slideIndex, direction);
        });
    });

    // Add touch events
    const carousel = document.querySelector('.carousel');
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                // Swipe left
                showSlide(currentSlide + 1, 'right');
            } else {
                // Swipe right
                showSlide(currentSlide - 1, 'left');
            }
        }
    }

    // Start auto-advance with longer delay
    setInterval(() => {
        if (!isAnimating) {
            showSlide((currentSlide + 1) % totalSlides, 'right');
        }
    }, transitionDelay);
}

function createUpcomingSection() {
    const upcomingGrid = document.querySelector('.upcoming-grid');
    if (upcomingGrid) {
        upcomingGrid.innerHTML = upcomingGames
            .map(game => `
                <div class="upcoming-card" data-game-id="${game.title.toLowerCase().replace(/\s+/g, '-')}">
                    <!-- Card content -->
                </div>
            `)
            .join('');
    }
}

function createCategoriesSection() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = gameCategories
            .map(category => `
                <div class="category-card">
                    <!-- Category content -->
                </div>
            `)
            .join('');
    }
}

function initializeSections() {
    // Initialize Upcoming Games
    const upcomingGrid = document.querySelector('.upcoming-grid');
    if (upcomingGrid) {
        upcomingGrid.innerHTML = upcomingGames
            .map(game => createUpcomingCard(game))
            .join('');
    }

    // Initialize Categories
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = gameCategories
            .map(category => createCategoryCard(category))
            .join('');
    }

    // Initialize Community
    const communityContainer = document.querySelector('.community-content');
    if (communityContainer) {
        communityContainer.innerHTML = createCommunitySection(communityContent);
    }
}

function initializePage() {
    createGameCards();
    createNewsCards();
    createUpcomingSection();
    createCategoriesSection();
    handleCardClick();
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const isViewsFolder = currentPath.includes('/views/');
    
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        handleNavbarScroll();
        createGameCards();
        createNewsCards();
    } else if (currentPath.includes('analysis.html')) {
        createGameCards();
    } else if (currentPath.includes('news.html')) {
        createNewsCards();
    }

    // Update image paths based on folder
    if (isViewsFolder) {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.startsWith('assets/')) {
                img.src = '../' + img.src;
            }
        });
    }

    // Common initializations
    AOS.init();
    if (document.querySelector('.carousel')) {
        initCarousel();
    }
    initializeSections();
    handleCardClick();

    // Add image error handling
    document.querySelectorAll('img').forEach(img => handleImageError(img));
});
