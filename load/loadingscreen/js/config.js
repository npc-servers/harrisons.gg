// config.js
var Config = {};

/**
 * Enable map text in the top left corner of the screen?
 */
Config.enableMap = true;

/**
 * The prefix text before the map name
 */
Config.mapPrefix = "Currently playing on ";

/**
 * The suffix text for player count
 */
Config.playerCountSuffix = " player slots";

/**
 * Enable custom text in the top right corner of the screen?
 */
Config.enableCustomText = true;

/**
 * The custom texts to display in the top right corner
 * only works if enableCustomText = true
 */
Config.customTexts = [
    "Welcome to Harrison's Homigrad!",
    "Join our Discord: discord.gg/harrisons",
    "Visit our store: harrisons.gg/store",
    "Follow us: harrisons.gg/socials",
    "The best Homigrad experience!",
    "Actively maintained and developed"
];

/**
 * Enable rotating titles?
 */
Config.enableRotatingTitles = true;

/**
 * What messages do you want to show in the title?
 * only works if enableRotatingTitles = true
 */
Config.titleMessages = [
    {
        heading: "HARRISON'S HOMIGRAD",
        subheading: "THE BEST HOMIGRAD EXPERIENCE"
    },
    {
        heading: "JOIN OUR COMMUNITY",
        subheading: "DISCORD.GG/HARRISONS"
    },
    {
        heading: "SUPPORT THE SERVER",
        subheading: "HARRISONS.GG/STORE"
    }
];

/**
 * How many milliseconds between title rotations?
 * only works if enableRotatingTitles = true
 */
Config.rotationLength = 5000;

/**
 * What messages do you want to show up?
 * only works if enableAnnouncements = true
 */
Config.announceMessages = [
    "Need help or want to report a player? Visit our Discord!",
    "Join our community: discord.gg/harrisons",
    "Press F2 to open the settings menu!",
    "Found a bug? Report it on our Discord!",
    "Support the server at harrisons.gg/store"
];

/**
 * Enable announcements?
 */
Config.enableAnnouncements = true;

/**
 * How many milliseconds for each announcement?
 * only works if enableAnnouncements = true
 */
Config.announcementLength = 3000;

Config.tipMessages = [
    "Press F2 to access the settings menu",
    "Press G to ragdoll or get up",
    "Type !help in chat for command list",
    "Join our Discord for the latest updates",
    "Report bugs and cheaters on our Discord"
];

Config.sidePanelMessages = [
    {
        header: "HOMICIDE",
        content: "Traitors must eliminate innocents before police arrive. Innocents must work together to identify and eliminate the traitors. Some innocents have weapons to defend themselves."
    },
    {
        header: "RIOT",
        content: "Police vs Rioters - Officers can arrest or eliminate rioters, while rioters fight for their rights. Last team standing wins."
    },
    {
        header: "GANGWAR",
        content: "Intense gang warfare - Choose your side and fight for territory control. Last gang standing wins."
    },
    {
        header: "TEAM DEATHMATCH",
        content: "Classic team vs team combat. Work with your team to eliminate the opposition. No respawns."
    },
    {
        header: "HIDE & SEEK",
        content: "Hiders must survive until police arrive, while seekers hunt them down. Use the environment to your advantage!"
    },
    {
        header: "DEATHMATCH",
        content: "Every player for themselves in this intense free-for-all combat mode. Last player standing wins!"
    }
];

Config.sidePanelRotationLength = 15000; // 15 seconds