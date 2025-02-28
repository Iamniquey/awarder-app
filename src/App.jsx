import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import rightSound from "./assets/right-sound.wav";
import smile1 from "./assets/images/smile 1.png";
import smile2 from "./assets/images/smile 2.png";

function App() {
  const [score, setScore] = useState(0);
  const [award, setAward] = useState("past tense");
  const [awardNumber, setAwardNumber] = useState(5);
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
      const newAward = `+${awardNumber} for "${award}"`;
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
            <button type="submit" disabled={displayAnim}>Add</button>
          </form>
          <button onClick={handleFinal}>Final Score</button>
        </div>

        <div className={`final-area ${showFinal ? "" : "final-area-hidden"}`}>
          <div className="final-area">
            <button onClick={handleReturn}>Return</button>
          </div>
          <div className="smile smile-1">
            <img src={smile1} alt="" />
          </div>
          <div className="score score-animated">{score}</div>
          <div className="smile smile-2">
            <img src={smile2} alt="" />
          </div>
          <div className="record">
            <ul>
              {sessionRecord.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
