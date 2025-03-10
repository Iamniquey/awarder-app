import React from "react";
import smile1 from "../assets/images/smile 1.png";
import smile2 from "../assets/images/smile 2.png";

const FinalScore = ({ showFinal, score, sessionRecord, handleReturn }) => {
  return (
    <div className={`final-area ${showFinal ? "" : "final-area-hidden"}`}>
        <button onClick={handleReturn}>Return</button>
      <div className="width-550">
        <div className="smile smile-1">
          <img src={smile1} alt="" />
        </div>
        <div className="score score-animated">{score}</div>
        <div className="smile smile-2">
          <img src={smile2} alt="" />
        </div>
      </div>
      <div className="record">
        <ul>
          {sessionRecord.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinalScore;
