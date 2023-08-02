import { useState, useEffect } from "react";

export default function ThreeDotsLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => clearInterval(loadingInterval);
  }, []);

  return <span className="text-2xl">{dots}</span>;
}
