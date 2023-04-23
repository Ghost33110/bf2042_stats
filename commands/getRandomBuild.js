const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const dataBF2042 = require('../dataBF2042.json');

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var getGeneralEmbeledMessage = function (operator, primary, sidearm, throwable, gadget) {
  let generalEmbed = new EmbedBuilder()
	.setColor("Gold")
  .setTitle("Equipement aléatoire")
	// .setThumbnail(data.avatar)
	.addFields(
		{ name: 'Spécialiste', value: operator.operatorName, inline: true },
    { name: 'Arme principale', value: primary.weaponName, inline: true },
    { name: 'Arme secondaire', value: sidearm.weaponName, inline: true },
		// { name: '\u200B', value: '\u200B' },
    { name: 'Gadget', value: gadget.gadgetName, inline: true },
		{ name: 'Arme de lancer', value: throwable.throwableName, inline: true }
	)
	.setFooter({ text: "Développé par Louis HUOT"});
  return {embed: generalEmbed};
};

var getRandomBuild = function (interaction) {
  var classe, operator, primary, sidearm, throwable, gadget, result;
  var embedList = [];

  classe = dataBF2042.l_classList[getRandomInt(dataBF2042.q_classList)];
  operator = classe.l_operatorList[getRandomInt(classe.q_operatorList)];

  while (!primary) {
    var dataPrimary = dataBF2042.l_weaponList[getRandomInt(dataBF2042.q_weaponList)];
    // console.log("dataPrimary");
    // console.log(dataPrimary);
    // console.log("---------------------------------------------------");
    if ("Sidearm" !== dataPrimary.type) {
      primary = dataPrimary;
    }
  }

  while (!sidearm) {
    var dataSidearm = dataBF2042.l_weaponList[getRandomInt(dataBF2042.q_weaponList)];
    // console.log("dataSidearm");
    // console.log(dataSidearm);
    // console.log("---------------------------------------------------");
    if ("Sidearm" === dataSidearm.type) {
      sidearm = dataSidearm;
    }
  }

  while (!throwable) {
    var dataThrow = dataBF2042.l_throwableList[getRandomInt(dataBF2042.q_throwableList)];
    // console.log("dataThrow");
    // console.log(dataThrow);
    // console.log("---------------------------------------------------");
    if (classe.l_throwableList.find(element => element === dataThrow.id)) {
      throwable = dataThrow;
    }
  }

  while (!gadget) {
    var dataGadget = dataBF2042.l_gadgetList[getRandomInt(dataBF2042.q_gadgetList)];
    // console.log("dataGadget");
    // console.log(dataGadget);
    // console.log("---------------------------------------------------");
    if (classe.l_classGadgetList.find(element => element === dataGadget.id) && (operator.q_itemBan === 0 || !operator.l_itemBan.find(element => element === dataGadget.id))) {
      gadget = dataGadget
    }
  }

  result = getGeneralEmbeledMessage(operator, primary, sidearm, throwable, gadget);
  embedList.push(result.embed);
  let reply = {embeds: embedList};

  // console.log("reply");
  // console.log(reply);
  // console.log("---------------------------------------------------");

  interaction.reply(reply);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("2042random")
    .setDescription(
      "Défini un ensemble opérateur / équipement aléatoire sur Battlefield 2042"
    ),
  async execute(interaction) {
    return getRandomBuild(interaction);
  },
};