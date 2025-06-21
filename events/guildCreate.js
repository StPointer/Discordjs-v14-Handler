const chalk = require('chalk');

module.exports = {
    name: 'guildCreate',
    execute(guild, client) {
        console.log(
  chalk.yellow.bold("[BOT]:") +
    chalk.white(`🎉 Joined new guild: ${guild.name} (${guild.id})`)
);
console.log(
  chalk.yellow.bold("[BOT]:") + chalk.white(`👥 Members: ${guild.memberCount}`)
);
    }
};