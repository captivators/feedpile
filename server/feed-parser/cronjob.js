const CronJob = require('cron').CronJob;
const urlParser = require('url');
const md5 = require('md5');
const parse = require('./parser');
const Feed = require('../models/feed');
const Article = require('../models/article');
const User = require('../models/user');

var counter = 0;

const job = new CronJob({
  cronTime: '0-59/30 * * * * *',
  onTick: function() {
    /*
     * Runs every 5 seconds.
     */

    console.log(++counter);

    var promise = new Promise(function (resolve, reject) {
      Feed.find(function(err, feeds) {
        err ? reject(err) : resolve(feeds);
      });
    });

    promise
      .then(function (feeds) {
        return new Promise(function (resolve, reject) {
          var feedUrls = [];
          var feedPromises = [];

          for (var i = 0; i < feeds.length; i++) {
            if (feeds[i].url) {
              var temp = new Promise((resolve, reject) => {
                var u = feeds[i].url;
                parse.fetch(feeds[i].url, function (err, meta, items) {
                  if (err) {
                    console.log('Error getting Feed from parse.fetch()');
                  }
                  console.log(u);
                  resolve({ meta: meta, articles: items, originalUrl: u });
                });
              });

              //feedUrls.push({ id: feeds[i]._id, url: feeds[i].url});
              feedUrls.push(feeds[i]);
              feedPromises.push(temp);
            } else {
              reject('Error in getting feeds[i].url');
            }
          }

          console.log('Fetched Urls from Feed Collection and created Feed Promises');
          resolve({ urls: feedUrls, promises: feedPromises });
        });
      })
      .then(function (urlAndPromises) {
        return new Promise(function (resolve, reject) {
          Promise.all(urlAndPromises.promises)
            .then(function (results) {
              // console.log(urlAndPromises.urls);
              // console.log(urlAndPromises.promises);

              var compareMD5 = function (oldValue, newValue) {
                return oldValue === newValue;
              };

              for (var i = 0; i < urlAndPromises.urls.length; i++) {
                var currentURLItem = urlAndPromises.urls[i]._doc;
                var currentFeedURLItem = results[i];

                // console.log(currentURLItem);
                // console.log(currentFeedURLItem.meta.title);

                //updating feed info
                //var updatedFeed = JSON.parse(JSON.stringify(currentURLItem));
                var updatedFeed = {};

                Object.assign(updatedFeed, currentURLItem);

                if (updatedFeed._id) delete updatedFeed._id;
                var updatedFlag = false;

                if (currentFeedURLItem.meta && currentFeedURLItem.meta.title && updatedFeed.name && !compareMD5(md5(currentFeedURLItem.meta.title), md5(updatedFeed.name))) {
                  updatedFeed.name = currentFeedURLItem.meta.title;
                  updatedFlag = true;
                } else if (currentFeedURLItem.meta && currentFeedURLItem.meta.title && !updatedFeed.name) {
                  updatedFeed.name = currentFeedURLItem.meta.title;
                  updatedFlag = true;
                }

                if (currentFeedURLItem.meta && currentFeedURLItem.meta.image && currentFeedURLItem.meta.image.url && updatedFeed.imageSrc && !compareMD5(md5(currentFeedURLItem.meta.image.url), md5(updatedFeed.imageSrc))) {
                  updatedFeed.imageSrc = currentFeedURLItem.meta.image.url;
                  updatedFlag = true;
                } else if (currentFeedURLItem.meta && currentFeedURLItem.meta.image && currentFeedURLItem.meta.image.url && !updatedFeed.imageSrc) {
                  updatedFeed.imageSrc = currentFeedURLItem.meta.image.url;
                  updatedFlag = true;
                }

                if (updatedFlag) {
                  Feed.update({ _id: currentURLItem._id },
                  { $set: updatedFeed }, function (err, res) {
                    if (err) {
                      reject('Error in updating Feed By Id:' + currentURLItem._id);
                    }

                    console.log('Updated Feed: ' + updatedFeed.name + ' ' + currentURLItem._id);
                    // console.log(res);
                  });
                }
              } //for loop

              Feed.find(function(err, feeds) {
                console.log('Updated Feeds Collection');
                resolve({ feedResults: results, localFeeds: feeds });
              });
            });
        });
      })
      .then(function (result) {
        // console.log(result.feedResults.length);
        // console.log(result.localFeeds.length);
        var feedResults = result.feedResults;
        var localFeeds = result.localFeeds;

        //get all articles
        var getArticles = new Promise(function (resolve, reject) {
          Article.find(function(err, articles) {
            resolve(articles);
          });
        });

        getArticles
          .then(function (articles) {
            //console.log(result.localFeeds);

            var findArticleByUrl = function (urlToFind) {
              for (var i = 0; i < articles.length; i++) {
                if (articles[i].url === urlToFind) {
                  return articles[i];
                }
              }

              return null;
            };

            var compareMD5 = function (oldValue, newValue) {
              return oldValue === newValue;
            };

            for (var i = 0; i < feedResults.length; i++) {
              var articlesToInsert = [];

              for (var j = 0; j < feedResults[i].articles.length; j++) {

                //old article?
                if (feedResults[i].articles[j].link) {
                  var currentArticleDB = findArticleByUrl(feedResults[i].articles[j].link);

                  if (currentArticleDB) {
                    //check if values match if not update
                    // console.log('title: ' + currentArticleDB.title + ' \nfeedId: ' + currentArticleDB.feedId + ' \nid: ' + currentArticleDB._id);

                    var updatedArticle = {};

                    Object.assign(updatedArticle, currentArticleDB);

                    var updatedFlag = false;

                    if (updatedArticle._id) delete updatedArticle._id;

                    //if (updatedArticle.title != feedResults[i].articles[j].title) {
                    if (updatedArticle.title && feedResults[i].articles[j].title && !compareMD5(md5(updatedArticle.title), md5(feedResults[i].articles[j].title))) {
                      updatedArticle.title = feedResults[i].articles[j].title;
                      updatedFlag = true;
                      // console.log('111');
                    }
                    // else if (feedResults[i].articles[i].title && !updatedArticle.title) {
                    //   updatedArticle.title = feedResults[i].articles[j].title;
                    //   updatedFlag = true;
                    //   console.log('1111 ' + updatedArticle.title);
                    // }

                    //if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url && feedResults[i].articles[j].image.url != updatedArticle.imageSrc) {
                    if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url && updatedArticle.imageSrc && !compareMD5(md5(feedResults[i].articles[j].image.url), md5(updatedArticle.imageSrc))) {
                      updatedArticle.imageSrc = feedResults[i].articles[j].image.url;
                      updatedFlag = true;
                      // console.log('222');
                    }
                    // else if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url && !updatedArticle.imageSrc) {
                    //   updatedArticle.imageSrc = feedResults[i].articles[j].image.url;
                    //   updatedFlag = true;
                    //   console.log('2222');
                    // }

                    //if (feedResults[i].articles[j].date && feedResults[i].articles[j].date != updatedArticle.date) {
                    if (feedResults[i].articles[j].date && updatedArticle.date && !compareMD5(md5(feedResults[i].articles[j].date), md5(updatedArticle.date))) {
                      updatedArticle.date = feedResults[i].articles[j].date;
                      updatedFlag = true;
                      // console.log('333');
                    }
                    // else if (feedResults[i].articles[j].date && !updatedArticle.date) {
                    //   updatedArticle.date = feedResults[i].articles[j].date;
                    //   updatedFlag = true;
                    //   console.log('3333 ' + updatedArticle.date);
                    // }

                    //if (feedResults[i].articles.pubdate && feedResults[i].articles[j].pubdate != updatedArticle.datePublished) {
                    if (feedResults[i].articles[j].pubdate && updatedArticle.datePublished && !compareMD5(md5(feedResults[i].articles[j].pubdate), md5(updatedArticle.datePublished))) {
                      updatedArticle.datePublished = feedResults[i].articles[j].pubdate;
                      updatedFlag = true;
                      // console.log('444');
                    }
                    // else if (feedResults[i].articles[j].pubdate && !updatedArticle.datePublished) {
                    //   updatedArticle.datePublished = feedResults[i].articles[j].pubdate;
                    //   updatedFlag = true;
                    //   console.log('4444 ' + updatedArticle.datePublished);
                    // }

                    //if (feedResults[i].articles[j].author && feedResults[i].articles[j].author != updatedArticle.author) {
                    if (feedResults[i].articles[j].author && updatedArticle.author && !compareMD5(md5(feedResults[i].articles[j].author), md5(updatedArticle.author))) {
                      updatedArticle.author = feedResults[i].articles[j].author;
                      updatedFlag = true;
                      // console.log('555');
                    }
                    // else if (feedResults[i].articles[j].author && !updatedArticle.author) {
                    //   updatedArticle.author = feedResults[i].articles[j].author;
                    //   updatedFlag = true;
                    //   console.log('5555 ' + updatedArticle.author);
                    // }

                    //if (feedResults[i].articles[j].summary && feedResults[i].articles[j].summary != updatedArticle.summary) {
                    if (feedResults[i].articles[j].summary && updatedArticle.summary && !compareMD5(md5(feedResults[i].articles[j].summary), md5(updatedArticle.summary))) {
                      updatedArticle.summary = feedResults[i].articles[j].summary;
                      updatedFlag = true;
                      // console.log('666');
                    }
                    // else if (feedResults[i].articles[j].summary && !updatedArticle.summary) {
                    //   updatedArticle.summary = feedResults[i].articles[j].summary;
                    //   updatedFlag = true;
                    //   console.log('6666 ' + updatedArticle.summary);
                    // }

                    //if (feedResults[i].articles[j].description && feedResults[i].articles[j].description != updatedArticle.description) {
                    if (feedResults[i].articles[j].description && updatedArticle.description && !compareMD5(md5(feedResults[i].articles[j].description), md5(updatedArticle.description))) {
                      updatedArticle.description = feedResults[i].articles[j].description;
                      updatedFlag = true;
                      // console.log('777');
                    }
                    // else if (feedResults[i].articles[j].description && !updatedArticle.description) {
                    //   updatedArticle.description = feedResults[i].articles[j].description;
                    //   updatedFlag = true;
                    //   console.log('7777 ' + updatedArticle.description);
                    // }

                    if (updatedFlag) {
                      (function (aa, bb) {
                        Article.update({ _id: aa },
                        { $set: bb }, function (err, res) {
                          if (err) {
                            reject('Error in updating Feed By Id:' + idToUpdate);
                          }

                          // console.log('Updated Article: ' + aa);
                          // console.log(res);
                        });
                      })(currentArticleDB._id, updatedArticle);
                    }
                  } else {
                    //new article

                    // var ArticleSchema = new Schema({
                    //   title: String,
                    //   url: String,
                    //   imageSrc: String,
                    //   date: Date,
                    //   datePublished: Date,
                    //   feedId: String,
                    //   author: String,
                    //   summary: String,
                    //   description: String
                    // });

                    var searchFeedId = function (feedUrl) {
                      for (var k = 0; k < localFeeds.length; k++) {
                        if (compareMD5(md5(localFeeds[k].url), md5(feedUrl))) {
                        //if (localFeeds[k].name === feedTitle) {
                          return localFeeds[k]._id;
                        }
                      }

                      return null;
                    };

                    var newArticle = {};
                    // console.log(feedResults[i].articles[j]);
                    if (feedResults[i].articles[j].title) {
                      newArticle.title = feedResults[i].articles[j].title;
                    }

                    if (feedResults[i].articles[j].link) {
                      newArticle.url = feedResults[i].articles[j].link;
                    }

                    if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url) {
                      newArticle.imageSrc = feedResults[i].articles[j].image.url;
                    }

                    if (feedResults[i].articles[j].date) {
                      newArticle.date = feedResults[i].articles[j].date;
                    }

                    if (feedResults[i].articles[j].pubdate) {
                      newArticle.datePublished = feedResults[i].articles[j].pubdate;
                    }

                    var tempFeedId = searchFeedId(feedResults[i].originalUrl);
                    if (tempFeedId) {
                      newArticle.feedId = tempFeedId;
                    }

                    if (feedResults[i].articles[j].author) {
                      newArticle.author = feedResults[i].articles[j].author;
                    }

                    if (feedResults[i].articles[j].summary) {
                      newArticle.summary = feedResults[i].articles[j].summary;
                    }

                    if (feedResults[i].articles[j].description[j]) {
                      newArticle.description = feedResults[i].articles[j].description;
                    }

                    // console.log(JSON.stringify(newArticle));
                    articlesToInsert.push(newArticle);
                  } //else statement for if valid link but new article
                }
              }

              if (articlesToInsert.length > 0) {
                console.log('articlesToInsertLength = ' + articlesToInsert.length);

                Article.insertMany(articlesToInsert, function (err, docs) {
                  if (err) {
                    console.log('Error inserting Many articles');
                  }
                  // console.log(docs);
                  console.log('Successfully inserted articles');
                });
              } //feedResults[i].articles for loop
            } //feedResults for loop
          });
      })
      .catch(function (error) {
        console.log('Failed: ' + error);
      });

  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

module.exports = job;