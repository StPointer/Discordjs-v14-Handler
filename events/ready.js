const chalk = require('chalk');
const { version: discordjsVersion } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
              const prefix = process.env.BOT_PREFIX || '!';
        console.log(chalk.green(`🤖 ${client.user.tag} is now online!`));
        console.log(chalk.yellow.bold("⚡ Toshiro Products Online ⚡")); 
        console.log( 
          chalk.white("Watching"), 
          chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`), 
          chalk.white( 
            `${ 
              client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 
                ? "Users," 
                : "User," 
            }` 
          ), 
          chalk.red(`${client.guilds.cache.size}`), 
          chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`) 
        ); 
        console.log( 
          chalk.white(`Prefix:` + chalk.red(` ${prefix}`)), 
          chalk.white("||"), 
          chalk.red(`${client.commands.size}`), 
          chalk.white(`Commands`) 
        ); 
        console.log(""); 
        console.log(chalk.red.bold("——————————[Statistics]——————————")); 
        console.log( 
          chalk.gray( 
            `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}` 
          ) 
        ); 
        console.log( 
          chalk.gray( 
            `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${ 
              (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) 
            } MB` 
          ) 
        ); 
        console.log(chalk.gray("Toshiro Products. All rights reserved © 2025"));   
        console.log(chalk.green("——————————[Bot Logs input]——————————"));      


        
        // Set bot status
        client.user.setActivity('with Discord.js v14', { type: 0 }); // 0 = PLAYING
        
        // Optional: Register slash commands globally
        // registerSlashCommands(client);
    }
};