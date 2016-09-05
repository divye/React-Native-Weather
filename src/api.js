var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=f557b20727184231a597c710c8be3106';
var _ = require('lodash')

var kelvinToC = function(kelvin) {
  return Math.round((kelvin - 273.15)) + ' ˚C'
};

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  console.log(url)
  return fetch(url)
    .then((response) => response.json())
      .then((responseJson) => {
        return {
            city: responseJson.name,
            temperature: kelvinToC(responseJson.main.temp),
            description: _.capitalize(responseJson.weather[0].description)
        }
      })
      .catch((error) => {
        console.error(error);
      });
}