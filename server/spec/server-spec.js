var request = require('request');
var expect = require('chai').expect;

describe('ROUTES', function() {
 it('should respond to GET requests for /api/feeds with a 200 status code', function(done) {
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

 it('should send back an object', function(done) {
   request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
     var parsedBody = JSON.parse(body);
     expect(parsedBody).to.be.an('object');
     done();
   });
 });

 it('should send an object containing a `results` array', function(done) {
   request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
     var parsedBody = JSON.parse(body);
     expect(parsedBody).to.be.an('object');
     expect(parsedBody.results).to.be.an('array');
     done();
   });
 });

 it('should accept POST requests to /api/feeds', function(done) {
   var requestParams = {method: 'POST',
     uri: 'http://127.0.0.1:8080/api/feeds',
     json: {
       name: 'Pitchfork',
       url: 'http://pitchfork.com/rss/news/'}
   };

   request(requestParams, function(error, response, body) {
     expect(response.statusCode).to.equal(201);
     done();
   });
 });

 it('should respond with feeds that were previously posted', function(done) {
   var requestParams = {method: 'POST',
     uri: 'http://127.0.0.1:8080/api/feeds',
     json: {
       name: 'Pitchfork',
       url: 'http://pitchfork.com/rss/news/'}
   };

   request(requestParams, function(error, response, body) {
     // Now if we request the log, that message we posted should be there:
     request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
       var feed = JSON.parse(body).results;
       expect(feeds[0].name).to.equal('Pitchfork');
       done();
     });
   });
 });

 it('Should 404 when asked for a nonexistent endpoint', function(done) {
   request('http://127.0.0.1:8080/skoopidiboopbop', function(error, response, body) {
     expect(response.statusCode).to.equal(404);
     done();
   });
 });

 it('Should get individual feeds when selected', function(done) {
   var requestParams = {method: 'POST',
     uri: 'http://127.0.0.1:8080/api/feeds/:' /* what do we use for feedId here?*/,
     json: {
       name: 'Pitchfork',
       url: 'http://pitchfork.com/rss/news/'}
   };

   request(requestParams, function(error, response, body) {
     expect(response.statusCode).to.equal(201);
     done();
   });
 });


});