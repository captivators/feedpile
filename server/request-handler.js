const Feed = require('./models/feed');
const User = require('./models/user');
const Article = require('./models/article');
const Category = require('./models/category');


const parse = require('./feed-parser/parser');

//=======API TEST ROUTE=======
exports.test = (req, res) => {

  // const feedUrl1 = 'http://www.techradar.com/rss';
  // const feedUrl2 = 'https://www.cnet.com/rss/news';
  // const feedUrl3 = 'https://www.theregister.co.uk/headlines.atom';
  // const feedUrl4 = 'http://slashdot.org/developers.rdf';
  // const feedUrl5 = 'http://feeds.feedburner.com/TechCrunch';
  const feedUrl6 = 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';


  // var p1 = new Promise((resolve, reject) => {
  //   parse.fetch(feedUrl1, function (err, meta, items) {
  //     if (err) {
  //       throw Error('err');
  //     }

  //     resolve({feed: feedUrl1, meta: meta, articles: items});
  //   });
  // });

  // var p2 = new Promise((resolve, reject) => {
  //   parse.fetch(feedUrl2, function (err, meta, items) {
  //     if (err) {
  //       throw Error('err');
  //     }

  //     resolve({feed: feedUrl2, meta: meta, articles: items});
  //   });
  // });

  // var p3 = new Promise((resolve, reject) => {
  //   parse.fetch(feedUrl3, function (err, meta, items) {
  //     if (err) {
  //       throw Error('err');
  //     }

  //     resolve({feed: feedUrl3, meta: meta, articles: items});
  //   });
  // });

  // var p4 = new Promise((resolve, reject) => {
  //   parse.fetch(feedUrl4, function (err, meta, items) {
  //     if (err) {
  //       throw Error('err');
  //     }

  //     resolve({feed: feedUrl4, meta: meta, articles: items});
  //   });
  // });

  // var p5 = new Promise((resolve, reject) => {
  //   parse.fetch(feedUrl5, function (err, meta, items) {
  //     if (err) {
  //       throw Error('err');
  //     }

  //     resolve({feed: feedUrl5, meta: meta, articles: items});
  //   });
  // });

  var p6 = new Promise((resolve, reject) => {
    parse.fetch(feedUrl6, function (err, meta, items) {
      if (err) {
        throw Error('err');
      }

      resolve({feed: feedUrl6, meta: meta, articles: items});
    });
  });

  // Promise.all([p1, p2, p3, p4, p5, p6]).then(values => {
  Promise.all([p6]).then(values => {
    res.json({message: 'successfully received', answer: values});
  });
};

//=======FEED API ROUTES=======
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
  // feed.name = req.body.name;
  feed.url = req.body.url;

  if (req.body.userId && req.body.categoryId) {
    feed.save(function(err, doc) {
      if (err) {
        res.send(err);
      }

      User.findOne({_id: req.body.userId}, function (err, user) {
        if (err) {
          res.send(err);
        }

        var newUser = user;
        delete newUser._id;

        var obj = {};

        obj.feedId = doc._id;
        obj.categoryId = req.body.categoryId;

        newUser.feeds.push(obj);

        User.update({ _id: user._id },
        { $set: newUser }, function (err, result) {
          if (err) {
            res.send(err);
          }

          res.json({ status: 201, message: 'Feed created (' + doc._id +') and added to user (' + user._id +')'});
        });

      });
      // res.json({ status: 201, message: 'Feed created!' });
    });
  } else {
    // save the feed and check for errors
    feed.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ status: 201, message: 'Feed created!' });
    });
  }
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
  // user.username = req.body.username;
  // user.password = req.body.password;
  user.userId = req.body.userId;

  if (user.userId) {
    // save the user and check for errors
    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ status: 201, message: 'User created!' });
    });
  } else {
    res.json({ status: 400, message: 'UserId missing!' });
  }
};

exports.getOneUser = (req, res) => {
  User.findOne({userId: req.params.userId}, function(err, user) {
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
  //Article.find({}).sort().

  Article.find({}, null, { sort: {date: -1} }, function(err, articles) {
    if (err) {
      res.json({status: 400, message: err});
    }

    res.json(articles);
  });
};

// exports.createArticle = (req, res) => {
//   var article = new Article();      // create a new instance of the article model
//   article.url = req.body.url;
//   article.datePublished = req.body.datePublished;
//   article.feedId = req.body.feedId;

//   // save the article and check for errors
//   article.save(function(err) {
//     if (err) {
//       res.send(err);
//     }

//     res.json({ status: 201, message: 'Article created!' });
//   });
// };

exports.getArticlesByFeedId = (req, res) => {
  if (req.body.feedId) {
    Article.find({feedId: req.body.feedId}, null, { sort: {date: -1} }, function(err, articles) {
      if (err) {
        res.json({status: 400, message: err});
      }

      res.json(articles);
    });
  } else {
    res.json({status: 404, message: 'feedId not provided in body'});
  }
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

//=======CATEGORIES API ROUTES=======
exports.getAllCategories = (req, res) => {
  Category.find(function(err, category) {
    if (err) {
      res.send(err);
    }

    res.json(category);
  });
};

exports.createCategory = (req, res) => {
  var category = new Category();      // create a new instance of the category model
  category.name = req.body.name;

  if (req.body.name) {
    // save the user and check for errors
    category.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ status: 201, message: 'Category created!' });
    });
  } else {
    res.json({ status: 400, message: 'Category name missing!' });
  }
};
