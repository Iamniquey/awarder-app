import React from "react";
import Shortcut from "./Shortcut";

const Shortcuts = ({ setAward, setAwardNumber }) => {
  return (
    <div className="shortcuts">
      <Shortcut value="vocab review of ''" label="vocab" setTarget={setAward} />
      <Shortcut value="grammar of ''" label="gram" setTarget={setAward} />
      <Shortcut value="perfect ''" label="perf" setTarget={setAward} />
      <Shortcut value="fast ''" label="fast" setTarget={setAward} />
      <Shortcut value="great conversation" label="conv" setTarget={setAward} />
      | |
      <Shortcut value={1} label="1" setTarget={setAwardNumber} />
      <Shortcut value={3} label="3" setTarget={setAwardNumber} />
      <Shortcut value={5} label="5" setTarget={setAwardNumber} />
      <br/>
      <Shortcut value="use ''" label="use" setTarget={setAward} />
      <Shortcut value="pronunciation of ''" label="pron" setTarget={setAward} />
      <Shortcut value="making the sentence ''" label="sent" setTarget={setAward} />
      <Shortcut value="careful thinking of ''" label="think" setTarget={setAward} />
      | |
      <Shortcut value={10} label="10" setTarget={setAwardNumber} />
    </div>
  );
};

export default Shortcuts;
