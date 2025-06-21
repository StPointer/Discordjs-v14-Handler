const chalk = require('chalk');

module.exports = {
    name: 'guildDelete',
    execute(guild, client) {
        console.log(
          chalk.yellow.bold("[BOT]:") + chalk.white(`👋 Left guild: ${guild.name} (${guild.id})`)
        );
    }
};
