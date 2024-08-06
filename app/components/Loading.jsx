import { useEffect, useState } from "react";

const Loading = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const animateLoadingText = () => {
      setDotCount((prevState) => (prevState + 1) % 5);
    };
    const interval = setInterval(() => {
      animateLoadingText();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <p className="loading-text">Loading {`.`.repeat(dotCount)}</p>
    </div>
  );
};

export default Loading;
