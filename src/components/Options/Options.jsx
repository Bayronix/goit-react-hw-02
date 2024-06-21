import React from "react";

function Options({ onLeaveFeedback }) {
  return (
    <div>
      <button onClick={() => onLeaveFeedback("good")}>Good</button>
      <button onClick={() => onLeaveFeedback("neutral")}>Neutral</button>
      <button onClick={() => onLeaveFeedback("bad")}>Bad</button>
    </div>
  );
}

export default Options;
