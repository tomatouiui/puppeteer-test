var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://toma:toma123@ds163382.mlab.com:63382/tomamango";
var bodyParser = require('body-parser');

var watson = require('watson-developer-cloud');

var assistant = new watson.AssistantV1({
  iam_apikey: 'NE6yWK7JBIoWoiNxWTkTnKIBhPL8_HDSranpWax9veyd',
  version: '2019-03-15',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// create an initial variable
let dbClient;
let collection;
// assign the client from MongoClient
MongoClient
    .connect(url, { useNewUrlParser: true, poolSize: 10 })
    .then(client => {
        db = client.db('tomamango');
        dbClient = client;
        collection = db.collection('site');
    })
    .catch(error => console.error(error));
// listen for the signal interruption (ctrl-c)
process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});

var app = express();

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //res.send('Hello World');
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
})

app.get('/contact', function(req, res) {
    console.log(req.query);
    res.render('contact', { qs: req.query });
})

app.get('/profile/:name', function(req, res) {
    var data = { age: 20, job: 'coder', hobbies: ['apple', 'tomato', 'bananer'] };
    //res.render('profile', {person: req.params.name, info:data})

    collection.find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        //console.log(result);
        res.render('profile', { person: req.params.name, info: data, result: result })
    });
})

app.post('/api/:name', urlencodedParser, function(req, res) {
    if(req.params.name == 'chat'){
        //console.log(req.body)
        assistant.message({
            workspace_id: '46d91600-3bbf-40b0-9d08-507a0a9e1fe6',
            input: {'text': req.body.msg}
        },  function(err, response) {
            if (err)
            console.log('error:', err);
            else
            //console.log(JSON.stringify(response, null, 2));
            res.send(response);
        });
        //res.send('ok')
    }else if(req.params.name == 'getdb'){
        collection.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            //console.log(result);
            res.send(result)
        });
    }
})

app.post('/process_post', urlencodedParser, (req, res) => {
    var restt = {
        "name": req.body.name,
        "url": req.body.url,
        "type": req.body.type
    };
    collection.insertOne(restt, function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send('ok');
    });
});

app.get('/test', function(req, res) {
    res.render('test');
})

app.get('/watsonchat', function(req, res) {
    console.log(req.query);
    res.render('watsonchat', { qs: req.query });
})

var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})