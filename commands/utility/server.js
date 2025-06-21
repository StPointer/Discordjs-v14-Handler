const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get information about the server'),
    
    async execute(interaction, client) {
        const guild = interaction.guild;
        
        const embed = new EmbedBuilder()
            .setTitle(`🏰 Server Information: ${guild.name}`)
            .setColor('#0099ff')
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: '🆔 Server ID', value: guild.id, inline: true },
                { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
                { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
                { name: '💬 Channels', value: guild.channels.cache.size.toString(), inline: true },
                { name: '🎭 Roles', value: guild.roles.cache.size.toString(), inline: true },
                { name: '😀 Emojis', value: guild.emojis.cache.size.toString(), inline: true },
                { name: '🔒 Verification Level', value: guild.verificationLevel.toString(), inline: true },
                { name: '📊 Boost Level', value: `Level ${guild.premiumTier}`, inline: true }
            )
            .setTimestamp();
        
        if (guild.description) {
            embed.setDescription(guild.description);
        }
        
        await interaction.reply({ embeds: [embed] });
    }
};
