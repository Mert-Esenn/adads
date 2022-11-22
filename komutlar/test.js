const Discord = require('discord.js');


exports.run = async(client, message, args) => {

message.channel.send("test");
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['test'],
	permLevel : 0
}
exports.help = {
	name : 'test',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}
//DÜZENLENECEK