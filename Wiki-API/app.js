const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('article', articleSchema);
// Requests targeting all article

app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all the articles.");
      } else {
        res.send(err);
      }
    });
  });

// requests targeting specific articles.
app.route("/articles/:articleTitle")

  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle},
      function(err) {
        if (!err) {
          res.send("Delete successful");
        } else {
          res.send(err);
        }
    });
  })

  .patch(function(req, res) {
    Article.update({
        title: req.params.articleTitle
      }, {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Update successful.");
        } else {
          res.send(err);
        }
      });
  })

  .put(function(req, res) {
    Article.update({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Update successful");
        } else {
          res.send(err);
        }
      });
  })

  .get(function(req, res) {

    Article.findOne({
        title: req.params.articleTitle
      },
      function(err, foundArticle) {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No article with that name was found.");
        }
      });
  });

app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
