document.addEventListener('DOMContentLoaded', function() {
    const servers = [
        {
            id: 'zgrad1',
            ip: '193.243.190.18',
            port: 27066
        },
        {
            id: 'hh1',
            ip: '193.243.190.18',
            port: 27051
        },
        {
            id: 'hh2',
            ip: '193.243.190.18',
            port: 27052
        },
        {
            id: 'hh3',
            ip: '193.243.190.18',
            port: 27053
        }
    ];

    let currentCount = 0;

    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function animateCount(element, newValue, duration = 2000) {
        const startValue = currentCount;
        const startTime = performance.now();
        
        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = easeOutExpo(progress);
            const currentValue = Math.floor(startValue + (newValue - startValue) * easedProgress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                currentCount = newValue;
            }
        }
        
        requestAnimationFrame(updateCount);
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

    async function updateTotalPlayers() {
        const statuses = await Promise.all(servers.map(server => updateServerStatus(server)));
        const newTotal = statuses.reduce((total, status) => {
            return total + (status.online ? status.players : 0);
        }, 0);
        
        const totalPlayersElement = document.getElementById('totalPlayers');
        if (totalPlayersElement) {
            if (newTotal > 0) {
                animateCount(totalPlayersElement, newTotal);
            } else {
                totalPlayersElement.textContent = "No players online";
                currentCount = 0;
            }
        }
    }

    // Update player count every 30 seconds
    updateTotalPlayers();
    setInterval(updateTotalPlayers, 30000);
});