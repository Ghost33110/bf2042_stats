# Bf2042 Stats

C'est un petit bot Discord que je dévelope sur mon temps libre. Celui-ci permet d'afficher les statistiques d'un joueur donné (quelque soit la platforme). Si celui-ci a mis son profil en privé, seule les dernières informations sur celui-ci seront remontées. Le bot incorpore également une fonctionnalitée de génération d'un ensemble d'équipement + opérateur aléatoire.


## Installation

Le code présent dans le dépôt permet d'exécuter soit même le bot. Il nécessite plusieur choses:  
1. Créer son fichier `config.json` (un exemple du fichier est disponible dans le dépôt - `config_sample.json`).
2. Créer votre bot sur le site de dévelopeur de Discord - [https://discord.com/developers/applications](https://discord.com/developers/applications). Pour plus d'information, consulter la documentation [ici](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
3. Renseigner dans ce fichier dans le champs `token` le numéro de token du bot.
4. Renseigner également dans le champs `clientId` l'id applicatif du bot (dans le portail de dévelopeur Discord, cliquez sur votre bot, puis allez dans "General Information" > application id).
5. Assurez-vous d'avoir Node JS d'installé, et exécutez la commande `npm install`.
6. Pour lancer le bot, exécuter la commande `node index.js`. Pour ajouter les commandes nécessaires sur votre serveur, éditer le fichier `guildData.json` avec l'ID de votre serveur Discord (pour le récupérer, activer le mode dévelopeur puis clic-droit sur le nom du serveur -> "Copier l'identifiant du serveur"), et exécuter la commande `node deploy-commands.js`.


## Usage

Deux commandes sont actuellement disponibles:
- /stats_bf2042
- /2042random

## Contribution

Pour l'instant, les contributions externes au dévelopement du bot ne sont pas possibles.

## Historique

V1.0: intialisation du dépôt - mise en place des premières foncionnalitées

## Credits

- API contactée pour la récupération des stats: [https://api.gametools.network/](https://api.gametools.network/docs#/)
- Framework utilisé: [https://discord.js.org/](https://discord.js.org/)

## License

[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-sa/4.0/)