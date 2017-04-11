var CronJob = require('cron').CronJob;

var counter = 0;

var job = new CronJob({
  cronTime: '0-59 * * * * *',
  onTick: function() {
    /*
     * Runs every 5 seconds.
     */

    console.log(++counter);
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

module.exports = job;