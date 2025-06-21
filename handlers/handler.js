const { glob } = require('glob');
const chalk = require('chalk');

async function loadCommands(client) {
    const commandFiles = await glob('./commands/**/*.js');
    
    console.log(chalk.cyan(`📋 Loading ${commandFiles.length} commands...`));
    
    for (const file of commandFiles) {
        try {
            delete require.cache[require.resolve(`../${file}`)];
            const command = require(`../${file}`);
            
            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
                console.log(chalk.green(`✅ Loaded command: ${command.data.name}`));
            } else {
                console.log(chalk.yellow(`⚠️  Command ${file} is missing required properties`));
            }
        } catch (error) {
            console.error(chalk.red(`❌ Error loading command ${file}:`), error);
        }
    }
}

async function loadEvents(client) {
    const eventFiles = await glob('./events/**/*.js');
    
    console.log(chalk.cyan(`📅 Loading ${eventFiles.length} events...`));
    
    for (const file of eventFiles) {
        try {
            delete require.cache[require.resolve(`../${file}`)];
            const event = require(`../${file}`);
            
            if (event.name && event.execute) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
                console.log(chalk.green(`✅ Loaded event: ${event.name}`));
            } else {
                console.log(chalk.yellow(`⚠️  Event ${file} is missing required properties`));
            }
        } catch (error) {
            console.error(chalk.red(`❌ Error loading event ${file}:`), error);
        }
    }
}

module.exports = { loadCommands, loadEvents };