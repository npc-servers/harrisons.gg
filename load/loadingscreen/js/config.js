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
 * Enable custom text in the top right corner?
 */
Config.enableCustomText = true;

/**
 * The custom texts to display in the top right corner
 * only works if enableCustomText = true
 */
Config.customTexts = [
    "We are now ZGRAD.GG!"
];

/**
 * Enable rotating titles?
 */
Config.enableRotatingTitles = false;

/**
 * What messages do you want to show in the title?
 * only works if enableRotatingTitles = true
 */
Config.titleMessages = [
    {
        heading: "HARRISON'S IS NOW ZGRAD.GG",
        subheading: "SAME GREAT EXPERIENCE, NEW NAME"
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
    "NEW DISCORD: discord.gg/npc"
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
    "We've rebranded to ZGRAD.GG - Same great experience!",
    "Press F2 to access the settings menu",
    "Press G to ragdoll or get up",
    "Type !help in chat for command list",
    "Join our Discord at discord.gg/npc",
    "Report bugs and cheaters on our Discord"
];

Config.sidePanelMessages = [
    {
        header: "WE'VE REBRANDED",
        content: "Harrison's Homigrad is now ZGRAD.GG! We're excited to bring you the same great gaming experience under our new brand. Visit zgrad.gg to learn more!"
    }
];

Config.sidePanelRotationLength = 15000; // 15 seconds