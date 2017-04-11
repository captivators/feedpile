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

 it('should send back an array', function(done) {
   request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
    console.log()
     var parsedBody = JSON.parse(body);
     expect(parsedBody).to.be.instanceof(Array);
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
     expect(response.statusCode).to.equal(200);
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
     // Now if we request the log, that feed we posted should be there:
     request('http://127.0.0.1:8080/api/feeds', function(error, response, body) {
       var feed = JSON.parse(body);
       console.log(feed)
       expect(feed[1].name).to.equal('Pitchfork');
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

});