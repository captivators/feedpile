const Feed = require('./models/feed');
const User = require('./models/user');
const Article = require('./models/article');
const Category = require('./models/category');

const cronJob = require('./feed-parser/cronjob');

const parse = require('./feed-parser/parser');

//=======API TEST ROUTE=======
exports.test = (req, res) => {

  //const feedUrl1 = 'http://www.techradar.com/rss';
  // const feedUrl2 = 'https://www.cnet.com/rss/news';
  // const feedUrl3 = 'https://www.theregister.co.uk/headlines.atom';
  // const feedUrl4 = 'http://slashdot.org/developers.rdf';
  // const feedUrl5 = 'http://feeds.feedburner.com/TechCrunch';
  // const feedUrl6 = 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
  const feedUrl6 = 'https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU';


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
  var promiseTimeout = function (time, p) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() { resolve(p); }, time);
    });
  };

  if (!req.body.url || !req.body.userId || !req.body.categoryId) {
    res.json({status: 400, message: 'Missing either url, userId, or categoryId.'});
  } else {
    Feed.findOne({url: req.body.url }).exec()
      .then(function (feed) {
        var result = [];
        return User.findOne({userId: req.body.userId}, {}, {lean: true}).exec()
          .then(function (user) {
            return [feed, user];
          });
      })
      .then(function (result) {
        var feed = result[0];
        var user = result[1];

        if (user === null) {
          res.json({status: 404, message: req.body.userId + ' user not found'});
        } else {
          // console.log(JSON.stringify(feed))
          // console.log(JSON.stringify(user))
          if (feed === null) {
            var newFeed = new Feed();
            newFeed.url = req.body.url;

            newFeed.save()
              .then(function (f) {
                console.log(f);
                User.findOneAndUpdate({userId: req.body.userId}, {$push: {feeds: {feedId: f._id, categoryId: req.body.categoryId}}}, {new: true}).exec()
                  .then(function (u) {
                    cronJob.processFeeds();

                    return promiseTimeout(7000, u);
                  })
                  .then(function (u) {
                    //console.log('------- ' + f._id)
                    Feed.findById(f._id).exec()
                      .then(function (updatedFeed) {
                        Article.find({feedId: updatedFeed._id}).exec()
                          .then(function (updatedArticles) {
                            res.json({status: 201, message: 'new feed successfully created and added to user', feedId: updatedFeed._id, feedUrl: updatedFeed.url, feedImageSrc: updatedFeed.imageSrc, feedName: updatedFeed.name, feedArticles: updatedArticles});
                          });
                      });
                  });
              });
          } else {
            console.log(feed._id);

            var searchFeedIdInUserFeeds = function (feedId, u) {
              for (var i = 0; i < u.feeds.length; i++) {
                if (u.feeds[i].feedId == feedId) {
                  return true;
                }
              }

              return false;
            };

            if (searchFeedIdInUserFeeds(feed._id, user)) {
              res.json({status: 409, message: 'feed already exists for user'});
            } else {
              User.findOneAndUpdate({userId: req.body.userId}, {$push: {feeds: {feedId: feed._id, categoryId: req.body.categoryId}}}, {new: true}).exec()
                  .then(function (u) {
                    cronJob.processFeeds();

                    return promiseTimeout(7000, u);
                  })
                  .then(function (u) {
                    //console.log('------- ' + feed._id)
                    Feed.findById(feed._id).exec()
                      .then(function (updatedFeed) {
                        Article.find({feedId: updatedFeed._id}).exec()
                          .then(function (updatedArticles) {
                            res.json({status: 201, message: 'existing feed added successfully to user', feedId: updatedFeed._id, feedUrl: updatedFeed.url, feedImageSrc: updatedFeed.imageSrc, feedName: updatedFeed.name, feedArticles: updatedArticles});
                          });
                      });
                  });
            }
          }
        }
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
  if (req.body.userId) {
    //remove articles for the user.feeds[i].feedId
    User.findOne({userId: req.body.userId}).exec()
      .then(function(user) {
        if (req.params.feedId) {
          if (user === null) {
            res.json({status: 404, message: 'user not found'});
          } else {
            var feedFound = false;

            for (var i = 0; i < user.feeds.length; i++) {
              if (user.feeds[i].feedId == req.params.feedId) {
                console.log(`feedId of feed to be delete: ${req.params.feedId}`)
                feedFound = true;
                user.feeds.splice(i, 1);
                break;
              }
            }

            if (feedFound) {
              console.log('feedFound - >' + feedFound);
              user.save()
                .then(function (user) {

                  res.json({status: 200, message: 'feed deleted for user', updatedUser: user});
                });
            } else {
              res.json({status: 404, message: 'feedId not found for user'});
            }
          }
        } else {
          res.json({status: 422, message: 'feedId missing'});
        }
      });
  } else {
    res.json({status: 422, message: 'userId missing'});
  }
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
  if (req.body.userId) {
    User.findOne({userId: req.body.userId}).exec()
      .then(function (user) {
        if (user === null) {
          var newUser = new User();
          newUser.userId = req.body.userId;

          newUser.save().then(function (nuser) {
            res.json({ status: 201, message: 'User created!', user: nuser });
          });
        } else {
          res.json({ status: 409, message: 'userId already exists!', user: user });
        }
      });
  } else {
    res.json({ status: 400, message: 'UserId missing!' });
  }

  // var user = new User();      // create a new instance of the user model
  // // user.username = req.body.username;
  // // user.password = req.body.password;
  // user.userId = req.body.userId;

  // if (user.userId) {
  //   // save the user and check for errors
  //   user.save(function(err) {
  //     if (err) {
  //       res.send(err);
  //     }

  //     res.json({ status: 201, message: 'User created!' });
  //   });
  // } else {
  //   res.json({ status: 400, message: 'UserId missing!' });
  // }
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
    category.save(function(err, c) {
      if (err) {
        res.send(err);
      }

      res.json({ status: 201, message: 'Category created!', newCategory: c });
    });
  } else {
    res.json({ status: 400, message: 'Category name missing!' });
  }
};
