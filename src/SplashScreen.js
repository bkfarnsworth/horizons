import React, { useEffect } from "react";
import lottie from "lottie-web";
import splashScreenData from "./splash-screen.json";

export default function SplashScreenh({ onAnimationDone }) {
  useEffect(() => {
    var animation = lottie.loadAnimation({
      container: document.getElementById("lottie-splash"), // Required
      animationData: splashScreenData, // Required
      renderer: "svg", // Required
      loop: false, // Optional
      autoplay: true, // Optional
      name: "Hello World" // Name for future reference. Optional.
    });

    animation.addEventListener("complete", onAnimationDone);

    return function cleanup() {
      animation.removeEventListener("complete", onAnimationDone);
      animation.destroy();
    };
  });

  return <div id="lottie-splash" style={{ height: 300, width: 300 }}></div>;
}
