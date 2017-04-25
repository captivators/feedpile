var request = require('request');
var expect = require('chai').expect;
var user = {
  userId: '12345',
  url: "http://feeds.bbci.co.uk/news/rss.xml",
  categoryName: 'some news outlet'
};

// make a user and a category variable to use throughout

describe('API REQUESTS: ', function() {

  before((done) => {

    const userData = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        userId: "12345",
      }
    }
    request(userData, (error, response, body) => {
      request('http://127.0.0.1:8080/api/users/' + user.userId, (error, response, body) => {
        user._id = JSON.parse(body)._id
        const feedData = {
          method: 'POST',
          uri: 'http://127.0.0.1:8080/api/feeds',
          json: {
            url: "http://feeds.bbci.co.uk/news/rss.xml",
            userId: "12345",
            categoryId: "58fa4fde51f58c9b7dc8b146",
          },
        }
        request(feedData, (error, response, body) => {
          user.feedId = body.newObj.feeds[0].feedId;
          console.log('35', response.body)
          const articlesData = {
            method: 'POST',
            uri: 'http://127.0.0.1:8080/api/articles',
            json: {
              feedId: user.feedId,
            }
          }
            done();
          request(articlesData, (error, response, body) => {
            console.log('47', body[0])
            user.articleId = body[0]._id; // []
            console.log('articleId', user.articleId)
          })
        })
      })
    })
  })

  describe('FEED API ROUTES', () => {

    it ('should get one specific feed', (done) => {
      console.log('54', user.feedId)
      request('http://127.0.0.1:8080/api/feeds/' + user.feedId, (error, response, body) => {
        const feed = JSON.parse(body);
    console.log('57', feed)

        expect(feed.url).to.equal("http://feeds.bbci.co.uk/news/rss.xml")
        done();
      })
    })

    it('should delete a feed', (done) => {
      const requestParams = {
        method: 'DELETE',
          uri: 'http://127.0.0.1:8080/api/feeds/' + user.feedId,
          json: {
            url: "http://rss.cnn.com/rss/cnn_world.rss",
            userId: "12345",
            categoryId: "58fa4fde51f58c9b7dc8b146",
          },
      }
      request(requestParams, (error, response, body) => {
        console.log('80', response.body)
        request('http://127.0.0.1:8080/api/feeds/', (error, response, body) => {
          const feeds = JSON.parse(body);
          const found = feeds.find((feed) => {
            return feed._id === user.feedId;
          });
          console.log(found)
          expect(found).to.equal(undefined);
          done();
        })
      })
    })

   it('should get all feeds', function(done) {
     request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
     });
   });
  });

  describe('USER API ROUTES: ', () => {


    it('should fetch one user', (done) => {
      request('http://127.0.0.1:8080/api/users/' + user.userId, (error, response, body) => {
        var u = JSON.parse(body)
        console.log('line 96', user._id + ' vs ' + u._id);
        expect(u._id).to.equal(user._id);
        done();
      })
    })

    it('should create a new user', (done) => {
      request('http://127.0.0.1:8080/api/users/', (error, response, body) => {
        const users = JSON.parse(body);

        const addedUser = users.find((u) => {
          return u.userId === user.userId;
        }).userId;

        expect(addedUser).to.equal('12345');
        done();
      })
    })

    // it('should delete a user', (done) => {
    //   const requestParams = {
    //     method: 'DELETE',
    //     uri: 'http://127.0.0.1:8080/api/users/' + user._id,
    //   }

    //   request(requestParams, (error, response, body) => {
    //     body = JSON.parse(body)
    //     const deleteMessage = body.message;
    //     expect(deleteMessage).to.equal('User deleted!')
    //     done();
    //   })
    // })
  })

  describe('CATEGORY API ROUTES', () => {

    it('should create a new category', function(done) {
      var requestParams = {
        method: 'POST',
        uri: 'http://127.0.0.1:8080/api/categories',
        json: {
          name: user.categoryName,
        }
      }
      request(requestParams, function(error, response, body) {
        request('http://127.0.0.1:8080/api/categories', function(error, response, body) {
          var parsedBody = JSON.parse(body);
          var result = false;
          parsedBody.forEach(function(category) {
            if (category.name === user.categoryName) { result = true; }
          })
          expect(result).to.equal(true);
          done();
        })
      })
    })


    it('should send back an array of categories', function(done) {
     request('http://127.0.0.1:8080/api/categories', function(error, response, body) {
       var parsedBody = JSON.parse(body);
       expect(parsedBody).to.be.instanceof(Array);
       done();
     });
    });
  })

  describe('ARTICLE API ROUTES', () => {
    it('should get articles by feed id', (done) => {
      const requestParams = {
        method: 'POST',
        uri: 'http://127.0.0.1:8080/api/articles',
        json: {
          feedId: user.feedId,
        }
      }
      request(requestParams, (error, response, body) => {
        var articles = body;
        // console.log('181', articles)
        console.log('articles.length ------>', articles.length)
        expect(articles.length).to.be.above(0);
        done();
      })
    })

    it('should get one article', (done) => {
      console.log('186', user.articleId)
      request('http://127.0.0.1:8080/api/articles/' + user.articleId, (error, response, body) => {
        console.log('187', JSON.parse(body));
        const article = JSON.parse(body);
        expect(article).to.contain.any.keys("title");
        done();
      })
    })

  it('should delete one article', (done) => {
    const requestParams = {
      method: 'DELETE',
      uri: 'http://127.0.0.1:8080/api/articles/' + user.articleId,
    }
    request(requestParams, (error, response, body) => {
      console.log('197', body);
      done();
    })
  })
  })
// after, delete the username, feed, and category
});