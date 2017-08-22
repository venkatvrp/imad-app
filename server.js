var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pgPool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
    host:'db.imad.hasura-app.io',
    user:'venkatvrp',
    password: 'db-venkatvrp-16948',
    database:'venkatvrp',
    port:'5432'
}

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
  return `<html><head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" rel="stylesheet"/>
    <link href="/ui/style.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/ui/main.js"></script>
    </head>
    <body>
    <div class="container-fluid">      
      <span><a class="right" href="/">back</a></span>
      <article>
        <div class="center">
          <span><img src="/ui/madi.png" class="img-medium"/></span>
          <h1>${jsonData.articleName}<h1>
          <h2>${jsonData.articlePubDate}</h2>
          <p>${jsonData.articleContent}</p>      
        </div>
      </article>
      <div class="form-group">        
        <textarea class="form-control comment-box" rows="5" id="commentBox"></textarea>
        <input id="updateComment" type="button" value="Post Comment"></input>
        <p class="bold">Comments</p>
        <div id="comments"></div>    
      </div>
      
    </div>
    </body>
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

var pool = new pgPool(config);
app.get('/test-db', function (req, res) {
  pool.query("Select * from user",function(err,result){
      if(err){
          res.status('500').send(err.toString());
      }else{
          res.status('200').send(JSON.stringify(result.rows));
      }
  });
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

//var port = 8081;
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
