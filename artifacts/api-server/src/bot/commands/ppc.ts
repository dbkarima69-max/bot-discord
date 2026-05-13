import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../types.js";

const CHOICES = ["pierre", "papier", "ciseaux"] as const;
type Choice = typeof CHOICES[number];

const WINS: Record<Choice, Choice> = {
  pierre: "ciseaux",
  papier: "pierre",
  ciseaux: "papier",
};

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ppc")
    .setDescription("Pierre Papier Ciseaux contre le bot")
    .addStringOption((opt) =>
      opt
        .setName("choix")
        .setDescription("Choisis : pierre, papier ou ciseaux")
        .setRequired(true)
        .addChoices(
          { name: "🪨 Pierre", value: "pierre" },
          { name: "📄 Papier", value: "papier" },
          { name: "✂️ Ciseaux", value: "ciseaux" },
        ),
    ),

  async execute(interaction) {
    const choice = interaction.options.getString("choix", true) as Choice;
    const botChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)]!;

    let result: string;
    if (choice === botChoice) {
      result = "🤝 Égalité !";
    } else if (WINS[choice] === botChoice) {
      result = "🏆 Tu as gagné !";
    } else {
      result = "😈 Le bot a gagné !";
    }

    await interaction.reply(
      `Tu as choisi **${choice}**\n` +
      `Le bot a choisi **${botChoice}**\n\n` +
      result,
    );
  },
};
