var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  articles: [
    {
      articleId: String,
      readFlag: Boolean
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);