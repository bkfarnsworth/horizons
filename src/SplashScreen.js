import React, { useEffect } from "react";
import lottie from "lottie-web";
import splashScreenData from "./splash-screen.json";

export default function SplashScreenh() {
  useEffect(() => {
    console.log("running");

    var animation = lottie.loadAnimation({
      container: document.getElementById("lottie-splash"), // Required
      animationData: splashScreenData, // Required
      renderer: "svg", // Required
      loop: true, // Optional
      autoplay: true, // Optional
      name: "Hello World" // Name for future reference. Optional.
    });

    return function cleanup() {
      animation.destroy();
    };
  });

  return <div id="lottie-splash" style={{ height: 300, width: 300 }}></div>;
}
