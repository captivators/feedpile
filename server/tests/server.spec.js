var request = require('request');
var expect = require('chai').expect;
var blob = {userId: '12345', url: "http://www.reddit.com/.rss"};

// make a user and a category variable to use throughout

describe('FEED API ROUTES: ', function() {

  before((done) => {
    const userData = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        userId: "12345",
      }
    }
    request(userData, (error, response, body) => {
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
        if (error) {console.log('Err', error)}
        blob.feedId = body.message.slice(14, 38).trim();
        done();


      })
    })
  })

  it ('should get one specific feed', (done) => {
    request('http://127.0.0.1:8080/api/feeds/' + blob.feedId, (error, response, body) => {
      var feed = JSON.parse(body);
      console.log('feed', feed)
      expect(feed.url).to.equal("http://www.reddit.com/.rss")
      done();
    })
  })

  it('should delete a feed', (done) => {
    var requestParams = {
      method: 'DELETE',
        uri: 'http://127.0.0.1:8080/api/feeds/' + blob.feedId,
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
          return feed._id === blob.feedId;
        });
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

 it('should send back parsable stringified JSON', function(done) {
   request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
     expect(JSON.parse.bind(this, body)).to.not.throw();
     done();
   });
 });

 it('should send back an array', function(done) {
   request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
    console.log()
     var parsedBody = JSON.parse(body);
     expect(parsedBody).to.be.instanceof(Array);
     done();
   });
 });

 it('should create a new feed', function(done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/feeds',
      json: {
        url: 'http://feeds.bbci.co.uk/news/rss.xml',
        userId: '12345',
        categoryId: '58fa4fde51f58c9b7dc8b146',
      },
    };

   request(requestParams, function(error, response, body) {
     expect(response.statusCode).to.equal(200);
     done();
   });
 });

 it('should respond with feeds that were previously posted', function(done) {
     request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
       var feeds = JSON.parse(body);
       expect(feeds[1].name).to.equal('BBC News - Home');
       done();
     });
   });
 });

  // it('should get one feed', function(done) {
  //   var requestParams = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/feeds',
  //     json: {
  //       url: 'http://feeds.bbci.co.uk/news/rss.xml',
  //       userId: '102628075068490902360',
  //       categoryId: '58fa4fde51f58c9b7dc8b146',
  //     },
  //   };

  //   request(requestParams, function(error, response, body) {
  //     console.log(response)
  //     request('/api/feeds/:58fa4db24bdb4215e798b94b', function(error, response, body) {
  //       console.log(body);
  //       expect(body).to.equal('BBC News - Home');
  //       done();
  //     })
  //   })
  // })

  // it('should delete one feed', function(done) {
  //    var requestParams = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/feeds',
  //     json: {
  //       url: 'http://feeds.bbci.co.uk/news/rss.xml',
  //       userId: '102628075068490902360',
  //       categoryId: '58fa4fde51f58c9b7dc8b146',
  //     },
  //   };
  //   request(requestParams, function(error, response, body) {
  //     request('/api/feeds', )
  //   })

  //   var requestParams = {
  //     method: 'DELETE',
  //     uri: 'http://127.0.0.1:8080/api/58f28e984bdb4215e798a1ca',
  //   };

  //   request(requestParams, function(error, response, body) {
  //     request('/api/feeds/', function(error, response, body) {
  //       var feeds = JSON.parse(body);
  //       var result = feeds.find(function(feed) {
  //         return feed._id === '58f28e984bdb4215e798a1ca';
  //       });
  //       expect(result).to.equal(false);
  //       done();
  //     })
  //   })
  // })

  // it('should add a new user', function(done) {
  //   var requestParams = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/users',
  //     json: {
  //       username: 'Albert_the_Lion',
  //       password: 'rawr123456',
  //     },
  //   };
  //     request(requestParams, function(error, response, body) {
  //       var userId = body.user._id;
  //       request('/api/users/:' + JSON.stringify(userId)), function(error, response, body) {
  //         var userName = JSON.parse(body);
  //         expect(userName).to.equal('Albert_the_Lion');
  //         done();
  //       }
  //     })
  //   });

//   it('should create a new category', function(done) {
//     var categoryName = JSON.stringify(Math.floor(Math.random() * 800));
//     var requestParams = {
//       method: 'POST',
//       uri: 'http://127.0.0.1:8080/api/categories',
//       json: {
//         name: categoryName,
//       }
//     }
//     request(requestParams, function(error, response, body) {
//       request('http://127.0.0.1:8080/api/categories', function(error, response, body) {
//         var parsedBody = JSON.parse(body);
//         var result = false;
//         parsedBody.forEach(function(category) {
//           if (category.name === categoryName) result = true;
//         })
//         expect(result).to.equal(true);
//         done();
//       })

//       })
//     })

//   it('should send back an array', function(done) {
//    request('http://127.0.0.1:8080/api/categories', function(error, response, body) {
//      var parsedBody = JSON.parse(body);
//      console.log(parsedBody);
//      expect(parsedBody).to.be.instanceof(Array);
//      done();
//    });
//   });
// })
// })