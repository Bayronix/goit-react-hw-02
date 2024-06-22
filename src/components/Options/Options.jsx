import React from "react";

function Options({ onLeaveFeedback, totalFeedback }) {
  return (
    <div>
      <button onClick={() => onLeaveFeedback("good")}>Good</button>
      <button onClick={() => onLeaveFeedback("neutral")}>Neutral</button>
      <button onClick={() => onLeaveFeedback("bad")}>Bad</button>
      {totalFeedback > 0 && (
        <button onClick={() => onLeaveFeedback("Reset")}>Reset</button>
      )}
    </div>
  );
}

export default Options;
