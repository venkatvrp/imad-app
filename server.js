var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOneJson = {
  "data": {
    "articleOne": {
      "articleName": "ArticleOne",
      "articlePubDate": "06Aug2017",
      "articleContent": "This is the first article One Content"
    }, "articleTwo": {
      "articleName": "ArticleTwo",
      "articlePubDate": "07Aug2017",
      "articleContent": "This is the first article Two Content"
    }, "articleThree": {
      "articleName": "ArticleThree",
      "articlePubDate": "08Aug2017",
      "articleContent": "This is the first article Three Content"
    }
  }
};

var articleHtmlContent = function (jsonData) {
  return `<html>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/ui/main.js"></script>
    <h1>${jsonData.articleName}<h1>
    <h2>${jsonData.articlePubDate}</h2>
    <p>${jsonData.articleContent}</p>  
    <input id="commentBox" type="textbox"></input>
    <input id="updateComment" type="button" value="Post Comment"></input>
    <p>Comments</p>
    <span id="comments">
      </span>    
    <div><a href="/">back</a></div>
  </html>`
};


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article/:articleName', function (req, res) {
  res.send(articleHtmlContent(articleOneJson.data[req.params.articleName]));
});

app.get('/updatePost', function (req, res) {
  var commentText = req.query.comment;
  console.log('comment:: ' + commentText);
  res.send(commentText);
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8081;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});