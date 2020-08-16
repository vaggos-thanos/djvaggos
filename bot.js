// set the configuration file
require('dotenv').config();
const { registerCommands, registerEvents } = require('./util/registry');
// set the discord.js lib and the client(bot)
const { Client, Collection } = require('discord.js');
const client = new Client();
//music staff mobules
const { readdirSync } = require("fs");
const { join } = require("path");
//set the PREFIX
// find prefix
//const guildConfig = await GuildConfig.findOne( { guildId: message.guild.id } );
//const PREFIX = guildConfig.get( 'prefix' );
const PREFIX = '!';
client.prefix = PREFIX;
//set the database
//const GuildConfig = require( './database/schemas/GuildConfig' );
const mongoose = require( 'mongoose');
const dburl = process.env.url;
mongoose.connect( dburl , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
(async () => {
    client.events = new Map();
    await registerEvents(client, '../events');
    await client.login(process.env.TOKEN);
})();
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

//music staff

client.commands = new Collection();
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


client.on("warn", (info) => console.log(info));
client.on("error", console.error);


const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});