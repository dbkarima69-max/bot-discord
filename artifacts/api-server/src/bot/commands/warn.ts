import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn un utilisateur")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((opt) =>
      opt
        .setName("utilisateur")
        .setDescription("Utilisateur à warn")
        .setRequired(true),
    )
    .addStringOption((opt) =>
      opt
        .setName("raison")
        .setDescription("Raison du warn")
        .setRequired(false),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("utilisateur", true);
    const reason = interaction.options.getString("raison") ?? "Aucune raison";

    const embed = new EmbedBuilder()
      .setTitle("⚠️ Warn")
      .setColor(0xed4245)
      .addFields(
        { name: "Utilisateur", value: user.toString(), inline: false },
        { name: "Modérateur", value: interaction.user.toString(), inline: false },
        { name: "Raison", value: reason, inline: false },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
