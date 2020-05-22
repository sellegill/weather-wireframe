'use strict'

// Openweather maps 
const apiKey = "034ccc6e7514f771e7dbb0199974688d";

const  searchURL = "https://api.openweathermap.org/data/2.5/weather";


function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getWeatherData (city){
  const params = {
    q: city,
    units: "Imperial",
    appid: apiKey
  }
  console.log(params)

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayCity(responseJson))
  .catch(error => {
    $(".js-error-message").text(`Error: ${error.message}`)
  });
  
}

/*** Retrieve city/weather and get the weather data */
function displayCity(responseJson) {
  console.log(responseJson);
  $('.js-results-box').removeClass('hidden');
  if(responseJson.total === 0) {
    $('.js-error-message').text("Results not found");
  } else {
     let icon = ("")
     if(responseJson.weather[0].main == ("Thunderstorm")){
       icon = "icons8-umbrella-50.png", "icons8-raincoat-50.png"
       icon = `<img src="${icon}">`
     }

     if(responseJson.weather[0].main == ("Rain")){
      icon = "icons8-umbrella-50.png", "icons8-raincoat-50.png"
      icon = `<img src="${icon}">`
    }

    if(responseJson.weather[0].main == ("Snow")){
      icon = "icons8-ushanka-50.png", "icons8-mittens-50.png"
      icon = `<img src="${icon}">`
    }

    if(responseJson.weather[0].main == ("Clear")){
      icon = "icons8-trainers-50.png", "icons8-t-shirt-50.png"
      icon = `<img src="${icon}">`
    }

    if(responseJson.weather[0].main == ("Clouds")){
      icon = ["icons8-jeans-50.png"],["icons8-tracksuit-50.png"]
      icon = `<img src="${icon}">`
    }

     //thunderstorm, drizzle, rain, snow, clouds

      $('.js-results').append(
        `<li>
        <h3 class="city">${responseJson.name}</h3>
        <p class="weater-type"> ${responseJson.weather[0].main}</p>
        <p class="temp"> Temp: ${responseJson.main.temp}</p>
        <p class="max-temp"> High:${responseJson.main.temp_max}</p>
        <p class="min-temp"> Low: ${responseJson.main.temp_min}</p>
        ${icon}
        </li>`
      );
  }
}
/* <a target="_blank" href="https://icons8.com/icons/set/umbrella">Umbrella</a>, <a target="_blank" href="https://icons8.com/icons/set/scarf">Scarf</a> and other icons by <a target="_blank" href="https://icons8.com">Icons8</a> */


function watchForm() {
  $(".js-search").submit(event =>{
    event.preventDefault();
    $('.js-results-box').addClass('hidden');
    $('.js-results').empty();
    $('.js-error-message').text('');
    const temp = $('.js-weather').val();
    const name = $('.js-city').val();
    

    

    getWeatherData(name);

  });
}

$(watchForm)


