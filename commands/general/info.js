const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows bot information'),
    
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('🤖 Bot Information')
            .setColor('#0099ff')
            .addFields(
                { name: '📊 Guilds', value: client.guilds.cache.size.toString(), inline: true },
                { name: '👥 Users', value: client.users.cache.size.toString(), inline: true },
                { name: '⚡ Commands', value: client.commands.size.toString(), inline: true },
                { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
                { name: '⏰ Uptime', value: formatUptime(client.uptime), inline: true },
                { name: '🔧 Node.js', value: process.version, inline: true }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Made with Discord.js v14' });
        
        await interaction.reply({ embeds: [embed] });
    }
};

function formatUptime(uptime) {
    const days = Math.floor(uptime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((uptime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((uptime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((uptime % (60 * 1000)) / 1000);
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}