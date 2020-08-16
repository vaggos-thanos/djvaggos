// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../util/structures/BaseEvent');
const GuildConfig = require( '../database/schemas/GuildConfig' );

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }
  
  async run(client, guild) {
      try {
      const guildConfig = await GuildConfig.remove({
        guildId: guild.id,
      });

      // when the bor join a server send this message to the console
      console.log(`The ( ${client.user.tag} ) has left from this server ( ${guild} ). Saved to DB `);

      // when the bor join a server send this message to the bot's server (djvaggos)
      let myGuild = client.guilds.cache.get("744507395547332638");
      let memberCountChannel = myGuild.channels.cache.get("744515528105656331");
      memberCountChannel.send(`The ( ${client.user.tag} )  has left from this server ( ${guild} ) [ ${guild.id} ]`)

    } catch ( err ) {
    console.log( err );
    }
  }

}