import React, { useState, useEffect } from "react";
import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";
import "../components/App.css";

function App() {
  const [values, setValues] = useState({ good: 0, neutral: 0, bad: 0 });

  useEffect(() => {
    const storedValues = localStorage.getItem("feedbackValues");
    if (storedValues) {
      setValues(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbackValues", JSON.stringify(values));
  }, [values]);

  const onLeaveFeedback = (option) => {
    if (option === "Reset") {
      setValues({ good: 0, neutral: 0, bad: 0 });
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [option]: prevValues[option] + 1,
      }));
    }
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positive =
    totalFeedback > 0 ? Math.round((values.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />
      <div className="container">
        <Options onLeaveFeedback={onLeaveFeedback} />
        {totalFeedback > 0 && (
          <button onClick={() => onLeaveFeedback("Reset")}>Reset</button>
        )}
      </div>
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          values={values}
          totalFeedback={totalFeedback}
          positive={positive}
        />
      )}
    </div>
  );
}

export default App;
