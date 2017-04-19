const requestHandler = require('./request-handler');
const express = require('express');

module.exports = (app, express) => {
  //test api route
  app.get('/api', requestHandler.test);

  //feed api routes
  app.get('/api/feeds', requestHandler.getAllFeeds);
  app.post('/api/feeds', requestHandler.createFeed);
  app.get('/api/feeds/:feedId', requestHandler.getOneFeed);
  app.delete('/api/feeds/:feedId', requestHandler.deleteFeed);

  //user api routes
  app.get('/api/users', requestHandler.getAllUsers);
  app.post('/api/users', requestHandler.createUser);
  app.get('/api/users/:userId', requestHandler.getOneUser);
  app.delete('/api/users/:userId', requestHandler.deleteUser);

  //article api routes
  app.get('/api/articles', requestHandler.getAllArticles);
  // app.post('/api/articles', requestHandler.createArticle);
  app.post('/api/articles', requestHandler.getArticlesByFeedId);
  app.get('/api/articles/:articleId', requestHandler.getOneArticle);
  app.delete('/api/articles/:articleId', requestHandler.deleteArticle);

  //category api routes
  app.get('/api/categories', requestHandler.getAllCategories);
  app.post('/api/categories', requestHandler.createCategory);
};
