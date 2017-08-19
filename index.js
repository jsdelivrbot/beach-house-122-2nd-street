var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// postgres:
// host:      ec2-54-83-26-65.compute-1.amazonaws.com
// database:  dba883ld9hkaec
// user:      arhdhiczoswund
// port:      5432

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());

app.post('/book', function(req, res) {
    console.log(req.body);
    var data = req.body;

    var send = require('gmail-send')({
        user: '122.2nd.street@gmail.com',
        pass: 'comcast_2017',
        to: 'byrnec87@gmail.com',
        subject: 'New Booking Request',
        text: `name: ${data.name}\nemail: ${data.email}\nphone: ${data.phone}\ncheck-in: ${data.checkIn}\ncheck-out: ${data.checkOut}`
    }, function(err, eresy) {
        res.send('success!');    
    });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
