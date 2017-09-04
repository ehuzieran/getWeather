function geoLocate() {
  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getWeather(lat, lon);
  }
  function error() {
    console.log(error);
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function getWeather(lat, lon) {
  var url =
    'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=700f9a155264f2308be65148a3b2d369&units=imperial';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhr.responseText);
      var results = data.results;
      displayData(data);
    }
  };
  xhr.send();
}

function displayData(data) {
  var cityName = data.name;
  var dataTemp = data.main.temp;
  var dataSky = data.weather[0].description;
  var weatherIconID = data.weather[0].icon;
  var weatherIcon =
    "<img src='http://openweathermap.org/img/w/" + weatherIconID + ".png'>";

  var city = document.querySelector('.city');
  var temp = document.querySelector('.temp');
  var sky = document.querySelector('.sky');
  var weatherImage = document.querySelector('.weatherImage');

  city.innerHTML = cityName;
  temp.innerHTML = dataTemp + ' &deg;F';
  titleCase(dataSky);
  sky.innerHTML = dataSkyUpperCase;
  weatherImage.innerHTML = weatherIcon;

  buttonClick(dataTemp, temp);
}

function titleCase(dataSky) {
  dataSkyUpperCase = dataSky
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
}

function buttonClick(dataTemp, temp) {
  var button = document.querySelector('button');
  button.onclick = function() {
    if (button.textContent === 'Switch to Imperial') {
      button.textContent = 'Switch to Metric';
      dataTempF = dataTemp + ' &deg;F';
      temp.innerHTML = dataTempF;
    } else {
      dataTempC = ((Number(dataTemp) - 32) * 0.5556).toFixed(2) + ' &deg;C';
      temp.innerHTML = dataTempC;
      button.textContent = 'Switch to Imperial';
    }
  };
}
