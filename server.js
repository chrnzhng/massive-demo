var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require('lodash');
var db = massive.connectSync({
  connectionString : 'postgres://yclvuvrelxsxij:78a86282e644ee9c28f285446c54e67dffd00359ec19eb99db932ec7c202d38f@ec2-23-21-246-11.compute-1.amazonaws.com:5432/d4hc21515iuphb?ssl=true'
});

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/', function (req, res) {
  var cars = [
    {plate: 'XYZ'},
    {plate: 'ABC'},
  ];

  var cake = _.template(`
    <h1>hello <%= name %></h1>
    <% cars.forEach(function(inury) { %>
      <div><%= injury.name %> - <% injury.description %></div>
  <% }) %>
  `);
  })
  db.getAllInjuries(function(err, injuries){
  var html = cake({
    // name: 'Jordan',
    // cars: cars,
    injuries: injuries
    
  })
  res.send(html)
});

app.get('/incidents', function(req, res) {
  var state = req.query.state;
  ///?state=NY
  if (state) {
    db.getIncidentsByState([state], function(err, incidents) {
      res.send(incidents);
    });
    
  }
  else {
    db.getAllIncidents(function (err, incidents) {
    res.send(incidents);
  });
  }
});

app.post('/incidents', function(req, res) {
  var incident = req.body;
  db.createIncident([incident.state, incident.injuryId, incident.causeId], function(err, result){
    res.send(result[0]);
  }); 
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
