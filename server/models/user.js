var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  feeds: [
    {
      feedId: String,
      categoryId: String,
      articles: [
        {
          articleId: String,
          readFlag: Boolean
        }
      ]
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);