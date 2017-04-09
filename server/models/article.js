var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  url: String,
  datePublished: Date,
  feedId: String
});

module.exports = mongoose.model('Article', ArticleSchema);