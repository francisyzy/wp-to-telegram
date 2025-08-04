# wp-to-telegram

Scrapes a WP site (currently configured to the second image of the site) and posts it into a telegram channel. Would've used RSS but the site isn't built properly and the feed does not work.

Instead of using node cron, I will run it via crontab

`4 10 * * * cd /home/tg/wp-to-telegram && npm run start`
`* * * * * cd /home/tg/wp-to-telegram && npm run start`

## Built with

Telegraf
