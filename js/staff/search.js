// Search functionality
function initSearch() {
    const searchInput = document.getElementById('guidelines-search');
    const searchResults = document.getElementById('search-results');
    let allContent = [];

    // Collect all searchable content
    document.querySelectorAll('.guidelines-section').forEach(section => {
        // Get category from data attribute
        const category = section.dataset.category;

        // Collect content from cards
        section.querySelectorAll('.guideline-card').forEach(card => {
            const title = card.querySelector('h3').textContent;
            const content = Array.from(card.querySelectorAll('li'))
                .map(li => li.textContent)
                .join(' ');
            
            allContent.push({
                category,
                title,
                content,
                element: card
            });
        });

        // Collect content from highlight boxes
        section.querySelectorAll('.highlight-box').forEach(box => {
            const title = box.querySelector('h3').textContent;
            const content = box.querySelector('p').textContent;
            
            allContent.push({
                category,
                title,
                content,
                element: box
            });
        });

        // Collect content from moderation steps
        section.querySelectorAll('.flow-step').forEach(step => {
            const title = step.querySelector('h3').textContent;
            const content = step.querySelector('p').textContent;
            
            allContent.push({
                category,
                title,
                content,
                element: step
            });
        });
    });

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            document.querySelectorAll('.guidelines-section, .guideline-card, .highlight-box, .flow-step')
                .forEach(el => el.style.display = '');
            return;
        }

        const results = allContent.filter(item => {
            const searchText = `${item.title} ${item.content}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        displayResults(results, query);
    }

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No results found</p>';
            searchResults.style.display = 'block';
            return;
        }

        // Group results by category
        const groupedResults = results.reduce((acc, result) => {
            if (!acc[result.category]) {
                acc[result.category] = [];
            }
            acc[result.category].push(result);
            return acc;
        }, {});

        // Build results HTML
        let html = '';
        for (const [category, items] of Object.entries(groupedResults)) {
            html += `
                <div class="search-category">
                    <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <div class="search-items">
                        ${items.map(item => `
                            <div class="search-item" data-category="${category}">
                                <h4>${highlightText(item.title, query)}</h4>
                                <p>${highlightText(item.content, query)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Event listeners
    let debounceTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Clear search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchInput.value = '';
            performSearch('');
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch); 