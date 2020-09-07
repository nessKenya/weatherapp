
const api = {
    key: "6ab4e34bb4e3d065df470068e063f190",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}


const search = document.querySelector('.enter');
search.addEventListener('keypress', setQuery);

function setQuery(evt){
  if(evt.keyCode == 13){
       getTemp(search.value);
    }
}


function getTemp(query){

    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)

    .then(weather => {
        return weather.json();
    }) .then(returnResults); 
    
}


function returnResults(weather){

    let city = document.querySelector('.location .city');

    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let currentDate = new Date();
    let date = document.querySelector('.location .date');

    date.innerHTML = seasonTime(currentDate);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML= `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.range');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function seasonTime(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


//The PWA Code goes here

if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
          navigator.serviceWorker.register('/sw.js')
          .then(reg =>{
             // console.log('Registered', reg);
          }).catch(err =>{
      //  console.log('Registration failed: ', err);
  });
  });
  }







