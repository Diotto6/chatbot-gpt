/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

interface StreamAnimationProps {
  text: string;
  interval: number;
}

export default function StreamAnimation({
  text,
  interval,
}: StreamAnimationProps) {
  const [typedText, setTypedText] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = -1;
    const chars = text.split("");

    const typingInterval = setInterval(() => {
      if (currentIndex === chars.length) {
        clearInterval(typingInterval);
      } else {
        setTypedText((prevTypedText) => [
          ...prevTypedText,
          chars[currentIndex],
        ]);
        currentIndex++;
      }
    }, interval);

    return () => clearInterval(typingInterval);
  }, []);

  return <span>{typedText.join("")}</span>;
}
