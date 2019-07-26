var express = require('express');

var app = express();

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();
 
var  sql = 'SELECT * FROM like_log';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();

app.get('/', function (req, res) {
   //res.send('Hello World');
   //res.sendFile(__dirname + '/index.html');
   res.render('index');
});

app.get('/contact', function (req, res) {
   console.log(req.query);	
   res.render('contact', {qs:req.query});
});

app.get('/profile/:name',function(req,res){
   var data = {age:20, job:'coder', hobbies:['apple','tomato','bananer']};
   res.render('profile', {person: req.params.name, info:data});
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
 
});