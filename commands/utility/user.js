const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get information about a user')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user to get information about')
                .setRequired(false)
        ),
    
    async execute(interaction, client) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        
        const embed = new EmbedBuilder()
            .setTitle(`👤 User Information: ${user.tag}`)
            .setColor('#0099ff')
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: '🆔 User ID', value: user.id, inline: true },
                { name: '📅 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
                { name: '🤖 Bot', value: user.bot ? 'Yes' : 'No', inline: true }
            );
        
        if (member) {
            embed.addFields(
                { name: '📥 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
                { name: '🎭 Nickname', value: member.nickname || 'None', inline: true },
                { name: '🏷️ Roles', value: member.roles.cache.filter(role => role.id !== interaction.guild.id).map(role => role.toString()).join(', ') || 'None', inline: false }
            );
        }
        
        await interaction.reply({ embeds: [embed] });
    }
};