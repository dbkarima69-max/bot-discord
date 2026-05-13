import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("icon")
    .setDescription("Affiche l'avatar d'un utilisateur")
    .addUserOption((opt) =>
      opt
        .setName("utilisateur")
        .setDescription("L'utilisateur dont tu veux voir l'avatar (toi par défaut)")
        .setRequired(false),
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("utilisateur") ?? interaction.user;
    const avatarUrl = target.displayAvatarURL({ size: 1024, extension: "png" });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Icon de ${target.username}`)
      .setImage(avatarUrl)
      .setColor(0x5865f2)
      .setURL(avatarUrl);

    await interaction.reply({ embeds: [embed] });
  },
};
