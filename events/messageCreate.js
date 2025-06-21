const chalk = require('chalk');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Ignore bot messages
        if (message.author.bot) return;
        
        const prefix = process.env.BOT_PREFIX || '!';
        if (!message.content.startsWith(prefix)) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        // Find command (check both slash command name and any aliases)
        const command = client.commands.get(commandName) || 
                       client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;
        
        try {
           console.log(
             chalk.yellow.bold("[BOT]:") +
               chalk.white(`⚡ ${message.author.tag} used ${prefix}${commandName} in ${message.guild?.name || 'DM'}`)
                  );
            
            // Create a mock interaction object for prefix commands
            const mockInteraction = {
                user: message.author,
                member: message.member,
                guild: message.guild,
                channel: message.channel,
                reply: async (options) => {
                    if (typeof options === 'string') {
                        return message.reply(options);
                    }
                    
                    if (options.embeds) {
                        return message.reply({ embeds: options.embeds });
                    }
                    
                    return message.reply(options.content || 'No content provided');
                },
                editReply: async (options) => {
                    // For prefix commands, we'll just send a new message
                    return message.channel.send(typeof options === 'string' ? options : options.content);
                },
                options: {
                    getUser: (name) => {
                        // Simple user mention parsing for prefix commands
                        const mention = args.find(arg => arg.startsWith('<@') && arg.endsWith('>'));
                        if (mention) {
                            const userId = mention.slice(2, -1).replace('!', '');
                            return client.users.cache.get(userId);
                        }
                        return null;
                    }
                },
                replied: false,
                deferred: false
            };
            
            await command.execute(mockInteraction, client);
            
        } catch (error) {
            console.error(
              chalk.yellow.bold("[BOT]:") +
               chalk.red(` ❌ Error executing prefix command ${commandName}:`),
                   error
                      );
            message.reply('There was an error while executing this command!');
        }
    }
};
