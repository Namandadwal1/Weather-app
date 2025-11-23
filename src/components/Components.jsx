import React from 'react'
import { CiHome } from "react-icons/ci";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherNight } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti"; 



function Components() {
  return (
    <div className='flex flex-col items-center justify-center absolute bottom-60 left-10 border border-white/20 bg-white/10 backdrop-blur-xl  shadow-lg text-6xl gap-10 p-5 rounded-4xl text-white   '>
      <div className='flex items-center justify-center flex-col'>
        <CiHome />
      <p className='text-sm'>Home</p>
      </div>
    <TiWeatherPartlySunny />
    <TiWeatherNight />
    <TiWeatherStormy />
    <TiWeatherSnow />
    </div>
  )
}

export default Components
