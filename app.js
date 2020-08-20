const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const appid = "6aaca6a6b7c5c2c068d8d8eef7825351";
  const units = 'metric';
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=" + units + "&q=" + query + "#"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is "+temp+" Celcius, and it's " + weatherDescription + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
})


//


app.listen(5000, function() {
  console.log('app is running on port 5000')
})
