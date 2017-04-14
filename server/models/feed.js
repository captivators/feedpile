var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
  name: String,
  url: String,
  imageSrc: String
});

module.exports = mongoose.model('Feed', FeedSchema);