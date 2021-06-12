import React, { useState } from "react";
import "./style.css";

function SwitchTheme({ className, currentTheme }) {
  const [theme, setTheme] = useState(currentTheme);

  const switchTheme = (value) => {
    if (value) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <div className={`theme-switch-wrapper ${className}`}>
      <label className='theme-switch'>
        <input
          type='checkbox'
          checked={theme === "dark" ? true : false}
          onChange={(e) => switchTheme(e.target.checked)}
        />
        <div className='slider' />
      </label>
    </div>
  );
}

export default SwitchTheme;
