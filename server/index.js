const app = require('./app');
const cronJob = require('./feed-parser/cronjob');

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

cronJob.job.start();
cronJob.job2.start();