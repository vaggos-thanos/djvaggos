module.exports = {
    name: "owner",
    description: "test command ",
    execute(message, client) {
        const guild = '728551838554521650';
        message.channel.send(guild.owner); 
    }
};
  