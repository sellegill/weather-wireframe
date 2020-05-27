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
 

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  
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
      icon = `<img src="icons8-closed-umbrella-100.png"><img src="icons8-mens-hoodie-100.png"><img src="icons8-jeans-100.png">`
     }

     if(responseJson.weather[0].main == ("Rain")){
      icon = `<img src="icons8-closed-umbrella-100.png"><img src="icons8-blazer-100.png"><img src="icons8-jeans-100.png"><img src="icons8-cap-100.png">`
    }

    if(responseJson.weather[0].main == ("Snow")){
      icon = `<img src="icons8-ugg-boots-100.png"><img src="icons8-mittens-100.png"><img src="icons8-scarf-100.png"><img src="icons8-beanie-100.png">`
    }

    if(responseJson.weather[0].main == ("Clear")){
      icon = `<img src="icons8-long-shorts-100.png"><img src="icons8-womens-t-shirt-100.png"><img src="icons8-sneakers-100.png"><img src="icons8-cap-100.png">`
    }

    if(responseJson.weather[0].main == ("Clouds")){
      icon = `<img src="icons8-jeans-100.png"><img src="icons8-v-neck-longsleeve-100.png"><img src="icons8-sneakers-100.png"><img src="icons8-cap-100.png">`
    }


      $('.js-results').append(
        `<li>
        <h3 class="city">${responseJson.name}</h3>
        <p class="weater-type"> ${responseJson.weather[0].main}</p>
        <p class="temp"> Temp: ${responseJson.main.temp} F</p>
        <p class="max-temp"> High: ${responseJson.main.temp_max} F</p>
        <p class="min-temp"> Low: ${responseJson.main.temp_min} F</p>
        ${icon}
        </li>`
      );
  }
}


function watchForm() {
  $(".js-search").submit(event =>{
    event.preventDefault();
    $('.js-results-box').addClass('hidden');
    $('.js-results').empty();
    $('.js-error-message').text('');
    const name = $('.js-city').val();
    

    getWeatherData(name);

  });
}

$(watchForm)


