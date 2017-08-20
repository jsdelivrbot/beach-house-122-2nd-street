var express = require('express');
var nodemailer  = require('nodemailer');
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

var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '122.2nd.street@gmail.com',
        pass: 'comcast_2017'
    }
});

app.post('/book', function(req, res) {
    console.log(req.body);
    var data = req.body;

    var mailOptions = {
        from: '122.2nd.street@gmail.com',
        to: 'tnbbccj@aol.com',
        bcc: 'byrnec87@gmail.com,noriebyrne@yahoo.com',
        subject: 'New Booking Request',
        text: `name: ${data.name}\nemail: ${data.email}\nphone: ${data.phone}\ncheck-in: ${data.checkIn}\ncheck-out: ${data.checkOut}`,
    };

    transport.sendMail(mailOptions, function(err,info) {
        if(err) {
            console.log(err);
            res.json({status: 'error', data: err});
        } else {
            console.log('message sent!... ' + info.response);
            res.json({status: 'success', data: info.response});
        }
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
