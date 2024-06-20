import React, { useState, useEffect } from "react";

function App() {
  const [values, setValues] = useState({ good: 0, neutral: 0, bad: 0 });
  const [isFeedback, setIsFeedback] = useState(false);

  useEffect(() => {
    const storedValues = localStorage.getItem("feedbackValues");
    if (storedValues) {
      setValues(JSON.parse(storedValues));
      setIsFeedback(true);
    }
  }, []);

  useEffect(() => {
    if (isFeedback) {
      localStorage.setItem("feedbackValues", JSON.stringify(values));
    } else {
      localStorage.removeItem("feedbackValues");
    }
  }, [values, isFeedback]);

  const onLeaveFeedback = (option) => {
    if (option === "Reset") {
      setValues({ good: 0, neutral: 0, bad: 0 });
      setIsFeedback(false);
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [option]: prevValues[option] + 1,
      }));
      setIsFeedback(true);
    }
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positive =
    totalFeedback > 0 ? Math.round((values.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <button onClick={() => onLeaveFeedback("good")}>Good</button>
      <button onClick={() => onLeaveFeedback("neutral")}>Neutral</button>
      <button onClick={() => onLeaveFeedback("bad")}>Bad</button>
      {isFeedback && (
        <button onClick={() => onLeaveFeedback("Reset")}>Reset</button>
      )}

      {!isFeedback ? (
        <div>
          <p>No feedback yet</p>
        </div>
      ) : (
        <div>
          <p>Good: {values.good}</p>
          <p>Neutral: {values.neutral}</p>
          <p>Bad: {values.bad}</p>
          <p>Total: {totalFeedback}</p>
          <p>Positive: {positive}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
