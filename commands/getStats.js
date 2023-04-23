const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require("discord.js");
const constants = require('../constants');

var sortMapAndGamemode = function sortMapAndGamemode(a,b) {
  if (a.matches > b.matches)
     return -1;
  if (a.matches < b.matches)
    return 1;
  return 0;
};

var convertPlayTime = function (d) {
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " heures, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
  return hDisplay + mDisplay + sDisplay;
};

var getGeneralEmbeledMessage = function (data) {

  let generalEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle("Statistiques générales de ***" + data.userName + "***")
	.setThumbnail(data.avatar)
	.addFields(
		{ name: 'Ratio V/D', value: data.winPercent, inline: true },
    { name: 'Ratio E/M', value: data.killDeath.toString() + " (ratio infanterie: " + data.infantryKillDeath.toString() + ")", inline: true },
    { name: 'Temps de jeu total', value: convertPlayTime(data.secondsPlayed), inline: true },
		{ name: '\u200B', value: '\u200B' },
    { name: 'Elliminations', value: data.kills.toString(), inline: true },
		{ name: 'Dégâts infligés', value: data.damage.toString(), inline: true },
		{ name: 'Dégâts / min', value: data.damagePerMinute.toString(), inline: true },
    { name: 'Taux de tir à la tête', value: data.headshots, inline: true },
		{ name: 'Parties jouées', value: data.matchesPlayed.toString(), inline: true },
		{ name: 'Eliminations / match', value: data.killsPerMatch.toString(), inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Réanimations', value: data.revives.toString(), inline: true },
		{ name: 'Soins', value: data.heals.toString(), inline: true },
		{ name: 'Ravitaillements', value: data.resupplies.toString(), inline: true },
    { name: 'Réparations', value: data.repairs.toString(), inline: true },
		{ name: 'Véhicules détruits', value: data.vehiclesDestroyed.toString(), inline: true },
		{ name: 'Ennemis repérés', value: data.enemiesSpotted.toString(), inline: true },
	)
	.setFooter({ text: "Développé par Louis HUOT / Alimenté par Gametools Network API"});
  return {embed: generalEmbed};
};

var getOperatorEmbeledMessage = function (data, bestOperator, nickname) {
  var sortOperator = function sortOperator (a, b) {
    if (a.secondsPlayed > b.secondsPlayed)
     return -1;
    if (a.secondsPlayed < b.secondsPlayed)
      return 1;
    return 0;
  };
  const bestOperatorData = data.filter(operator => bestOperator === operator.characterName)[0];
  const bestOperatorPicture = constants.getOperatorsPictures().filter(operatorPicture => bestOperator === operatorPicture.name)[0];
  const operatorDataOrdered = data.sort(sortOperator);
  let embedMessage = new EmbedBuilder();
  let file = null;
  embedMessage.setTitle("Liste des opérateurs de ***" + nickname + "***")
    .setColor("Orange")
    .addFields([
      { name: "Opérateur le plus joué", value: "__" + bestOperator + "__"},
      { name: 'Temps de jeu', value: convertPlayTime(bestOperatorData.secondsPlayed), inline: true },
      { name: 'Eliminations', value: bestOperatorData.kills.toString(), inline: true },
      { name: 'Ratio E/M', value: bestOperatorData.killDeath.toString(), inline: true },
      // { name: '\u200B', value: '\u200B' },
      { name: "2ème opérateur", value: operatorDataOrdered[1].characterName, inline: true },
      { name: "3ème opérateur", value: operatorDataOrdered[2].characterName, inline: true },
      { name: "4ème opérateur", value: operatorDataOrdered[3].characterName, inline: true },
    ])
	  .setFooter({ text: "Développé par Louis HUOT / Alimenté par Gametools Network API"});
  if (bestOperatorPicture.isLocal) {
    file = new AttachmentBuilder(bestOperatorPicture.link);
	  embedMessage.setThumbnail('attachment://' + bestOperatorPicture.fileName);
  } else {
    embedMessage.setThumbnail(bestOperatorPicture.link);
  }
  return {embed: embedMessage, file: file};
};

var getWeaponEmbeledMessage = function (data, nickname) {
  var sortWeapon = function sortWeapon(a,b) {
    if (a.kills > b.kills)
       return -1;
    if (a.kills < b.kills)
      return 1;
    return 0;
  }
  data.sort(sortWeapon);
  const bestWeapon = data[0];
  const secondWeapon = data[1];
  const thirdWeapon = data[2];
  let embedMessage = new EmbedBuilder();
  embedMessage.setTitle("Liste des armes de ***" + nickname + "***")
    .setColor("Red")
    .setThumbnail(bestWeapon.image)
    .addFields([
      { name: "Arme le plus joué", value: "__" + bestWeapon.weaponName + "__"},
      { name: 'Eliminations', value: bestWeapon.kills.toString(), inline: true },
      { name: 'Taux de Headshot', value: bestWeapon.headshots, inline: true },
      { name: 'Dégâts par min', value: bestWeapon.damagePerMinute.toString(), inline: true },
      { name: "2ème arme", value: "__" + secondWeapon.weaponName + "__"},
      { name: 'Eliminations', value: secondWeapon.kills.toString(), inline: true },
      { name: 'Taux de Headshot', value: secondWeapon.headshots, inline: true },
      { name: 'Dégâts par min', value: secondWeapon.damagePerMinute.toString(), inline: true },
      { name: "3ème arme", value: "__" + thirdWeapon.weaponName + "__"},
      { name: 'Eliminations', value: thirdWeapon.kills.toString(), inline: true },
      { name: 'Taux de Headshot', value: thirdWeapon.headshots, inline: true },
      { name: 'Dégâts par min', value: thirdWeapon.damagePerMinute.toString(), inline: true },
    ])
	  .setFooter({ text: "Développé par Louis HUOT / Alimenté par Gametools Network API"});

  return {embed: embedMessage};
};

var getGamemodeEmbeledMessage = function (data, nickname) {
  data.sort(sortMapAndGamemode);
  const bestGamemode = data[0];
  return;
};

var getMapEmbeledMessage = function (data, nickname) {
  data.sort(sortMapAndGamemode);
  const bestMap = data[0];
  const secondMap = data[1];
  const thirdMap = data[2];
  let embedMessage = new EmbedBuilder();
  embedMessage.setTitle("Liste des cartes de ***" + nickname + "***")
    .setColor("Green")
    .setThumbnail(bestMap.image)
    .addFields([
      { name: 'Nom de la carte', value: "__" + bestMap.mapName + "__"},
      { name: 'Nombre de parties', value: bestMap.matches.toString(), inline: true },
      { name: 'Ratio V/D', value: (bestMap.wins * 100 / bestMap.matches).toFixed(2).toString(), inline: true },
      { name: 'Temps de jeu', value: convertPlayTime(bestMap.secondsPlayed), inline: true },

      { name: 'Nom de la carte', value: "__" + secondMap.mapName + "__"},
      { name: 'Nombre de parties', value: secondMap.matches.toString(), inline: true },
      { name: 'Ratio V/D', value: (secondMap.wins * 100 / secondMap.matches).toFixed(2).toString(), inline: true },
      { name: 'Temps de jeu', value: convertPlayTime(secondMap.secondsPlayed), inline: true },

      { name: 'Nom de la carte', value: "__" + thirdMap.mapName + "__"},
      { name: 'Nombre de parties', value: thirdMap.matches.toString(), inline: true },
      { name: 'Ratio V/D', value: (thirdMap.wins * 100 / thirdMap.matches).toFixed(2).toString(), inline: true },
      { name: 'Temps de jeu', value: convertPlayTime(thirdMap.secondsPlayed), inline: true },
    ])
	  .setFooter({ text: "Développé par Louis HUOT / Alimenté par Gametools Network API", url: "https://gametools.network/"});;

  return {embed: embedMessage};
};

var getStats = async function getStats(platform, nickname, statsType, interaction) {
  var response = await fetch(
    "https://api.gametools.network/bf2042/stats/?raw=false&format_values=true&name=" +
      nickname +
      "&platform=" +
      platform
  );
  console.log("URL : " + "https://api.gametools.network/bf2042/stats/?raw=false&format_values=true&name=" + nickname.trim() + "&platform=" + platform.trim());
  var data = await response.json();

  if (!data.errors) {
    var embedList = [];
    var operatorData = data.classes;
    var weaponData = data.weapons;
    var gamemodeData = data.gamemodes;
    var mapData = data.maps;
    let result;
    switch (statsType) {
      case "0" :
        result = getGeneralEmbeledMessage(data);
        break;
      case "1" :
        result = getOperatorEmbeledMessage(operatorData, data.bestClass, nickname);
        break;
      case "2" :
        result = getMapEmbeledMessage(mapData, nickname);
        break;
      case "3" :
        result = getWeaponEmbeledMessage(weaponData, nickname);
        break;
      case "4" :
        result = getGamemodeEmbeledMessage(gamemodeData, nickname);
        break;
      default:
        result = getGeneralEmbeledMessage(data);
    }

    embedList.push(result.embed);


    let reply = {embeds: embedList};
    if (result.file) {
      reply.files = [result.file];
    }
    try {
      interaction.reply(reply);
    } catch (e) {
      console.log("Time Out / erreur de traitement");
    }
  } else {
    interaction.reply(
      "Une erreur est survenue lors du traitement de la demande: " +
        data.errors[0]
    );
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats_bf2042")
    .setDescription(
      "Récupère les statistiques d'un joueur donné sur une platforme donnée"
    )
    .addStringOption((option) =>
      option
        .setName("platforme")
        .setDescription("Platforme du joueur")
        .setRequired(true)
        .addChoices(
          { name: "PC", value: "pc" },
          { name: "PS4", value: "ps4" },
          { name: "PS5", value: "ps5" },
          { name: "Xbox One", value: "xboxone" },
          { name: "Xbox Series", value: "xboxseries" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type de statistiques à afficher")
        .setRequired(true)
        .addChoices(
          { name: "General", value: "0" },
          { name: "Operateurs", value: "1" },
          { name: "Cartes", value: "2" },
          { name: "Armes", value: "3" },
          // { name: "Modes", value: "4" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("pseudo")
        .setDescription("Pseudo du joueur")
        .setRequired(true)
    ),
  async execute(interaction) {
    const platform = interaction.options.getString("platforme");
    const statsType = interaction.options.getString("type");
    const nickname = interaction.options.getString("pseudo");
    return getStats(platform, nickname, statsType, interaction);
  },
};