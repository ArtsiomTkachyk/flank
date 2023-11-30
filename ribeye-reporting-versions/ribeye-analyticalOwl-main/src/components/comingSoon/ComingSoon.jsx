import React, { useState, useEffect } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
const ComingSoon = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const location = useLocation();

  const startAnimation = () => {
    setAnimationStarted(true);
  };

  useEffect(() => {
    startAnimation();
  }, [location.pathname]); // Empty dependency array to run the effect only once on mount


  return (
    <div className="coming-soon relative">
      <h1 className={`animated-header font-bold text-[#0AB9E5] text-5xl ${animationStarted ? "visible" : ""}`}>
        Coming soon...
      </h1>
    </div>
  );
};

export default ComingSoon;
