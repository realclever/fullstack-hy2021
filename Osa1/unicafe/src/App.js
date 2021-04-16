import React, { useState } from "react";

//title component
const Title = ({ title }) => {
  return <h2> {title}</h2>;
};

//button component
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

//stats component
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <p> No feedback given </p>
      </>
    );
  } else {
    return (
      <>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticsLine
          text="positive"
          value={`${100 * (good / (good + neutral + bad))} %`}
        />
      </>
    );
  }
};

//stats helper
const StatisticsLine = ({ text, value }) => {
  //tbody fixes the warning
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {text} {value}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodButton = () => setGood(good + 1);
  const neutralButton = () => setNeutral(neutral + 1);
  const badButton = () => setBad(bad + 1);

  return (
    <>
      <Title title="give feedback" />
      <Button handleClick={goodButton} text="good" />
      <Button handleClick={neutralButton} text="neutral" />
      <Button handleClick={badButton} text="bad" />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
