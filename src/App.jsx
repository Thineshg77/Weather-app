import { useEffect, useState } from 'react'
import './App.css'
import propTypes from "prop-types"
import searchicon from './assets/search.png'
import Humidity from './assets/water-drop.png'
import windicon from './assets/wind.png'
import fday from './assets/01d.png'
import fnight from './assets/01n.png'
import sday from './assets/02d.png'
import snight from './assets/02n.png'
import thday from './assets/03d.png'
import nday from './assets/09d.png'
import tday from './assets/10d.png'
import tnight from './assets/10n.png'
import eday from './assets/11d.png'
import thiday from './assets/13d.png'
import fiday from './assets/50d.png'
import finight from './assets/50n.png'
import foday from './assets/04d.png'



const Weatherdetails = ({icon , temp , city , country ,
   lat, log, humidity, wind }) => {
 return(
  <>
  <div>
    <img src={icon} alt="image" className='images'/>
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
   <div>
   <span className="lat">Latitude</span>
   <span>{lat}</span>
   </div>
   <div>
   <span className="log">Longitude</span>
   <span>{log}</span>
   </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={Humidity} alt="humidity" className='icon' />
      <div className='data'>
        <div className='humidity-percentage'>{humidity}% </div>
        <div>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windicon} alt="wind" className='icon' />
      <div className='data'>
        <div className='wind-percentage'>{wind}km/h</div>
        <div>Wind speed</div>
      </div>
    </div>
    
  </div>

  </>
 )
}

Weatherdetails.propTypes = {
  icon: propTypes.string.isRequired,
  temp: propTypes.number.isRequired,
  city: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  humidity: propTypes.number.isRequired,
  wind: propTypes.number.isRequired,
  lat: propTypes.number.isRequired,
  log: propTypes.number.isRequired,
}
function App() {
  const [text ,settext] =useState("   Chennai")
const [icon ,seticon] = useState(fday);
const [temp ,setTemp] = useState(0);
const [city , setCity]= useState("chennai");
const [country , setCountry] = useState("IN");
const [lat , setLat] = useState(0);
const [log , setLog] = useState(0);
const [wind, setwind] = useState(0);
const [humidity, sethumidity] = useState(0);

const[citynotfound, setcitynotfound] = useState(false);
const[loading, setloading] = useState(false);
const [error, seterror] = useState(null);

const weathericonmap = {
  "01d": fday,
  "01n": fnight,
  "02d": sday,
  "02n": snight,
  "03d": thday,
  "03n": thday,
  "04d": foday,
  "04n": foday,
  "09d": nday,
  "09n": nday,
  "10d": tday,
  "10n": tnight,
  "11d": eday,
  "11n": eday,
  "13d": thiday,
  "13n": thiday,
  "50d": fiday,
  "50n": finight,
}

const search = async()=>{
  setloading(true);
  let api_key="4dcc445fe3eee6290fe305861213b3d5";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

  try{
       let res = await fetch(url);
       let data = await res.json();
       if(data.cod === "404") {
        console.error("city not found");
        setcitynotfound(true);
        setloading(false);
        return;
       }

       sethumidity(data.main.humidity);
       setwind(data.wind.speed);
       setTemp(Math.floor(data.main.temp));
       setCity(data.name);
       setCountry(data.sys.country);
       setLat(data.coord.lat);
       setLog(data.coord.lon);
       const weathericoncode = data.weather[0].icon;
       seticon(weathericonmap[weathericoncode] || fday);
       setcitynotfound(false);
  }catch (error){
    console.error("An error occured:", error.message);
    seterror("");
  }finally{
      setloading(false);
  }
};

const handlecity = (e) => {
  settext(e.target.value);

};
const handlekeydown = (e) => {
  if(e.target==="Enter") {
    search();
  }
};

useEffect(function () {
  search();
}, []);
  return (
    <>
      <div className='container'>
      <div className='input-container'>
          <input type="text" className='cityinput' 
          placeholder='   search city' 
          onChange={handlecity} value={text}
           onKeyDown={handlekeydown}/>
        <div className='search-icon' onClick={() => search()}>
          <img src={searchicon} alt="search"
           className='searchs' />
        
        </div>
         
        </div>
        
        {loading && <div className="loading-message">Loading......</div>}
        {error && <div className="error-message">{error}</div>}
        {citynotfound && <div className="city-not-found">city not found</div>}
         
       {!loading && !citynotfound && <Weatherdetails icon={icon} temp={temp} city={city} 
        country={country} lat={lat} log={log} wind={wind} 
        humidity={humidity}/> }

        <p className='copy'>
          &copy; Designed by <span>THINESH</span>
          </p> 
        </div>
    </>
  )
}

export default App
