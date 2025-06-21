const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require('./handlers/handler');
const express = require('express');
const chalk = require('chalk');
require('dotenv').config();

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// Initialize command collection
client.commands = new Collection();

// Create Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        bot: client.user ? client.user.tag : 'Not logged in',
        guilds: client.guilds.cache.size,
        users: client.users.cache.size
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start Express server
app.listen(PORT, () => {
    console.log(chalk.green(`🌐 Express server running on port ${PORT}`));
});

// Load handlers
(async () => {
    try {
        await loadCommands(client);
        await loadEvents(client);
        
        console.log(chalk.blue('📁 Handlers loaded successfully'));
        
        // Login to Discord
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error(chalk.red('❌ Error starting bot:'), error);
        process.exit(1);
    }
})();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log(chalk.yellow('🔄 Shutting down gracefully...'));
    client.destroy();
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
});

process.on('uncaughtException', (error) => {
    console.error(chalk.red('Uncaught Exception:'), error);
    process.exit(1);
});

module.exports = client;

