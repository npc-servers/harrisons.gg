document.addEventListener('DOMContentLoaded', function() {
    const FLAGS = {
        'US': 'https://zgrad.gg/assets/icons/us-flag.png'
    };

    const servers = [
        {
            id: 'zgrad1',
            title: 'ZGRAD US1',
            ip: '193.243.190.18',
            port: 27066,
            logo: 'https://zgrad.gg/assets/logos/logo-whiteout.png',
            description: 'All Gamemodes',
            link: '/us1/connect.html'
        },
        {
            id: 'hh1',
            title: 'Harrisons Homigrad US1',
            ip: '193.243.190.18',
            port: 27051,
            logo: '/hh_logo_square.png',
            description: 'All Gamemodes',
            link: '/hh1'
        },
        {
            id: 'hh2',
            title: 'Harrisons Homigrad US2',
            ip: '193.243.190.18',
            port: 27052,
            logo: '/hh_logo_square.png',
            description: 'All Gamemodes',
            link: '/hh2'
        },
        {
            id: 'hh3',
            title: 'Harrisons Homigrad US3',
            ip: '193.243.190.18',
            port: 27053,
            logo: '/hh_logo_square.png',
            description: 'Homicide Only',
            link: '/hh3'
        }
    ];

    function createServerCard(server, status, animate = false) {
        const isZgrad = server.id.startsWith('zgrad');
        const websiteButton = isZgrad ? 
            `<a href="https://zgrad.gg" class="server-website" target="_blank">View Website</a>` : '';
        
        let descriptionWithIcon = server.description;
        if (server.description.toLowerCase().includes('homicide')) {
            descriptionWithIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="knife-icon"><path fill="currentColor" d="M4.343 1.408L22.374 19.44a1.5 1.5 0 1 1-2.121 2.122l-4.596-4.596L12.12 20.5L8 16.38V19a1 1 0 1 1-2 0v-4a1 1 0 0 0-1.993-.117L4.001 15v1a1 1 0 1 1-2 0V7.214A7.98 7.98 0 0 1 4.17 1.587z"/></svg> ${server.description}`;
        } else if (server.description.toLowerCase().includes('all gamemodes')) {
            descriptionWithIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="dashboard-icon"><path fill="currentColor" d="M3 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm0 8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1zm1-17a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/></svg> ${server.description}`;
        }

        return `
            <div class="server-card ${animate ? 'animate-in' : ''}" data-server-id="${server.id}">
                <div class="server-header">
                    <img src="${server.logo}" alt="${server.title}" class="server-logo">
                    <div class="title-container">
                        <h2 class="server-title">${server.title}</h2>
                        ${websiteButton}
                    </div>
                </div>
                <div class="server-info">
                    <div class="server-players">
                        <span class="server-status ${status.online ? 'online' : 'offline'}"></span>
                        ${status.online ? `${status.players} players online` : 'Offline'}
                    </div>
                    <div class="server-description">${descriptionWithIcon}</div>
                </div>
                <a href="${server.link}" class="server-connect" onclick="handleConnectClick(event, '${server.link}')">
                    <span class="desktop-text">Connect to Server</span>
                    <span class="mobile-text">Only available on PC</span>
                </a>
            </div>
        `;
    }

    function updateServerStatus(server) {
        return fetch(`https://gameserveranalytics.com/api/v2/query?game=source&ip=${server.ip}&port=${server.port}&type=info`)
            .then(response => response.json())
            .then(serverInfo => {
                const status = {
                    online: false,
                    players: 0
                };

                if (serverInfo && (serverInfo.status?.toLowerCase() === 'online' || serverInfo.players !== undefined)) {
                    status.online = true;
                    status.players = serverInfo.players || serverInfo.num_players || serverInfo.playercount || 0;
                }

                return status;
            })
            .catch(error => {
                console.error(`Error fetching data for ${server.id}:`, error);
                return { online: false, players: 0 };
            });
    }

    async function updateServerCards() {
        const serversGrid = document.getElementById('serversGrid');
        if (!serversGrid) return;

        const statuses = await Promise.all(servers.map(server => updateServerStatus(server)));
        
        // Create array of servers with their statuses
        const serversWithStatus = servers.map((server, index) => ({
            server,
            status: statuses[index]
        }));

        // Sort servers: online servers first (by player count), then offline servers
        serversWithStatus.sort((a, b) => {
            if (a.status.online && !b.status.online) return -1;
            if (!a.status.online && b.status.online) return 1;
            return b.status.players - a.status.players;
        });
        
        // Initial render of all server cards with animation
        serversGrid.innerHTML = serversWithStatus
            .map(({ server, status }) => createServerCard(server, status, true))
            .join('');
    }

    async function updatePlayerCounts() {
        const statuses = await Promise.all(servers.map(server => updateServerStatus(server)));
        
        // Update player counts first
        servers.forEach((server, index) => {
            const status = statuses[index];
            const serverCard = document.querySelector(`[data-server-id="${server.id}"]`);
            if (serverCard) {
                const statusIndicator = serverCard.querySelector('.server-status');
                const playersElement = serverCard.querySelector('.server-players');
                
                // Update status indicator
                statusIndicator.className = `server-status ${status.online ? 'online' : 'offline'}`;
                
                // Update player count text
                playersElement.innerHTML = `
                    <span class="server-status ${status.online ? 'online' : 'offline'}"></span>
                    ${status.online ? `${status.players} players online` : 'Offline'}
                `;
            }
        });

        // Get current positions
        const serversGrid = document.getElementById('serversGrid');
        const cards = Array.from(serversGrid.children);
        const oldOrder = cards.map(card => card.dataset.serverId);

        // Calculate new order
        const serverStatuses = servers.map((server, index) => ({
            id: server.id,
            online: statuses[index].online,
            players: statuses[index].players
        }));

        const newOrder = [...serverStatuses].sort((a, b) => {
            if (a.online && !b.online) return -1;
            if (!a.online && b.online) return 1;
            return b.players - a.players;
        }).map(s => s.id);

        // Only reorder if the order has changed
        if (JSON.stringify(oldOrder) !== JSON.stringify(newOrder)) {
            // Set grid items to position: absolute temporarily
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                card.style.width = rect.width + 'px';
                card.style.height = rect.height + 'px';
                card.style.position = 'absolute';
                card.style.top = rect.top + 'px';
                card.style.left = rect.left + 'px';
                card.style.transition = 'none';
            });

            // Force a reflow
            serversGrid.offsetHeight;

            // Add transition and move to new positions
            cards.forEach(card => {
                card.style.transition = 'all 0.3s ease';
            });

            // Reorder the elements in the DOM
            newOrder.forEach((id, index) => {
                const card = serversGrid.querySelector(`[data-server-id="${id}"]`);
                serversGrid.appendChild(card);
            });

            // After transition, reset styles
            setTimeout(() => {
                cards.forEach(card => {
                    card.style.position = '';
                    card.style.top = '';
                    card.style.left = '';
                    card.style.width = '';
                    card.style.height = '';
                    card.style.transition = '';
                });
            }, 300);
        }
    }

    // Add this new function to handle connect button clicks
    window.handleConnectClick = function(event, link) {
        // Check if mobile
        if (window.innerWidth <= 768) {
            event.preventDefault();
            document.getElementById('joinGuide').style.display = 'flex';
        } else {
            // On desktop, let the link work normally
            return true;
        }
    };

    // Initial render
    updateServerCards();

    // Update only player counts every 5 seconds
    setInterval(updatePlayerCounts, 5000);
}); 