# Discord Bot

A Discord bot with slash commands for utility, fun, and moderation.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — start the API server + Discord bot
- `pnpm run typecheck` — full typecheck across all packages
- Required secrets: `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Discord: discord.js v14 (slash commands)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/api-server/src/bot/` — all Discord bot code
- `artifacts/api-server/src/bot/commands/` — individual slash commands
- `artifacts/api-server/src/bot/index.ts` — bot client, event handlers, command deploy

## Slash Commands

| Command | Description |
|---|---|
| `/ping` | Check bot latency |
| `/help` | List all commands |
| `/userinfo [user]` | Show user info |
| `/serverinfo` | Show server info |
| `/roll <dice>` | Roll dice (e.g. `2d6`) |
| `/eightball <question>` | Magic 8-ball |
| `/clear <amount>` | Delete messages (mod only) |
| `/kick <user> [reason]` | Kick a member (mod only) |
| `/ban <user> [reason]` | Ban a member (mod only) |

## Architecture decisions

- Bot starts alongside the Express server in `index.ts` — single process for both
- Slash commands are always deployed globally on startup (idempotent PUT to Discord API)
- Commands are loaded statically (not dynamically) for esbuild bundle compatibility
- `GuildMembers` intent is enabled for rich userinfo; enable it in the Discord Dev Portal under Privileged Gateway Intents

## Inviting the bot to your server

Use this URL (replace `CLIENT_ID` with your Application ID):
```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=1099511628870&scope=bot+applications.commands
```

Permissions included: Send Messages, Manage Messages, Kick Members, Ban Members, Read Message History.

## User preferences

_Populate as you build._

## Gotchas

- Slash commands registered globally take up to 1 hour to appear on all servers (guild-specific registration is instant but only works in one server)
- `GuildMembers` privileged intent must be enabled manually in the Discord Developer Portal → Bot → Privileged Gateway Intents
- Messages older than 14 days cannot be bulk-deleted (Discord limitation)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
