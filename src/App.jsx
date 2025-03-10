import React from "react";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import rightSound from "./assets/right-sound.wav";
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

  const audioRef = useRef(null);

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

  const handleFinal = () => {
    setShowFinal(true);
  };

  const handleReturn = () => {
    setShowFinal(false);
  };

  const handleClear = () => {
    setAward("");
    setAwardNumber(0);
  };
  const  handleReset = () => {
    setScore(0);
    setSessionRecord([]);
    handleClear();
  };

  return (
    <>
      <main>
        <div className={`award-area ${!showFinal ? "" : "award-area-hidden"}`}>
          <div className="score">{score}</div>
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
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
          <button onClick={handleFinal}>Final Score</button>
        </div>
        <FinalScore
          showFinal={showFinal}
          score={score}
          sessionRecord={sessionRecord}
          handleReturn={handleReturn}
        />
      </main>
    </>
  );
}

export default App;
