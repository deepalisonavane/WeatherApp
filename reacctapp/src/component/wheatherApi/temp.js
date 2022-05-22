import React, { useEffect, useState } from "react";
import WeatherCard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("mumbai");
const [tempInfo,setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
    &units=metric&appid=b525c9952a376513610d6cc231ec16df`;


      let res = await fetch(url);
      let data = await res.json();
      
      const {temp, humidity,pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myInfo ={
          temp,
          humidity,
          pressure,
          name,
          country,
          sunset,
          weathermood,
          speed
      };
      setTempInfo(myInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      
      {/* our weathercard */}
      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
