const requestHandler = require('./request-handler');
const express = require('express');

module.exports = (app, express) => {
  app.get('/api', requestHandler.test);
  app.get('/api/feeds', requestHandler.getAllFeeds);
  app.post('/api/feeds', requestHandler.createFeed);
  app.get('/api/feeds/:feedId', requestHandler.getOneFeed);
  app.delete('/api/feeds/:feedId', requestHandler.deleteFeed);
};
