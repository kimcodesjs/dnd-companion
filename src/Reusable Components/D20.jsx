import React, { useState } from "react";
import "./D20.css";

const D20 = ({ dice = 20 }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(1);

  const ITEM_HEIGHT = 24;
  const GAP = 4;
  const WINDOW_ROWS = 3;
  const WINDOW_HEIGHT = WINDOW_ROWS * ITEM_HEIGHT + (WINDOW_ROWS - 1) * GAP;
  const WINDOW_CENTER = WINDOW_HEIGHT / 2;

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    let ticks = 0;
    const totalTicks = 20;
    let lastValue = currentRoll;

    const finalValue = Math.floor(Math.random() * dice) + 1;

    const intervalId = setInterval(() => {
      ticks += 1;
      lastValue = (lastValue % dice) + 1;
      setCurrentRoll(lastValue);

      if (ticks >= totalTicks) {
        clearInterval(intervalId);
        setCurrentRoll(finalValue);
        setIsRolling(false);
      }
    }, 100);
  };

  const numbers = Array.from({ length: dice }, (_, i) => i + 1);

  return (
    <div className="d20">
      <div className="d20-controls">
        <button onClick={handleRoll} disabled={isRolling}>
          {isRolling ? "Rolling..." : `Roll d${dice}`}
        </button>

        <div className="d20-spinner-frame">
          <div className="d20-spinner-window-overlay" />

          <div className="d20-spinner-window">
            <div
              className="d20-spinner-column"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                // Center the active number within the visible window:
                // itemCenter = index * (ITEM_HEIGHT + GAP) + ITEM_HEIGHT / 2
                // offset = WINDOW_CENTER - itemCenter
                transform: `translateY(${
                  WINDOW_CENTER -
                  ((currentRoll - 1) * (ITEM_HEIGHT + GAP) + ITEM_HEIGHT / 2)
                }px)`,
                transition: isRolling
                  ? "transform 120ms linear"
                  : "transform 700ms cubic-bezier(0.22, 0.61, 0.08, 1)",
              }}
            >
              {numbers.map((num) => (
                <div
                  key={num}
                  className={
                    num === currentRoll
                      ? "d20-spinner-number d20-spinner-number--active"
                      : "d20-spinner-number"
                  }
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default D20;
