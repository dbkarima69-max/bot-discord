import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  type ChatInputCommandInteraction,
} from "discord.js";
import { logger } from "../lib/logger.js";
import type { Command } from "./types.js";
import { setupAutoMod } from "./automod.js";

import { command as icon } from "./commands/icon.js";
import { command as regle } from "./commands/regle.js";
import { command as profil } from "./commands/profil.js";
import { command as serverstats } from "./commands/serverstats.js";
import { command as ppc } from "./commands/ppc.js";
import { command as warn } from "./commands/warn.js";
import { command as role } from "./commands/role.js";

const ALL_COMMANDS: Command[] = [
  icon,
  regle,
  profil,
  serverstats,
  ppc,
  warn,
  role,
];

async function deployCommands(token: string, clientId: string): Promise<void> {
  const rest = new REST().setToken(token);
  const body = ALL_COMMANDS.map((c) => c.data.toJSON());
  await rest.put(Routes.applicationCommands(clientId), { body });
  logger.info({ count: body.length }, "Discord slash commands registered globally");
}

export async function startBot(token: string): Promise<void> {
  const clientId = process.env["DISCORD_CLIENT_ID"];
  if (!clientId) {
    logger.warn("DISCORD_CLIENT_ID not set — skipping slash command registration");
  } else {
    await deployCommands(token, clientId).catch((err) => {
      logger.error({ err }, "Failed to deploy slash commands");
    });
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  setupAutoMod(client);

  const commands = new Collection<string, Command>();
  for (const cmd of ALL_COMMANDS) {
    commands.set(cmd.data.name, cmd);
  }

  client.once(Events.ClientReady, (c) => {
    logger.info({ tag: c.user.tag, guilds: c.guilds.cache.size }, "Discord bot ready");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const cmd = commands.get(interaction.commandName);
    if (!cmd) return;

    try {
      await cmd.execute(interaction as ChatInputCommandInteraction);
    } catch (err) {
      logger.error({ err, command: interaction.commandName }, "Command error");
      const msg = { content: "❌ Une erreur est survenue.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(msg).catch(() => undefined);
      } else {
        await interaction.reply(msg).catch(() => undefined);
      }
    }
  });

  await client.login(token);
}
