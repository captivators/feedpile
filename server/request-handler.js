const Feed = require('./models/feed');

exports.test = (req, res) => {
  res.json({message: 'successfully received'});
};

exports.getAllFeeds = (req, res) => {
  Feed.find(function(err, feeds) {
    if (err) {
      res.send(err);
    }

    res.json(feeds);
  });
};

exports.createFeed = (req, res) => {
  var feed = new Feed();      // create a new instance of the Feed model
  feed.name = req.body.name;
  feed.url = req.body.url;

  // save the feed and check for errors
  feed.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 201, message: 'Feed created!' });
  });
};

exports.getOneFeed = (req, res) => {
  Feed.findById(req.params.feedId, function(err, feed) {
    if (err) {
      res.send(err);
    }

    res.json(feed);
  });
};

exports.deleteFeed = (req, res) => {
  Feed.remove({
    _id: req.params.feedId
  }, function(err, feed) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 200, message: 'Feed deleted!' });
  });
};

