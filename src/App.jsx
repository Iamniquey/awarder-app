import React from "react";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import rightSound from "./assets/right-sound.wav";
import successSound from "./assets/success.wav";
import FinalScore from "./components/FinalScore";
import Shortcuts from "./components/Shortcuts/Shortcuts";

function App() {
  const [score, setScore] = useState(0);
  const [award, setAward] = useState("");
  const [awardNumber, setAwardNumber] = useState(0);
  const [display, setDisplay] = useState(`+${awardNumber} for ${award}`);
  const [sessionRecord, setSessionRecord] = useState([]);
  const [displayAnim, setDisplayAnim] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const audioRef = useRef(null);
  const successRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (award.trim() && awardNumber) {
      //play audio
      audioRef.current.play();

      //display
      const newAward = `+${awardNumber} for ${award}`;
      setDisplay(`You got ${newAward}!`);
      setSessionRecord((prev) => [...prev, newAward]);
      setDisplayAnim(true);

      //add score
      setScore((prev) => prev + awardNumber);
    }
  };

  // remove display
  useEffect(() => {
    if (displayAnim) {
      setTimeout(() => {
        setDisplayAnim(false);
      }, 3000);
    }
  }, [displayAnim]);

  //show final score
  const handleFinal = () => {
    setShowPreview(false);
    setShowFinal(true);
    //play audio
    successRef.current.play();
  };

  const handlePreview = () => {
    setShowPreview((prev) => !prev);
  };

  //go back to main screen
  const handleReturn = () => {
    setShowFinal(false);
  };

  // clear form
  const handleClear = () => {
    setAward("");
    setAwardNumber(0);
  };

  //reset form and score
  const handleReset = () => {
    setScore(0);
    setSessionRecord([]);
    clearData();
    handleClear();
  };

  // SAVING SCORE AND SESSION RECORD TO LOCAL STORAGE
  const [savedData, setSavedData] = useState(null);

  //save data to local storage
  const saveAllData = () => {
    const data = {
      score: score,
      sessionRecord: sessionRecord,
    };

    localStorage.setItem("allData", JSON.stringify(data));
    setSavedData(data);
  };

  //restore data from local storage
  const restoreData = () => {
    const data = JSON.parse(localStorage.getItem("allData"));
    if (data) {
      setScore(data.score);
      setSessionRecord(data.sessionRecord);
    }
  };

  const clearData = () => {
    localStorage.removeItem("allData");
    setSavedData(null);
  };

  //auto restore on reload
  useEffect(() => {
    restoreData();
  }, []);

  // auto save on data update
  useEffect(() => {
    if (score !== 0 || sessionRecord.length > 0) {
      saveAllData();
    }
  }, [score, sessionRecord]);

  return (
    <>
      <main>
        <div className={`award-area ${!showFinal ? "" : "award-area-hidden"}`}>
          <div data-testid="score" className="score">{score}</div>
          <div className={`display ${!displayAnim ? "" : "display-anim"}`}>
            {display}
          </div>
          <audio ref={audioRef} src={rightSound} />
          <form onSubmit={handleSubmit}>
            <input
              className="award"
              type="text"
              value={award}
              placeholder="action"
              onChange={(e) => setAward(DOMPurify.sanitize(e.target.value))}
            />
            <input
              className="award-number"
              type="number"
              min={0}
              value={awardNumber}
              placeholder="points"
              onChange={(e) =>
                setAwardNumber(parseInt(DOMPurify.sanitize(e.target.value)))
              }
            />
            <button className="btn-secondary" onClick={handleClear}>
              x
            </button>
            <button type="submit" disabled={displayAnim}>
              +
            </button>
          </form>
          <Shortcuts setAward={setAward} setAwardNumber={setAwardNumber} />
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-secondary" onClick={handlePreview}>
            Preview
          </button>
          <button onClick={handleFinal}>Final Score</button>
        </div>
        {showPreview ? (
          <div>
            <ul data-testid="session-record">
              {sessionRecord.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <FinalScore
          showFinal={showFinal}
          score={score}
          sessionRecord={sessionRecord}
          handleReturn={handleReturn}
        />
        <audio ref={successRef} src={successSound} />
      </main>
    </>
  );
}

export default App;
