import { Events, type Client } from "discord.js";
import { logger } from "../lib/logger.js";

const BAD_WORDS: Record<string, string[]> = {
  fr: ["connard", "fdp", "pute", "enculé", "salope", "batard", "bâtard", "merde"],
  en: ["fuck", "shit", "bitch", "asshole", "nigger", "nigga"],
};

export function setupAutoMod(client: Client): void {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    const found = Object.values(BAD_WORDS)
      .flat()
      .some((word) => content.includes(word));

    if (!found) return;

    try {
      await message.delete();
    } catch {
      logger.warn({ messageId: message.id }, "Impossible de supprimer le message");
      return;
    }

    try {
      await message.author.send(
        "⚠️ Ton message a été supprimé car il contient des mots interdits.\n" +
        "Merci de respecter les règles du serveur 👍",
      );
    } catch {
      // L'utilisateur a peut-être les DMs désactivés
    }

    logger.info({ user: message.author.tag, guild: message.guild?.name }, "Message supprimé (automod)");
  });
}
