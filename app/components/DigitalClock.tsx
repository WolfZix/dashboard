import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function formatTime() {
    const days = time.getDate();
    const months = time.getMonth() + 1;
    const years = time.getFullYear();

    const date = `${padZero(days)}/${padZero(months)}/${years}`;

    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const currentTime = `${padZero(hours)}:${padZero(minutes)} ${meridiem}`;

    return (
      <div className="w-full flex justify-between light:text-[#0f172a]">
        <p>Daily News</p>
        <div className="flex gap-5 text-lg light:text-[#0f172a]">
          <p className="text-right">{date}</p>
          <p className="text-right">{currentTime}</p>
        </div>
      </div>
    );
  }

  function padZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
  }

  return (
    <div className="clock-container">
      <div className="clock">
        <span>{formatTime()}</span>
      </div>
    </div>
  );
}

export default DigitalClock;
