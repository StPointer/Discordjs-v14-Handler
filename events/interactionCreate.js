const chalk = require('chalk');

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
          console.log(
            chalk.yellow.bold("[BOT]:") + chalk.white(`⚡ ${interaction.user.tag} used /${interaction.commandName} in ${interaction.guild?.name || 'DM'}`)
          );
            command.execute(interaction, client);
        } catch (error) {
            console.error(
                        chalk.yellow.bold("[BOT]:") +
                         chalk.red(`❌ Error executing command ${interaction.commandName}:`),
                             error
                                );            
            const errorMessage = 'There was an error while executing this command!';
            
            if (interaction.replied || interaction.deferred) {
                interaction.followUp({ content: errorMessage, ephemeral: true });
            } else {
                interaction.reply({ content: errorMessage, ephemeral: true });
            }
        }
    }
};
