import { useEffect, useState } from "react";
import { Circles, ColorRing } from "react-loader-spinner";

const WeatherNewComp=()=>{
  const[cityName,setCityName] = useState("");
  const[weatherData,setWeatherData]=useState();
  const[error, setError] = useState();
  const[loading,setLoading] = useState(false);

  async function getWeatherData(){
    try{
      setLoading(true);
      let API_KEY = process.env.REACT_APP_API_KEY;
      console.log("API_KEY:",API_KEY);
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);

    let result = await response.json();
    console.log(result);
    if(result.cod == "404"){
      setError(result.message);
      setWeatherData("");
    }
    if(result.cod!=="400" && result.cod !== "404"){
      setWeatherData(result);
      setError("");
    }
    console.log(result);

    }catch(error){
      setError("Error message is ", error);
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getWeatherData();
  },[cityName]);

  function convertToCelcius(temp){
    let newtemp=temp-273;
    return Math.floor(newtemp);
  }
  function convertDistance(dis) {
    let newDis = dis / 1000;
    return newDis;
  }
  function convertToHg(pres) {
    let newPres = pres * 0.02953;
    return Math.round(newPres);
  }
  return (
  <>
  <div className="body">
  <h1 className="heading">Weather Today</h1>
  <div className="container">
    <input type="text" placeholder="Enter your city"
    value={cityName} className="input"
    onChange={(e)=>setCityName(e.target.value)}/>
    
  <div className="loader">
    {loading && (
    <ColorRing
      visible={true}
      height="50"
      width="50"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
    )}
   </div> 

    <div className="error">
      {error && <p>Error : {error}</p>}
    </div>
    {weatherData &&(
      <div className="location">
        <h3>{weatherData?.name},{weatherData?.sys?.country}</h3>
      </div>
    )}
    {weatherData &&(
      <div className="image">
        {weatherData.weather && (
          <img src={`${weatherData?.weather[0].icon}.svg`} alt="img" style={{width:"15rem"}}/>
        )}
      </div>
    )}
    {weatherData &&(
      <div className="description">
        <h3>{weatherData.weather &&weatherData?.weather[0].description}{" "} </h3>
      </div>
    )}
    {weatherData &&(
      <div>
        <p className="temp">
          {convertToCelcius(weatherData?.main?.temp)}°C
        </p>
        <p className="temp-two">
          Max:{convertToCelcius(weatherData?.main?.temp_max)}&#176;C  |
          Min:
          {convertToCelcius(weatherData?.main?.temp_min)}&#176;C
        </p>
      </div>
    )}
    {weatherData &&(
    <div className="big-container">
      <div className="small-container1">
        <p className="speed">
          Wind Speed: {weatherData?.wind?.speed} km/h
        </p>
        <p className="humidity">
          Humididty:{weatherData?.main?.humidity}%
        </p>
      </div>
      <div className="small-container2">
        <p className="distance">
          Visibility: {convertDistance(weatherData?.visibility)} km
        </p>
        <p className="pressure">
          Pressure: {convertToHg(weatherData?.main?.pressure)} Hg
        </p>
      </div>
    </div>
    )}
  </div>
  </div>
  </> 
  );
};
export default WeatherNewComp;