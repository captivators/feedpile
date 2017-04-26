const CronJob = require('cron').CronJob;
const urlParser = require('url');
const md5 = require('md5');
const htmlToText = require('html-to-text');

const parse = require('./parser');
const Feed = require('../models/feed');
const Article = require('../models/article');
const User = require('../models/user');

var counter = 0;
var jobRunning = false;

var processFeeds = function () {
  console.log(++counter);
    jobRunning = true;
    console.log('jobRunning start -> ' + jobRunning);

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
          Article.find({}, {}, {lean: true}, function(err, articles) {
            //console.log(JSON.stringify(articles));
            resolve(articles);
          });
        });

        getArticles
          .then(function (articles) {
            //console.log(result.localFeeds);
            return new Promise(function (resolve, reject) {
              var findArticleByUrl = function (urlToFind) {
                for (var i = 0; i < articles.length; i++) {
                  if (articles[i].url == urlToFind) {
                    return articles[i];
                  }
                }

                return null;
              };

              var checkUrl = function (url) {
                 var arr = [ 'jpeg', 'jpg', 'gif', 'png' ];
                 var ext = url.substring(url.lastIndexOf('.') + 1);

                if (arr.indexOf(ext) > -1) {
                  return true;
                }

                return false;
              };

              var getImageUrl = function (text) {
                var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                var url_regex = new RegExp(expression);

                var post_clone = text;
                var urls = post_clone.match(url_regex);

                var result = [];

                if (urls !== null) {
                  urls.forEach(function(item, index) {
                    if (checkUrl(item)) {
                      result.push(item);
                    }
                  });
                }

                return result.length === 0 ? null : result[0];
              };

              var cloneSO = function (obj) {
                // Handle the 3 simple types, and null or undefined
                if (null == obj || 'object' != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                  var copy = new Date();
                  copy.setTime(obj.getTime());
                  return copy;
                }

                // Handle Array
                if (obj instanceof Array) {
                  var copy = [];
                  for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = cloneSO(obj[i]);
                  }
                  return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                  var copy = {};
                  for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = cloneSO(obj[attr]);
                  }
                  return copy;
                }
                throw new Error('Unable to copy obj! Its type isn\'t supported.');
              };

              var compareMD5 = function (oldValue, newValue) {
                return oldValue === newValue;
              };

              var iCounterMax = feedResults.length - 1;
              var jCounterMax = feedResults[iCounterMax].articles.length;

              for (var i = 0; i < feedResults.length; i++) {
                var articlesToInsert = [];
                var j;

                for (j = 0; j < feedResults[i].articles.length; j++) {

                  //old article?
                  if (feedResults[i].articles[j].link) {
                    var currentArticleDB = findArticleByUrl(feedResults[i].articles[j].link);

                    if (currentArticleDB) {
                      //check if values match if not update

                      var updatedArticle = cloneSO(currentArticleDB);

                      //Object.assign(updatedArticle, currentArticleDB);

                      // if (!updatedArticle.imageSrc) {
                      //   console.log('j: ' + j + '\ntitle: ' + updatedArticle.title + ' \nfeedId: ' + updatedArticle.feedId + ' \nid: ' + currentArticleDB._id + '\nimageSrc ' + updatedArticle.imageSrc);
                      // }

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

                      if (updatedArticle.imageSrc) {
                        if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url) {
                          if (!compareMD5(md5(updatedArticle.imageSrc), md5(feedResults[i].articles[j].image.url))) {
                            updatedArticle.imageSrc = feedResults[i].articles[j].image.url;
                            updatedFlag = true;
                            console.log('222');
                          }
                        } else if (feedResults[i].articles[j].enclosures && feedResults[i].articles[j].enclosures[0] && feedResults[i].articles[j].enclosures[0].url && (feedResults[i].articles[j].enclosures[0].type).indexOf('image') > -1) {
                            if (!compareMD5(md5(updatedArticle.imageSrc), md5(feedResults[i].articles[j].enclosures[0].url))) {
                              updatedArticle.imageSrc = feedResults[i].articles[j].enclosures[0].url;
                              updatedFlag = true;
                              console.log('2222');
                            }
                        }
                      } else if (!updatedArticle.imageSrc) {
                        if (feedResults[i].articles[j].enclosures && feedResults[i].articles[j].enclosures[0] && feedResults[i].articles[j].enclosures[0].url && (feedResults[i].articles[j].enclosures[0].type).indexOf('image') > -1) {
                          updatedArticle.imageSrc = feedResults[i].articles[j].enclosures[0].url;
                          updatedFlag = true;
                          console.log('22222');
                        } else {
                          var imageUrl = getImageUrl(feedResults[i].articles[j].description);
                          if (imageUrl != null && typeof imageUrl === 'string') {
                          // console.log('article with id ' + currentArticleDB._id + ' has no image property and feed id ' + localFeeds[i].name)

                            updatedArticle.imageSrc = imageUrl;
                            updatedFlag = true;
                            console.log('222222');
                          }
                        }
                      }

                      // if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url && updatedArticle.imageSrc && !compareMD5(md5(feedResults[i].articles[j].image.url), md5(updatedArticle.imageSrc))) {
                      //   console.log('j: ' + j + '\ntitle: ' + updatedArticle.title + ' \nfeedId: ' + updatedArticle.feedId + ' \nid: ' + currentArticleDB._id + '\nimageSrc ' + updatedArticle.imageSrc);
                      //   updatedArticle.imageSrc = feedResults[i].articles[j].image.url;
                      //   updatedFlag = true;
                      //   console.log('222');
                      // }


                      // //else if no image then use enclosures.url
                      // if (feedResults[i].articles[j].enclosures[0] && feedResults[i].articles[j].enclosures[0].url && (feedResults[i].articles[j].enclosures[0].type).indexOf('image') > -1 && updatedArticle.imageSrc && !compareMD5(md5(feedResults[i].articles[j].enclosures[0].url), md5(updatedArticle.imageSrc))) {
                      //   console.log('j: ' + j + '\ntitle: ' + updatedArticle.title + ' \nfeedId: ' + updatedArticle.feedId + ' \nid: ' + currentArticleDB._id + '\nimageSrc ' + updatedArticle.imageSrc);
                      //   updatedArticle.imageSrc = feedResults[i].articles[j].enclosures[0].url;
                      //   updatedFlag = true;
                      //   console.log('2222');
                      // }

                      // if (!updatedArticle.imageSrc) {
                      //   // console.log('1 ' + updatedArticle['imageSrc'])
                      //   //add image
                      //   var imageUrl = getImageUrl(feedResults[i].articles[j].description);
                      //   if (imageUrl != null && typeof imageUrl === 'string') {
                      //   console.log('article with id ' + currentArticleDB._id + ' has no image property and feed id ' + localFeeds[i].name)

                      //     updatedArticle.imageSrc = imageUrl;
                      //     updatedFlag = true;
                      //     console.log('22222');
                      //   }
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

                      var summaryText = htmlToText.fromString(feedResults[i].articles[j].summary, {
                        ignoreHref: true,
                        ignoreImage: true,
                        uppercaseHeadings: false
                      });

                      //if (feedResults[i].articles[j].summary && feedResults[i].articles[j].summary != updatedArticle.summary) {
                      if (feedResults[i].articles[j].summary && updatedArticle.summary && !compareMD5(md5(summaryText), md5(updatedArticle.summary))) {
                        //updatedArticle.summary = feedResults[i].articles[j].summary;
                        updatedArticle.summary = summaryText;
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

                            console.log('Updated Article: ' + aa);
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
                        // console.log(feedUrl)
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

                      // if (feedResults[i].articles[j].image && feedResults[i].articles[j].image.url) {
                      //   newArticle.imageSrc = feedResults[i].articles[j].image.url;
                      // }

                      // if (feedResults[i].articles[j].enclosures[0] && feedResults[i].articles[j].enclosures[0].url && (feedResults[i].articles[j].enclosures[0].type).indexOf('image') > -1) {
                      //   newArticle.imageSrc = feedResults[i].articles[j].enclosures[0].url;
                      //   // console.log('here 2')
                      // }

                      if (feedResults[i].articles[j].image) {
                        newArticle.imageSrc = feedResults[i].articles[j].image.url;
                      } else if (feedResults[i].articles[j].enclosures && feedResults[i].articles[j].enclosures[0] && feedResults[i].articles[j].enclosures[0].url && (feedResults[i].articles[j].enclosures[0].type).indexOf('image') > -1) {
                        newArticle.imageSrc = feedResults[i].articles[j].enclosures[0].url;
                      } else {
                        var imageUrl = getImageUrl(feedResults[i].articles[j].description);
                        if (imageUrl != null && typeof imageUrl === 'string') {
                          updatedArticle.imageSrc = imageUrl;
                          updatedFlag = true;
                        }
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

                      var summaryText = htmlToText.fromString(feedResults[i].articles[j].summary, {
                        ignoreHref: true,
                        ignoreImage: true,
                        uppercaseHeadings: false
                      });

                      // if (feedResults[i].articles[j].summary) {
                      //   newArticle.summary = feedResults[i].articles[j].summary;
                      // }
                      if (summaryText) {
                        newArticle.summary = summaryText;
                      }

                      if (feedResults[i].articles[j].description) {
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

                if (i === iCounterMax && j === jCounterMax) {
                  resolve('this');
                }
              } //feedResults for loop
            }); //promise
          })
          .then(function (text) {
            console.log('in then -> ' + text);

            //fetch all users
            var users = new Promise(function (resolve, reject) {
              User.find({}, {}, {lean: true}, function(err, users) {
                if (err) {
                  console.log('error getting users');
                }
                resolve(users);
              });
            });

            users
              .then(function (users) {
                console.log('in users');
                return new Promise (function (resolve, reject) {
                  for (var i = 0; i < users.length; i++) {
                    var user = users[i];

                    for (var j = 0; j < user.feeds.length; j++) {
                      var feedId = user.feeds[j].feedId;
                      var articlesToAddForUser = user.feeds[j].articles;

                      //fetch all articles for a particular feedId
                      // articlesUpdateForuser(feedId, articlesToAddForUser, i, j);
                      (function (u, aox, pos, arrArticles, f, rez, lastI, lastJ) {
                        Article.find({feedId: f}).exec()
                        .then(function(result) {
                          return new Promise(function (resolve, reject) {
                            var updated = false;
                            var searchObj = function (arr, id) {
                              for (var c = 0; c < arr.length; c++) {
                                if (arr[c].articleId == id) {
                                  return true;
                                }
                              }

                              return false;
                            };

                            for (var k = 0; k < result.length; k++) {
                              if (!searchObj(arrArticles, result[k]._id)) {
                                //push to array to add for user
                                arrArticles.push({articleId: result[k]._id, readFlag: false});
                                updated = true;
                              }
                            }

                            u.feeds[pos].articles = arrArticles;
                            resolve({u: u, pos: pos, updated: updated});
                          });
                        })
                        .then(function (us) {
                          if (us.updated) {
                            User.findOne({_id: us.u._id}, function (err, u) {
                              if (err) console.log(err);

                              if (u.__v) delete u.__v;

                              for (var cc = 0; cc < u.feeds.length; cc++) {
                                if (u.feeds[cc].feedId == us.u.feeds[pos].feedId) {

                                  u.feeds[cc].articles = us.u.feeds[pos].articles;
                                  u.save(function (err, updated) {
                                    if (err) return console.log(err);
                                    console.log(updated);

                                    if (aox === lastI && pos === lastJ) {
                                      rez(' -> done'); //resolve promise
                                    }
                                  });
                                  break;
                                }
                              }
                            });
                          } else {
                            if (aox === lastI && pos === lastJ) {
                              rez(' -> done'); //resolve promise
                            }
                          }
                        });
                      })(user, i, j, articlesToAddForUser, feedId, resolve, users.length - 1, users[users.length - 1].feeds.length - 1);
                    } //for j users.feeds.length
                  } //for i users.length
                }); //promise

              })  //users .then
              .then(function (ans) {
                return new Promise(function (resolve, reject) {
                  console.log('last ' + ans);

                  jobRunning = false;
                  console.log('jobRunning end -> ' + jobRunning);

                  resolve('done');
                });
              });
          })
          .catch(function (error) {
            console.log('Failed 1: ' + error);
          });
      })
      .catch(function (error) {
        console.log('Failed 2: ' + error);
      });
};


const job = new CronJob({
  cronTime: '0,30 * * * * *',
  onTick: function() {

    //console.log(new Date().getSeconds());
    processFeeds();

  },
  start: false,
  timeZone: 'America/Los_Angeles'
});






var job2 = new CronJob({
  cronTime: '59 * * * * *',
  onTick: function() {
    console.log('delete job just ran');
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

module.exports = {
  job: job,
  job2: job2,
  processFeeds: processFeeds,
  jobRunning: jobRunning
};