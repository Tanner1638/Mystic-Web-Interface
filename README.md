[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b775839b70364ba89233e4848f653ba7)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Tanner1638/Mystic-Web-Interface&amp;utm_campaign=Badge_Grade)
[![Website](https://img.shields.io/badge/website-visit-brightgreen)](https://strangeislandstudios.com)

Stable: Chaos v4.4

# Update 4.5.4

### Chaos: Discord Bot
Version 4.5.4
Date: 2/17/2021

## New Features
- Reaction Roles!!
- Create reaction roles
- List reaction roles
- Remove Reaction Role command
- Custom embeds now possible. Able to create embeds given key components are stated within the command. Will add new means of creating custom embeds later.



## Fixed Issues
- Fixed error that occurs when reaction roles list exceeds maximum embed size.


## Improvements
- Added !dashboard to help embeds.
- Migrated reaction roles into GuildConfig collection
- Reaction roles now saves emojis as their toString() form.
- Fixed List Reaction Roles command so now everything goes on one embed
- Reaction roles now automatically delete upon message deletion.
- Added common variable caching for extremely increased efficiency with bot responsiveness.
- Added ability to disable stable bot from remote hosting through command rather than stopping the server when working on the bot.
- Added ability to specify what type of action Reaction Role will perform for assigning roles. (1. react/unreact -> give/remove role || 2. react/unreact -> give but not remove)







# Previous Updates:

## v4.4.0
**New Features**
- Added Listening To command.
- Added Playing command.
- Added Purge command
- Added on inviteCreate Event
- Added on inviteDelete Event
- Added on guildMemberAdd Event
- Added ability to change bots username
- Added ability to change bots avatar
- Added function to save newly created invite links
- Added function to compare and adjust invite link uses value in database
- Added ability to specify a role to assign upon user joining specified invite URL
- Added Watching command to set bot activity to watching
- Added Streaming command to set bot activity to streaming
- Added Competing command to set bot activity to competing
- Added Ping command to view latency stats
- Added permission checks to admin commands
- Added startTyping() and stopTyping() before and after command run to let users know the bot is working.
- Added devhelp command

**Improvements**
- Changed say command to include channel specification. Specify a channel to send the bot message to!
- Removed debug logs on messageEvent
- Fixed help command.


## v4.3.0
**New Features**
- Added setPrefix command. Allows server admins to change their guilds prefix inside the Discord Server
- Added updateGuild command. Allows developer to update stored name inside database that bot is in that hasnt been initialized
- Added dashboard command. Replies with an embed with dashboard details.
- Added createEmbed command. Creates an embed.


**Notes:**
- Remove debug conditionals from /simp-bot/src/index.js --> ln: (9:10) & (32:34)
- Remove debug conditionals from /simp-bot/src/events/message/MessageEvent.js --> ln: (14:17) & 33
