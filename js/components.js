export function createUpcomingCard(game) {
    return `
        <div class="upcoming-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100" data-game-id="${game.title.toLowerCase().replace(/\s+/g, '-')}">
            <div class="upcoming-image">
                <img src="${game.image}" alt="${game.title}">
                <span class="upcoming-platform">${game.platform}</span>
            </div>
            <div class="upcoming-content">
                <span class="upcoming-date">${game.releaseDate}</span>
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="upcoming-meta">
                    <span class="developer">${game.developer}</span>
                    <span class="hype">Hype: ${game.hype}</span>
                </div>
            </div>
        </div>
    `;
}

export function createCategoryCard(category) {
    return `
        <div class="category-card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <img src="${category.image}" alt="${category.name}" class="category-image">
            <div class="category-overlay">
                <h3>${category.name}</h3>
                <div class="category-stats">
                    <span class="category-count">${category.count} Games</span>
                </div>
                <div class="category-popular">
                    Popular: ${category.popular.join(' • ')}
                </div>
            </div>
        </div>
    `;
}

export function createCommunitySection(content) {
    return `
        <div class="streams-container" data-aos="fade-right" data-aos-duration="800">
            <h3>Live Streams</h3>
            ${content.featuredStreams.map(stream => `
                <div class="stream-card">
                    <div class="stream-info">
                        <h4>${stream.title}</h4>
                        <span>${stream.streamer} • ${stream.viewers} viewers</span>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="forum-container" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
            <h3>Thảo Luận Mới</h3>
            ${content.latestForums.map(post => `
                <div class="forum-post">
                    <h4>${post.title}</h4>
                    <div class="post-meta">
                        <span>${post.author}</span>
                        <span>${post.replies} replies</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
