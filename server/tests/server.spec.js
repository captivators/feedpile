var request = require('request');
var expect = require('chai').expect;
var user = {userId: '12345', url: "http://www.reddit.com/.rss", categoryName: 'some news outlet'};

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
            url: "http://www.reddit.com/.rss",
            userId: "12345",
            categoryId: "58fa4fde51f58c9b7dc8b146",
          },
        }
        request(feedData, (error, response, body) => {
          user.feedId = body.message.slice(14, 38).trim();
          done();
        })
      })
    })
  })

  describe('FEED API ROUTES', () => {

    it ('should get one specific feed', (done) => {
      request('http://127.0.0.1:8080/api/feeds/' + user.feedId, (error, response, body) => {
        var feed = JSON.parse(body);
        expect(feed.url).to.equal("http://www.reddit.com/.rss")
        done();
      })
    })
    it('should delete a feed', (done) => {
      var requestParams = {
        method: 'DELETE',
          uri: 'http://127.0.0.1:8080/api/feeds/' + user.feedId,
          json: {
            url: "http://www.reddit.com/.rss",
            userId: "12345",
            categoryId: "58fa4fde51f58c9b7dc8b146",
          },
      }
      request(requestParams, (error, response, body) => {
        request('http://127.0.0.1:8080/api/feeds/', (error, response, body) => {
          var feeds = JSON.parse(body);
          var found = feeds.find((feed) => {
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


  //   it('should fetch one user', (done) => {
  //     request('http://127.0.0.1:8080/api/users/' + user.userId, (error, response, body) => {
  //       var u = JSON.parse(body)
  //       console.log('line 96', user._id + ' vs ' + u._id);
  //       expect(u._id).to.equal(user._id);
  //       done();
  //     })
  //   })
  // })
// });
    it('should create a new user', (done) => {
      request('http://127.0.0.1:8080/api/users/', (error, response, body) => {
        var users = JSON.parse(body);

        var addedUser = users.find((u) => {
          return u.userId === user.userId;
        }).userId;

        expect(addedUser).to.equal('12345');
        done();
      })
    })

    it('should delete a user', (done) => {
      const requestParams = {
        method: 'DELETE',
        uri: 'http://127.0.0.1:8080/api/users/' + user._id,
      }

      request(requestParams, (error, response, body) => {
        var body = JSON.parse(body)
        var deleteMessage = body.message;
        expect(deleteMessage).to.equal('User deleted!')
        done();
      })
    })
  })


//  it('should send back parsable stringified JSON', function(done) {
//    request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
//      expect(JSON.parse.bind(this, body)).to.not.throw();
//      done();
//    });
//  });

//  it('should send back an array', function(done) {
//    request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
//     console.log('sauce')
//      var parsedBody = JSON.parse(body);
//      expect(parsedBody).to.be.instanceof(Array);
//      done();
//    });
//  });

//  it('should create a new feed', function(done) {
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:8080/api/feeds',
//       json: {
//         url: 'http://feeds.bbci.co.uk/news/rss.xml',
//         userId: '12345',
//         categoryId: '58fa4fde51f58c9b7dc8b146',
//       },
//     };

//    request(requestParams, function(error, response, body) {
//     console.log('response.statusCode', response.statusCode)
//      expect(response.statusCode).to.equal(200);
//      done();
//    });
//  });

//  it('should respond with feeds that were previously posted', function(done) {
//      request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
//        var feeds = JSON.parse(body);
//        expect(feeds[1].name).to.equal('BBC News - Home');
//        done();
//      });
//    });
//  });

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
       console.log(parsedBody);
       expect(parsedBody).to.be.instanceof(Array);
       done();
     });
    });
  })
})

// // after, delete the username, feed, and category