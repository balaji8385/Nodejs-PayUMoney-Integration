var express = require('express'),
    app = express(),
    http = require('http'),
    // port = 8888,
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    KEY = "JBZaLc",
    SALT = "GQs7yium",
    server;

app.set('views',__dirname + '/server/views');
app.set('view engine','ejs');

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//router handler
app.get('/', function(req, res){
    res.render('form');
});

app.post('/fail',function(req,res){
    res.end(JSON.stringify(req.body));
});

app.post('/success',function(req,res){
    res.end(JSON.stringify(req.body));
});
//generate SHA512 key
app.post('/getShaKey',function(req,res){
    console.log("Hash Generated")
    var shasum = crypto.createHash('sha512'),
        reqData = req.body,
        dataSequence = KEY + '|' + reqData.txnid + '|' + reqData.amount + '|' + reqData.productinfo + '|' + reqData.firstname + '|' + reqData.email + '|||||||||||' + SALT,
        resultKey = shasum.update(dataSequence).digest('hex');
        res.end(resultKey);
});
//create server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("DEMO SEVER STARTED - PAYUMONEY");
});