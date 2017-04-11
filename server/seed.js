const data = require('./data.js');
const mongoose = require('mongoose');

// const User = require('./models/users');
const Feed= require('./models/feed')
const Article = require('./models/article')

console.log('in seed.js')
mongoose.connect('mongodb://localhost:27017/feeds')



let seeder = {
  "drop": () => {
    Feed.remove({}, () => {
      console.log('emptied db of feeds');
      Article.remove({}, () => {
        console.log('emptied db of articles')
        seeder.seed();
      });
    })
  },

  "seed": () => {
    console.log( 'seeding' )
    let feeds = data.feeds;
    for ( feed of feeds ) {
      console.log('feed name', feed)
      Feed.create({
        name: feed.name,
        url: feed.url
      }, ( err, doc ) => {
        if ( err ) {
          console.log('err', err);
        } else {
          console.log('added to the db', doc);
          let articles = data.articles;
          for ( article of articles ) {
            if ( article.feedname === doc.name ) {
              Article.create( {
                url: article.article_url,
                datePublished: article.date_written,
                feedId: doc._id }, function(err, doc) {
                    if (err) {
                      console.log('ERR', err)
                    } else {
                      console.log('added article to the db', doc);
                      mongoose.connection.close(function() {
                        console.log('close')
                      });
                    }
                } )
            }

          }
        }
      })
    }
  }
}

seeder.drop();

