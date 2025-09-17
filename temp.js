const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const User = require('../Schemas/userSchema.js');
const cooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('Play blackjack.')
        .addIntegerOption(option => option.setName('amount').setDescription('Enter the amount you want to bet').setRequired(true)),

    async execute(interaction) {
        const userId = interaction.user.id;
        const betAmount = interaction.options.getInteger('amount');

        // Check if bet amount is valid
        if (betAmount <= 0) {
            return interaction.reply({ content: 'Please enter a valid bet amount!', ephemeral: true });
        }

        // Check if user has a profile
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return interaction.reply({ content: 'You need to create a profile first!', ephemeral: true });
        }

        // Check if user has enough balance
        if (user.balance < betAmount) {
            return interaction.reply({ content: 'You do not have enough balance to place this bet!', ephemeral: true });
        }

        // Check for cooldown
        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + 10000; // 10 seconds cooldown
            if (Date.now() < expirationTime) {
                return interaction.reply({ content: 'Please wait before playing again!', ephemeral: true });
            }
        }

        // Set cooldown
        cooldowns.set(userId, Date.now());

        // Blackjack game logic
        const deck = createDeck();
        const playerHand = [drawCard(deck), drawCard(deck)];
        const dealerHand = [drawCard(deck), drawCard(deck)];

        const playerTotal = calculateHand(playerHand);
        const dealerTotal = calculateHand(dealerHand);

        const embed = {
            color: 0x0099ff,
            title: 'Blackjack',
            description: 'Your move!',
            fields: [
                { name: 'Your Hand', value: `${formatHand(playerHand)} (${playerTotal})`, inline: true },
                { name: 'Dealer\'s Hand', value: `${formatHand(dealerHand)} (${dealerTotal})`, inline: true },
                { name: 'Your Balance', value: user.balance.toString(), inline: false }
            ],
            timestamp: new Date(),
        };

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('hit')
                    .setLabel('Hit')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('stand')
                    .setLabel('Stand')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('double')
                    .setLabel('Double Down')
                    .setStyle('Success')
            );

        await interaction.reply({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === userId;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            
    }
};