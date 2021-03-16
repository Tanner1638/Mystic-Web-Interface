const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')


const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'user', ['p']);
  }

  async run(client, message, args) {
    const queue = MusicQueue;
    
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) return message.channel.send("You must be in a voice channel to use this command")

    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send("You dont have correct permissions");
    if (!permissions.has('SPEAK')) return message.channel.send("You dont have correct permissions");

    const server_queue = queue.get(message.guild.id);

    // const musicEmbed = new Discord.MessageEmbed()
    // .setColor('bf3f3f')
    // .setTitle('No song playing currently')
    // .setImage('https://wallpaperaccess.com/full/1239485.jpg');
    

    

    
    if (!args.length) return message.channel.send('You need to send the second argument!');
    let song = {};

    //If the first argument is a link. Set the song object to have two keys. Title and URl.
    if (ytdl.validateURL(args[0])) {
      
      const song_info = await ytdl.getInfo(args[0]);
      console.log();
      
      song = {
        title: song_info.videoDetails.title,
        url: song_info.videoDetails.video_url,
        length: song_info.videoDetails.lengthSeconds,
        thumbnail: song_info.videoDetails.thumbnails[song_info.videoDetails.thumbnails.length-1]
      }
    } else {
      //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
      const video_finder = async (query) => {
        const video_result = await ytSearch(query);
        return (video_result.videos.length > 1) ? video_result.videos[0] : null;
      }

      const video = await video_finder(args.join(' '));
      if (video) {
        
        song = {
          title: video.title,
          url: video.url
        }
      } else {
        message.channel.send('Error finding video.');
      }
    }

    //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
    if (!server_queue) {

      const queue_constructor = {
        voice_channel: voice_channel,
        text_channel: message.channel,
        connection: null,
        songs: []
      }

      //Add our key and value pair into the global queue. We then use this to get our server queue.
      queue.set(message.guild.id, queue_constructor);
      queue_constructor.songs.push(song);

      //Establish a connection and play the song with the vide_player function.
      try {
        const connection = await voice_channel.join();
        queue_constructor.connection = connection;
        video_player(message.guild, queue_constructor.songs[0], queue);
      } catch (err) {
        queue.delete(message.guild.id);
        message.channel.send('There was an error connecting!');
        throw err;
      }
    } else {
      server_queue.songs.push(song);
      return message.channel.send(`👍 **${song.title}** added to queue!`);
    }
  }
}
const video_player = async (guild, song, queue) => {
  const song_queue = queue.get(guild.id);
  //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
  if (!song) {
    song_queue.voice_channel.leave();
    queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, {
    filter: 'audioonly'
  });
  song_queue.connection.play(stream, {
      seek: 0,
      volume: 0.5
    })
    .on('finish', () => {
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0], queue);
    });
    //console.log(song)
    const minutes = Math.floor(song.length/60)
    const seconds = song.length%60;
    const time = `${minutes}:${seconds}`
    const numOfQueue = song_queue.songs.length


  // musicEmbed.setTitle(`[${time}] ${song.title}`);
  // musicEmbed.setImage(song.thumbnail['url']);
  // musicEmbed.setFooter(`${numOfQueue} songs in queue`);

  await song_queue.text_channel.send(`:notes: Now playing **${song.title}**`);
}