const Feed = require('./models/feed');
const User = require('./models/user');
const Article = require('./models/article');

//=======API TEST ROUTE=======
exports.test = (req, res) => {
  res.json({message: 'successfully received'});
};

//=======FEED API ROUTES=======
exports.getAllFeeds = (req, res) => {
  console.log('in get all feeds')
  Feed.find(function(err, feeds) {
    if (err) {
      res.send(err);
    }

    console.log(res.json(feeds));
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

//=======USER API ROUTES=======
exports.getAllUsers = (req, res) => {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
};

exports.createUser = (req, res) => {
  var user = new User();      // create a new instance of the user model
  user.username = req.body.username;
  user.password = req.body.password;

  // save the user and check for errors
  user.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 201, message: 'User created!' });
  });
};

exports.getOneUser = (req, res) => {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 200, message: 'User deleted!' });
  });
};

//=======ARTICLE API ROUTES=======
exports.getAllArticles = (req, res) => {
  Article.find(function(err, articles) {
    if (err) {
      res.send(err);
    }

    res.json(articles);
  });
};

exports.createArticle = (req, res) => {
  var article = new Article();      // create a new instance of the article model
  article.url = req.body.url;
  article.datePublished = req.body.datePublished;
  article.feedId = req.body.feedId;

  // save the article and check for errors
  article.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 201, message: 'Article created!' });
  });
};

exports.getOneArticle = (req, res) => {
  Article.findById(req.params.articleId, function(err, article) {
    if (err) {
      res.send(err);
    }

    res.json(article);
  });
};

exports.deleteArticle = (req, res) => {
  Article.remove({
    _id: req.params.articleId
  }, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 200, message: 'Article deleted!' });
  });
};