var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: {type: String, unique: true, required: true},
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