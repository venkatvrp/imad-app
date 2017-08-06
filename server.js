var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOneJson = {
  "data":{    
    "articleOne":{
    "articleName":"ArticleOne",
    "articlePubDate":"06Aug2017",
    "articleContent":"This is the first article One Content"
  },"articleTwo":{
    "articleName":"ArticleTwo",
    "articlePubDate":"07Aug2017",
    "articleContent":"This is the first article Two Content"
  },"articleThree":{
    "articleName":"ArticleThree",
    "articlePubDate":"08Aug2017",
    "articleContent":"This is the first article Three Content"
  }
}
};

var articleHtmlContent = function(jsonData){
  return `<html>
    <h1>${jsonData.articleName}<h1>
    <h2>${jsonData.articlePubDate}</h2>
    <p>${jsonData.articleContent}</p>  
    <a href="/">back</a>
  </html>`
};



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
  res.send(articleHtmlContent(articleOneJson.data[req.params.articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
