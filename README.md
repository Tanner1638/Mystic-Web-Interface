[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b775839b70364ba89233e4848f653ba7)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Tanner1638/Mystic-Web-Interface&amp;utm_campaign=Badge_Grade)
[![Website](https://img.shields.io/badge/website-visit-brightgreen)](https://strangeislandstudios.com)

# Mystics Discord Bot W/ Web Interface

_Wiki Updated: 1/21/2021_

_Bot Version of Wiki Update: 2.0.0_

### NOTE: README.md Info Is NOT Up To Date!

**Updates & Patch posts: [View Post](https://strangeislandstudios.com/mystics-simp-bot)**

# Table Of Contents
* About
* Current Features
  * Known Issues
* [Commands](https://github.com/Tanner1638/MysticsSimpBot/wiki/Bot-Commands)
  * Music Player
  * User Commands
  * Admin Commands
  * Bot Dev Commands
* Changes
* Current Features
* Future Features
* Potential Features
* Setup

***
![Simp Bot Update v2.0.0](https://img1.wsimg.com/isteam/ip/c7c67010-cae9-48bb-a26b-a232351c12cd/Mystic%20Simp%20Bot%20Update%20v2.0.0.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280)

## About
Mystic's Simp Bot is developed with the purpose to reduce the need for multiple bots. The end goal is to have a bot that will serve to be an all-purpose bot, unlike other bots that focus or specialize in certain features.

***
**Other bots this program will reference off of:**
* **Rythm/Hydra** - Music Bot
  * Type in name of the song and it will search and play the result
  * Type in the link of YouTube or Spotify to play a song
  * Ability to queue songs
  * Operation Controls: Play, Pause, Skip

* **MEE6**
  * Create custom commands
    * Create commands that automatically give and remove roles and messages in channel or DM
  * Welcome message and auto role
    * Take advantage of the welcome message to inform newcomers about your server rules, topic, or ongoing events.
You can also give them roles right after they join or just simply give them a warm welcome!
  * Levels and XP
    * Use leveling system to identify and reward the most active members of the community.
    * Customizable rank card and leaderboard
    * Ability to automatically give roles when certain levels are reached
  * Highly customizable moderation
    * Protect your server from ads, links, swearing, excessive emojis, etc
    * Ability to set up automated actions to help moderate server depending on the number of infractions a user has committed and fine-tune the actions with timers. No more muting, kicking, and unbanning people
  * Setup announcements
    * Set up announcements to notify the server when specified users begin to stream, upload, or post content.
    * Streaming alerts: Twitch and Mixer, upload alerts from YouTube and post alerts for Reddit and Twitter.


***

# Current Features: v2.0.0
* **Music Player**
  * Play YouTube videos through !play command with a valid youtube link or search!.
* **Reaction Roles** - Create & react to emoji to receive specified roles. (see "Known Issues" below)
* **Member Join & Leave Notifications*** - (see "Known Issues" below)
* **Admin Commands**

## Known Issues:
* This version of **Reaction Role** is currently only a static form of the feature. There is no way to create new reaction roles at this moment.
* The bot currently lacks the ability for owners to specify which channel to post these notifications in. The only channel name the bot will accept is "userlogs" This will be updated in future versions.


***

# [Commands](https://github.com/Tanner1638/MysticsSimpBot/wiki/Bot-Commands) - Click for usage details
<details>
<summary>Music Player</summary>
<ul>
<li>play</li>
<li>stop</li>
</ul>
</details>

<details>
<summary>Admin</summary>
<ul>
<li>ping</li>
<li>permissiontest</li>
<li>kick</li>
<li>ban</li>
<li>clear</li>
</ul>
</details>

<details>
<summary>Bot Developer Interactions</summary>
<ul>
<li>embedtest</li>
</ul>
</details>



***


## Future Features
* Custom Commands
* Welcome Message
* Auto Roles
* Levels and XP
* Moderation Features
* Announcements / Notifications - WIP

## Potential Features
* Currency System to allow for exclusive rewards, perks, etc
* Mock stock trading

***

## WIP / Features Needing Tweaking
* **Music Player**
  * After the last ytdl update & discord API update music bot no longer seems to be working. I need to look into this.
  * I would like to be able to extend the music player to accept Spotify songs as well if not other music streaming platforms
* **User Interactions**
  * **Stats command** will be updated to eventually show other nerdy information such as messages sent, voice chat time, longest voice chat session. - Potentially will add the ability for users to calculate their average messages per (day/week/month).
* **Bot Developer Interactions**
  * **Reaction Roles** is WIP. It is currently a local feature that will not work on any other servers.
  * **User joins & leave notifications** cant be dynamically assigned to a given channel through the bot. The only channel it will send "User ${member} has joined" or left is under a channel named "userlog". - This will be updated eventually to allow for admins to specify which channel to send these notifications to.  
  * Personal DM to users on join or leave needs to be configured correctly for use outside of personal server. (Custom join and leave messages per each server)

***

## Setup
* Create a channel named "userlog" to receive notifications of when users join or leave the Discord server.
