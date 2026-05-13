import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Affiche ton profil"),

  async execute(interaction) {
    const user = interaction.user;
    const member = interaction.guild?.members.cache.get(user.id);

    const roles = member?.roles.cache
      .filter((r) => r.name !== "@everyone")
      .map((r) => r.toString()) ?? [];

    const rolesText = roles.length > 0 ? roles.join(" ") : "Aucun rôle";

    const embed = new EmbedBuilder()
      .setTitle(`👤 Profil de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .setColor(0x5865f2)
      .addFields({ name: "🎭 Rôles", value: rolesText, inline: false })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
