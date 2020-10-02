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

      // when the bor join a server send this message to the console
      console.log(`The ( ${client.user.tag} ) has join to this server( ${guild} ) [ ${guild.id} ] with this owner [ ${guild.owner} ]. Saved to DB `);

      // when the bot join a server send this message to the bot's server (djvaggos)
      let myGuild = client.guilds.cache.get("744507395547332638");
      let memberCountChannel = myGuild.channels.cache.get("744515528105656331");
      memberCountChannel.send(`The ( ${client.user.tag} ) has join to this server( ${guild} ) [ ${guild.id} ] with this owner [ ${guild.owner} ]`)

      //send a message an then create an invete link


      guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])).first().send(`thanks for adding me`)
      //var channel2 = guild.channels.cache.filter(c => c.type === "text" && c.permissionsFor(client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])).first();
      //const discordLINK = 'https://discord.gg/';
      //const memberCountChannel2 = myGuild.channels.cache.get('745620781840466070');
     // channel2.createInvite()
      //.then(invite => memberCountChannel2.send(`The [ ${client.user.tag} ] join to this server here is an invte link [ ${discordLINK + invite.code} ]`))
      //.catch(console.error);

    } catch ( err ) {
    console.log( err );
    }
  }

}
