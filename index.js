var request = require('request'); // replace with your client information: developer.whereismytransport.com/clients

var CLIENT_ID = 'ee8d8e1e-a80f-4830-9b2f-d1d7bd0f0731';
var CLIENT_SECRET = '2KMbS33SBCF6ZdGrTBT9U67yY0aQ4O6uUIhLPF4t4lk=';
var options = {
  method: 'POST',
  headers: 'ACCEPT: application/json',
  url: 'https://identity.whereismytransport.com/connect/token',
  form: {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'transportapi:all'
  }
};
request(options, function (error, response, body) {
  var TOKEN = JSON.parse(body).access_token; // subsequent requests go here, using the TOKEN

  var body = {
    geometry: {
      type: 'Multipoint',
      coordinates: [[18.505148,-33.895784], [18.535295,-33.944339]]
    },  maxItineraries: 1
  };
  var options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    url: 'https://platform.whereismytransport.com/api/journeys',
    body: JSON.stringify(body)
  };
  request(options, function (error, response, body) {

    var jsonObject = JSON.parse(body);
    // var modeOfTransport = jsonObject.itineraries[0].legs[0].type;
    // var latStopOfTransport = jsonObject.itineraries[0].legs[0].waypoints[1].stop.geometry.coordinates[0]
    // var lanStopOfTransport = jsonObject.itineraries[0].legs[0].waypoints[1].stop.geometry.coordinates[1]
    var cordsStopOfTransport = jsonObject.itineraries[0].legs[3].geometry.coordinates;
    var latStopOfTransportLength = jsonObject.itineraries[0].legs[0].geometry.coordinates.length;
    var latStopOfTransport = jsonObject.itineraries[0].legs[0].geometry.coordinates[0]
    var lanStopOfTransport = jsonObject.itineraries[0].legs[0].geometry.coordinates[1]

    var routeCords = [];


    for (i = 0; i < cordsStopOfTransport.length; i++) {
        routeCords.push([cordsStopOfTransport[i][0]+','+cordsStopOfTransport[i][1]]);

}
    console.log(routeCords);
  });
});












const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    // let uniqueGreetings = JSON.stringify(greeting.count());
    // req.flash('counter', uniqueGreetings);
    res.render('home');
});

app.get('/myroute', function (req, res) {
    // let uniqueGreetings = JSON.stringify(greeting.count());
    // req.flash('counter', uniqueGreetings);
    res.render('getroute');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
