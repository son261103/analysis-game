import { featuredNews, latestNews } from './newsData.js';

export const newsData = [
    {
        id: 1,
        image: '../assets/images/cyberpunk.jpg',
        category: 'Breaking News',
        title: 'Cyberpunk 2077: Ultimate Edition Announced with All DLC',
        description: 'CD Projekt Red reveals the definitive edition of Cyberpunk 2077, including Phantom Liberty and all previous updates. Coming December 2023.',
        date: 'Oct 15, 2023',
        author: 'John Doe',
        readTime: '5 min read',
        tags: ['CD Projekt Red', 'RPG', 'Open World']
    },
    {
        id: 2,
        image: '../assets/images/gow.jpg',
        category: 'Industry News',
        title: 'God of War Developer Working on New IP',
        description: 'Santa Monica Studio hints at a brand new game universe separate from God of War franchise.',
        date: 'Oct 12, 2023',
        author: 'Jane Smith',
        readTime: '4 min read',
        tags: ['Santa Monica Studio', 'PlayStation', 'New IP']
    },
    {
        id: 3,
        image: '../assets/images/ghost.jpg',
        category: 'PC Gaming',
        title: 'Ghost of Tsushima PC Features Revealed',
        description: 'Sony details PC-exclusive features including ultrawide support, DLSS, and advanced graphics options.',
        date: 'Oct 10, 2023',
        author: 'Mike Johnson',
        readTime: '6 min read',
        tags: ['PlayStation', 'PC Port', 'Action']
    },
    {
        id: 4,
        image: '../assets/images/eldenring.jpg',
        category: 'DLC',
        title: 'Elden Ring: Shadow of the Erdtree First Look',
        description: 'FromSoftware showcases gameplay footage from highly anticipated DLC, revealing new areas and bosses.',
        date: 'Oct 8, 2023',
        author: 'Sarah Wilson',
        readTime: '8 min read',
        tags: ['FromSoftware', 'DLC', 'Action RPG']
    }
];

export const newsCategories = [
    'All',
    'Breaking News',
    'Industry News',
    'Reviews',
    'PC Gaming',
    'Console Gaming',
    'Mobile Gaming',
    'eSports',
    'DLC'
];

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});

// Initialize Swiper
function initFeaturedSwiper() {
    const swiper = new Swiper('.featured-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
}

// Display featured news as carousel
function displayFeaturedNews() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) return;

    swiperWrapper.innerHTML = featuredNews.map(news => `
        <div class="swiper-slide" data-aos="fade-up">
            <a href="#" class="featured-card">
                <img src="https://picsum.photos/800/600?random=${news.id}" alt="${news.title}">
                <div class="featured-card-content">
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-summary">${news.summary}</p>
                    <div class="news-meta">
                        <span class="news-date">${news.date}</span>
                    </div>
                </div>
            </a>
        </div>
    `).join('');

    initFeaturedSwiper();
}

// Display latest news
function displayLatestNews() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;

    newsContainer.innerHTML = latestNews.map(news => `
        <a href="#" class="news-card" data-category="${news.category}" data-aos="fade-up">
            <img src="https://picsum.photos/800/600?random=${news.id}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <span class="news-date">${news.date}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Filter news
function setupNewsFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter news cards
            newsCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.setAttribute('data-aos', 'fade-up');
                } else {
                    card.style.display = 'none';
                }
            });

            // Refresh AOS
            AOS.refresh();
        });
    });
}

// Initialize news display
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedNews();
    displayLatestNews();
    setupNewsFilters();
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});
