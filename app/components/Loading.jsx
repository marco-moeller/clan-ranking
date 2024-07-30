import { useEffect, useState } from "react";

const Loading = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const animateLoadingText = () => {
      console.log("interval");
      setDotCount((prevState) => (prevState + 1) % 5);
    };
    console.log("useEffect");
    const interval = setInterval(() => {
      animateLoadingText();
    }, 500);
  }, []);

  return (
    <div className="loading">
      {/* <img src="loading.gif" alt="Loading..." /> */}
      <p className="loading-text">Loading {`.`.repeat(dotCount)}</p>
    </div>
  );
};

export default Loading;
