// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../util/structures/BaseEvent');
const GuildConfig = require( '../database/schemas/GuildConfig' );

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  
  async run(client, guild) {
      try {
      const guildConfig = await GuildConfig.create({
        guildId: guild.id,
      });
      console.log(`The ( ${client.user.tag} ) has join to this server( ${guild} ). Saved to DB `);
      let myGuild = client.guilds.cache.get("744507395547332638");
      let memberCountChannel = myGuild.channels.cache.get("744515528105656331");
      memberCountChannel.send(`The ( ${client.user.tag} ) has join to this server( ${guild} )`)
    } catch ( err ) {
    console.log( err );
    }
  }

}