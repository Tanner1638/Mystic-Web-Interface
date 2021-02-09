[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b775839b70364ba89233e4848f653ba7)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Tanner1638/Mystic-Web-Interface&amp;utm_campaign=Badge_Grade)
[![Website](https://img.shields.io/badge/website-visit-brightgreen)](https://strangeislandstudios.com)

Stable: Chaos v4.4.0

# Update 4.4.0

### Chaos: Discord Bot
Version 4.4.0

Date: 2/9/2021

## New Features
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


## Fixed Issues
- ...


## Improvements
- Changed say command to include channel specification. Specify a channel to send the bot message to!
- Removed debug logs on messageEvent


### Notes:



### v4.3.0
**New Features**
- Added setPrefix command. Allows server admins to change their guilds prefix inside the Discord Server
- Added updateGuild command. Allows developer to update stored name inside database that bot is in that hasnt been initialized
- Added dashboard command. Replies with an embed with dashboard details.
- Added createEmbed command. Creates an embed.


**Notes:**
- Remove debug conditionals from /simp-bot/src/index.js --> ln: (9:10) & (32:34)
- Remove debug conditionals from /simp-bot/src/events/message/MessageEvent.js --> ln: (14:17) & 33
