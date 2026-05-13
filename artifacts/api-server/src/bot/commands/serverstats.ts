import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("serverstats")
    .setDescription("Infos du serveur"),

  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) {
      await interaction.reply({ content: "❌ Cette commande doit être utilisée dans un serveur.", ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("📊 Statistiques du serveur")
      .setColor(0x57f287)
      .addFields(
        { name: "👥 Membres", value: guild.memberCount.toString(), inline: true },
        { name: "💬 Salons", value: guild.channels.cache.size.toString(), inline: true },
        { name: "🆔 ID", value: guild.id, inline: false },
      )
      .setTimestamp();

    if (guild.icon) {
      embed.setThumbnail(guild.iconURL({ size: 256 }));
    }

    await interaction.reply({ embeds: [embed] });
  },
};
