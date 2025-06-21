# Discord.js v14 Bot

A feature-rich Discord bot built with Discord.js v14, featuring command handling, event management, and a web server.

## Features

- 🤖 Modern Discord.js v14 implementation
- 📁 Organized file structure with command/event handlers
- 🌐 Built-in Express web server for monitoring
- 🎨 Colorful console logging with Chalk
- ⚡ Slash command support (Soon)
- 🔗 Prefix command support 
- 📊 Bot statistics and information commands
- 🔄 Hot-reloading command system
- 🛡️ Error handling and graceful shutdown

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your bot token:
   ```
   DISCORD_TOKEN=your_bot_token_here
   BOT_PREFIX=!
   PORT=3000
   ```
4. Run the bot: `npm start` or `npm run dev` for development

## Commands

- `/ping` - Check bot latency
- `/info` - Show bot information
- `/user [target]` - Get user information
- `/server` - Get server information

## File Structure

```
├── index.js                 # Main bot file
├── src/
│   ├── handlers/
│   │   └── handler.js       # Command and event loader
│   ├── commands/
│   │   ├── general/
│   │   │   ├── ping.js
│   │   │   └── info.js
│   │   └── utility/
│   │       ├── user.js
│   │       └── server.js
│   └── events/
│       ├── ready.js
│       ├── interactionCreate.js
│       ├── messageCreate.js
│       ├── guildCreate.js
│       └── guildDelete.js
├── package.json
├── .env
└── README.md
```

## API Endpoints

- `GET /` - Bot status and statistics
- `GET /health` - Health check endpoint

## Bot version requirements:
- Node.js 18.x or 20.x 

## Notes:
- This project may not work properly on platforms like Replit or Glitch. Consider using more reliable hosting services such as Render or Railway.

## Contributing

Feel free to submit issues and enhancement requests!
