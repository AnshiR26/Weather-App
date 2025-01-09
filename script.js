
fetch('https://restcountries.com/v2/all')
  .then((response) => response.json())
  .then((countries) => {
    const container = document.getElementById('card-container');

    countries.forEach((country) => {
    
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${country.name}</h2>
        <img src="${country.flags.svg}" alt="${country.name} Flag">
        <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Country Code:</strong> ${country.alpha3Code}</p>
        <button class="weather-button" data-capital="${country.capital || ''}">Click for Weather</button>
      `;
      container.appendChild(card);
    });


    const weatherButtons = document.querySelectorAll('.weather-button');
    weatherButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const capital = event.target.getAttribute('data-capital');
        if (capital) {
          fetchWeatherData(capital);
        } else {
          alert('No capital available for this country.');
        }
      });
    });
  })
  .catch((error) => console.error('Error fetching countries:', error));

function fetchWeatherData(capital) {
  const apiKey = 'ffee64b131e738cce1fe86018385fcb4'; 
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        alert(`Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`);
      } else {
        alert('Weather data not found for this location.');
      }
    })
    .catch(error => console.error('Error fetching weather:', error));
}

