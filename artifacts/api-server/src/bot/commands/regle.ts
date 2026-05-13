import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../types.js";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("regle")
    .setDescription("Affiche le règlement du serveur"),

  async execute(interaction) {
    await interaction.reply(
      "# 📜 **RÈGLEMENT DU SERVEUR**\n\n" +
      "• ❌ Ne pas insulter les membres\n" +
      "• 🚫 Pas de pub dans les autres salons sauf ici : https://discord.com/channels/1417853261465260116/1478057285774475509\n" +
      "• 🚫 Pas de spam quand les autres sont déconnectés\n" +
      "• ⚠️ Pas de contenu *bizarre*\n" +
      "• 🇫🇷 Ne pas parler anglais ici : https://discord.com/channels/1417853261465260116/1417853263197503529\n" +
      "• 🇬🇧 Ne pas parler français ici : https://discord.com/channels/1417853261465260116/1417853263197503530\n" +
      "• 🎮 Poster des images/vidéos de jeux dans les bons salons\n" +
      "• 📌 Sinon utiliser : https://discord.com/channels/1417853261465260116/1477765737744695377\n" +
      "• 📣 Écouter les annonces (obligatoire ou pas)\n\n" +
      "😄 <:umour:1422268986476990555>"
    );
  },
};
