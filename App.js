import React, { useState, useEffect } from 'react';
import './App.css';
import calculateTime from './CalculateTime';


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [timeArray, setTimeArray] = useState([]);

  useEffect(() => {
    let timeArray = calculateTime(seconds);
    setTimeArray(timeArray);
  }, [seconds])

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

 
   return (
    <div className="app">
     

     <h1> COUNTER </h1>

      <div className="time">
        <p> {timeArray[0]} </p>
        <span>:</span>
        <p> {timeArray[1]} </p>
        <span>:</span>
        <p>{timeArray[2]}</p>
      </div>      
      
      
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>


        <button className='button-res' onClick={reset}>
          Reset
        </button>


      </div>
    </div>
  );
};


export default Timer;