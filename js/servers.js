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
            region: 'US',
            logo: 'https://zgrad.gg/assets/logos/logo-whiteout.png',
            description: 'All Gamemodes',
            link: '/us1/connect.html'
        },
        {
            id: 'hh1',
            title: 'Harrisons Homigrad US1',
            ip: '193.243.190.18',
            port: 27051,
            region: 'US',
            logo: '/hh_logo_square.png',
            description: 'All Gamemodes',
            link: '/hh1'
        },
        {
            id: 'hh2',
            title: 'Harrisons Homigrad US2',
            ip: '193.243.190.18',
            port: 27052,
            region: 'US',
            logo: '/hh_logo_square.png',
            description: 'All Gamemodes',
            link: '/hh2'
        },
        {
            id: 'hh3',
            title: 'Harrisons Homigrad US3',
            ip: '193.243.190.18',
            port: 27053,
            region: 'US',
            logo: '/hh_logo_square.png',
            description: 'Homicide Only',
            link: '/hh3'
        }
    ];

    function createServerCard(server, status, animate = false) {
        const isZgrad = server.id.startsWith('zgrad');
        const websiteButton = isZgrad ? 
            `<a href="https://zgrad.gg" class="server-website" target="_blank">View Website</a>` : '';

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
                    <div class="server-region">
                        <img src="${FLAGS[server.region]}" alt="${server.region}" class="region-flag">
                        ${server.region} Region
                    </div>
                    <div class="server-players">
                        <span class="server-status ${status.online ? 'online' : 'offline'}"></span>
                        ${status.online ? `${status.players} players online` : 'Offline'}
                    </div>
                    <div class="server-description">${server.description}</div>
                </div>
                <a href="${server.link}" class="server-connect">Connect to Server</a>
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

    // Initial render
    updateServerCards();

    // Update only player counts every 5 seconds
    setInterval(updatePlayerCounts, 5000);
}); 