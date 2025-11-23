import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { FaSearch, FaLocationArrow } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [system, setSystem] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [pressure, setPressure] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // src/services/weatherApi.js
  const KEY = import.meta.env.VITE_OPENWEATHER_KEY;
  const BASE = "https://api.openweathermap.org/data/2.5/weather";

  async function fetchWeatherByCity(city) {
    const url = `${BASE}?q=${encodeURIComponent(
      city
    )}&appid=${KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`City not found: ${city}`);
    const data = await res.json();
    console.log(data);
    setData(data.main.temp);
    setName(data.name);
    setSystem(data.sys.country);
    setHumidity(data.main.humidity);
    setPressure(data.main.pressure);
    setSpeed(data.wind.speed);
    setCity("");
  }

  async function fetchWeatherByCoords(lat, lon) {
    const url = `${BASE}?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Coordinates fetch failed");
    return res.json();
  }
  useEffect(() => {
    fetchWeatherByCity("kangra");
  }, []);

  return (
    <div className="min-h-screen w-full bg-[url('/Background1.png')] bg-cover bg-center bg-no-repeat overflow-x-hidden">
      {/* NAVBAR */}
      <div className="navbar">
        <div
          className="
      w-[90%] mx-auto mt-6 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 shadow-lg 
      rounded-2xl 
      px-5 py-4 
      flex items-center justify-between 
      gap-4
    "
        >
          {/* Left: App Name */}
          <h1 className="text-white text-2xl font-semibold tracking-wide hidden sm:block">
            Weather App
          </h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white/20 backdrop-blur-xl rounded-xl px-4 py-2 w-full sm:w-1/2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="bg-transparent outline-none text-white w-full placeholder-white/70"
              id="searchInput"
            />

            <button
              onClick={() => {
                fetchWeatherByCity(city);
              }}
              className="text-white text-xl ml-3 hover:scale-110 duration-200"
            >
              <FaSearch />
            </button>
          </div>

          {/* My Location Button */}
          <button
          onClick={() => {
                fetchWeatherByCity(city);
              }}
            className="
          flex items-center gap-2 
          bg-white/20 backdrop-blur-xl 
          border border-white/20
          rounded-xl px-4 py-2 
          text-white font-medium 
          hover:bg-white/30 
          duration-200
        "
          >
            <FaLocationArrow />
            <span className="hidden sm:block">My Location</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 pt-10 w-full mx-auto">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* TIME BOX */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 text-white shadow-lg">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider">
              {time}
            </h1>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wider mt-4">
              {date}
            </h3>
            <p className="text-xl sm:text-2xl mt-2 opacity-90">Saturday</p>
          </div>

          {/* TEMPERATURE BOX */}
          <div className="lg:w-[30%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 text-white shadow-lg">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold">
              {data}°C
            </h1>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
              {name}
            </h3>
            <p className="text-xl sm:text-2xl mt-2 opacity-90">{system}</p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8 w-full">
          {/* FORECAST BOX */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 text-white shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Today Forecasting
            </h2>

            <div className="space-y-6 text-lg sm:text-xl">
              <div className="flex items-center gap-5">
                <WiHumidity className="text-4xl" />
                <p>Humidity</p>
                <p className="ml-auto">{humidity}%</p>
              </div>

              <div className="flex items-center gap-5">
                <FaWind className="text-4xl" />
                <p>Wind</p>
                <p className="ml-auto">{speed} km/h</p>
              </div>

              <div className="flex items-center gap-5">
                <GiPressureCooker className="text-4xl" />
                <p>Pressure</p>
                <p className="ml-auto"> {pressure} mb</p>
              </div>
            </div>
          </div>

          {/* WEATHER ICON BOX */}
          <div className="lg:w-[30%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex justify-center items-center">
            <img
              src="/weather.png"
              className="w-40 h-40 sm:w-60 sm:h-60"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
