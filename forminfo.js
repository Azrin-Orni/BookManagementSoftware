var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/info_up', function(req,res){
	var BookName = req.body.bookName;
	var PublisherName =req.body.publisherName;
	var Age = req.body.age;
	var Serial =req.body.serial;
    var Date = req.body.date;
	var BookType =req.body.bookType;

	var data = {
		"BookName": bookName,
        "PublisherName": PublisherName,
        "Age": Age,
        "Serial": Serial,
        "Date": Date,
        "BookType": BookType
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('info_update.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('Entryform.html');
}).listen(3000)


console.log("server listening at port 3000");




    
    
    
    
   