var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/',function (req, res) {
	res.render('index')
})

app.listen(3000, function () {
	console.log('Server listening to port 3000');
})