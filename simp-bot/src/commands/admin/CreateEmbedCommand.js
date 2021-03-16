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

    const info = new Discord.MessageEmbed()
    .setColor('bf3f3f')
    var Permissions = message.member.permissions;
    if(!(message.author.id === "542483559500218389")){
      if(!Permissions.has('EMBED_LINKS')) {
        message.channel.bulkDelete(1);
        info.setTitle('Unauthorized Command.');
        info.setDescription("you dont have permissions to send embed links.")
        message.channel.send(info)
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }
    if(!args[0]){
      info.setTitle('Info - Create Embed');
      info.setDescription(`
      Create a custom embed on the fly!\n
      There are a few attributes you can mention in your message to customize your embed. These attributes are: color, title, description, footer, image, thumbnail, and url. (There will be more added in the future)\n
      **How to use:**\n
      **-createEmbed**
      **title:** Your Wonderful Embed Title
      **desc:** lets include some text for the description of your embed owo this is how!
      **footer:** Amazing footer text will be put here if you want it!
      **image:** https:/YourImageLinkHere
      **thumbnai:** https:YourThumbnailImageLinkHere
      **url:** http:/linkAddress\n
      `);
      info.setFooter("Note: You dont need to include all of these fields listed in the example! If you just want an embed with a title and description, only include title: and desc: (interchangeable with other attributes too!)");
      return message.channel.send(info);
    }
    if(args[0] != "debug"){
      message.channel.bulkDelete(1);
    }
    
    var color = 'bf3f3f';
    var title;
    var description;
    var footer;
    var image;
    var thumbnail;
    var url;
    var deleteOnSend = true;
    

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
      if (attribute[1] === -1) {
        orderedCollection = orderedCollection.slice(1);
      }
    })


    for (var i = 0; i < orderedCollection.length; i++){
    
      var name = orderedCollection[i][0];
      var nameIndex = orderedCollection[i][1];
      
      if(i < orderedCollection.length-1) {
        var nextNameIndex = orderedCollection[i+1][1];
        filter[name] = message.content.slice(nameIndex + name.length+1, nextNameIndex).trim();
      }
      
      else{
        filter[name] = message.content.slice(nameIndex + name.length+1).trim();
      }

    }

    if(filter['desc']){
      var descArgs = filter['desc'].split(/\\n+/);
      var newDesc = "";
      descArgs.forEach(arg => {
        
        newDesc += arg.trim() + `\n`;
      })
      filter['desc'] = newDesc;
      //message.channel.send(newDesc);
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

    /**
     * This function will allow you to edit the embed that was previously sent. This would be useful for any confirmation messages or what not.
     */
    
    // .then(message => {
    //   message.edit(customEmbed.setDescription("HA bet this doesnt work"));
    // })

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
    .setURL("url");
    //.setAuthor("name","iconIMAGEurl", "iconLink")
    

  message.channel.send(info)
    .then(message => {
      message.react('<:red:810769554481217538>')
        .then(() => message.react('<:white:810769554367840288>'))
        .then(() => message.react('<:black:810769554451726387>'));
    });
}
