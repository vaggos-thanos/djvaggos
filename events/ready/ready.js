const BaseEvent = require('../../util/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client, message) {
    //set prefix teporaly
    const PREFIX = '!';
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity(`${PREFIX}help`);
  }
}