import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Donner ou retirer un rôle à un membre (admins seulement)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((opt) =>
      opt
        .setName("membre")
        .setDescription("Le membre qui recevra le rôle")
        .setRequired(true),
    )
    .addRoleOption((opt) =>
      opt
        .setName("role")
        .setDescription("Le rôle à donner ou retirer")
        .setRequired(true),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("membre", true);
    const role = interaction.options.getRole("role", true);
    const guild = interaction.guild;

    if (!guild) {
      await interaction.reply({ content: "❌ Cette commande doit être utilisée dans un serveur.", ephemeral: true });
      return;
    }

    const member = await guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      await interaction.reply({ content: "❌ Ce membre est introuvable.", ephemeral: true });
      return;
    }

    const guildRole = guild.roles.cache.get(role.id);
    if (!guildRole) {
      await interaction.reply({ content: "❌ Ce rôle est introuvable.", ephemeral: true });
      return;
    }

    if (!guildRole.editable) {
      await interaction.reply({ content: "❌ Je ne peux pas gérer ce rôle (il est peut-être au-dessus de moi).", ephemeral: true });
      return;
    }

    const hasRole = member.roles.cache.has(guildRole.id);

    if (hasRole) {
      await member.roles.remove(guildRole);
    } else {
      await member.roles.add(guildRole);
    }

    const action = hasRole ? "retiré" : "donné";
    const color = hasRole ? 0xed4245 : 0x57f287;

    const embed = new EmbedBuilder()
      .setTitle(`🎭 Rôle ${action}`)
      .setColor(color)
      .addFields(
        { name: "Membre", value: user.toString(), inline: true },
        { name: "Rôle", value: guildRole.toString(), inline: true },
        { name: "Par", value: interaction.user.toString(), inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
