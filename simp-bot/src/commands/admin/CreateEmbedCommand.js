const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * replies with a template embed. Will need to be updated later
 * @version 4.2.1
 * TODO@Tanner1638 #37 Edit createEmbed command to be customizable.
 */

module.exports = class CreateEmbedCommand extends BaseCommand {
  constructor() {
    super('createEmbed', 'admin', ["ce"]);
  }

  run(client, message, args) {
    message.channel.bulkDelete(1);

    var color = 'bf3f3f';
    var title;
    var description;
    var footer;
    var image;
    var thumbnail;
    var url;
    

    var msg = message.content.toLowerCase();

    var colorIndex = msg.indexOf("color:");
    var titleIndex = msg.indexOf("title:");
    var descriptionIndex = msg.indexOf("desc:");
    var footerIndex = msg.indexOf("footer:");
    var imageIndex = msg.indexOf('image:');
    var thumbnailIndex = msg.indexOf('thumbnail:');
    var URLIndex = msg.indexOf('url:');


    var indexCollection = {
      'color':colorIndex,
      'title':titleIndex,
      'desc':descriptionIndex,
      'footer':footerIndex,
      'image':imageIndex,
      'thumbnail':thumbnailIndex,
      'url':URLIndex
    }

    
    //console.log(indexCollection);

    
    
    
    // Create items array
    var orderedCollection = Object.keys(indexCollection).map(function(key) {
      return [key, indexCollection[key]];
    });
    
    // Sort the array based on the second element
    orderedCollection.sort(function(first, second) {
      return first[1] - second[1];
    });
    
    // Create a new array with only the first 5 items
    

    const filter = {
      'color': color,
      'title': title,
      'desc': description,
      'footer': footer,
      'image':image,
      'thumbnail':thumbnail,
      'url':url
    }

    orderedCollection.forEach(attribute => {
      if (attribute[1] == -1) {
        orderedCollection = orderedCollection.slice(1);
      }
    })


    for (var i = 0; i < orderedCollection.length; i++){
    
      var name = orderedCollection[i][0];
      var nameIndex = orderedCollection[i][1];
      
      if(i < orderedCollection.length-1) {
        var nextNameIndex = orderedCollection[i+1][1]
        filter[name] = message.content.slice(nameIndex + name.length+1, nextNameIndex).trim();
      }
      
      else{
        filter[name] = message.content.slice(nameIndex + name.length+1).trim();
      }

    }
    

    const customEmbed = new Discord.MessageEmbed();
    

    for( const [key, value] of Object.entries(filter)){
      if(filter[key] != undefined){
        switch(key){
          case 'color':
            //console.log('colorrr');
            customEmbed.setColor(value);
            break;
          case 'title':
            //console.log('titlele');
            customEmbed.setTitle(value);
            break;
          case 'desc':
            //console.log('desccc');
            customEmbed.setDescription(value);
            break;
          case 'footer':
            customEmbed.setFooter(value);
            break;
          case 'image':
            customEmbed.setImage(value);
            break;
          case 'thumbnail':
            customEmbed.setThumbnail(value)
            break;
          case 'url':
            customEmbed.setURL(value);
            break;
          
        }
        
      }
    }


    message.channel.send(customEmbed);



    //console.log(`Color Index: ${colorIndex}\nTitle Index: ${titleIndex}\nDescrip Index: ${descriptionIndex}`);

    //filter['title'] = message.content.slice(titleIndex+6, descriptionIndex).trim();
    //console.log(`TITLE: ${message.content.slice(titleIndex+6, descriptionIndex).trim()}`);

    //filter['description'] = message.content.slice(titleIndex+6, descriptionIndex).trim();
    //console.log(`description: ${message.content.slice(titleIndex+6, descriptionIndex).trim()}`);


    



    // if(filter['color'] != undefined){
    //   console.log(`Color: ${filter['color']}`);
    // }
    // if(filter['title'] != undefined){
    //   console.log(`title: ${filter['title']}`);
    // }
    // if(filter['desc'] != undefined){
    //   console.log(`desc: ${filter['desc']}`);
    // }
    
    

    

    

    

    //embedProcess(message);
  }
}

function embedProcess(message) {
  const info = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setTitle("Send A Custom Embed!")
    .setDescription(`
    Use the corresponding message reactions to complete the embed process!\n
    <:red:810769554481217538> - Enter Title of Embed\n
    <:white:810769554367840288> - Enter Description of Embed\n
    <:black:810769554451726387> - Enter Footer
    `)
    .setImage("url")
    .setThumbnail("url")
    .setTimestamp()
    .setURL("url")
    //.setAuthor("name","iconIMAGEurl", "iconLink")
    

  message.channel.send(info)
    .then(message => {
      message.react('<:red:810769554481217538>')
        .then(() => message.react('<:white:810769554367840288>'))
        .then(() => message.react('<:black:810769554451726387>'));
    });
}
