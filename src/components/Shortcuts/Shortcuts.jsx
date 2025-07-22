import React from "react";
import Shortcut from "./Shortcut";

const Shortcuts = ({ setAward, setAwardNumber }) => {
  return (
    <div className="shortcuts">
      <Shortcut value="vocab review" label="vocab" setTarget={setAward} />
      <Shortcut value="grammar" label="gram" setTarget={setAward} />
      <Shortcut value="perfect production" label="perf" setTarget={setAward} />
      <Shortcut value="fast production" label="fast" setTarget={setAward} />
      <Shortcut value="great conversation" label="conv" setTarget={setAward} />
      | |
      <Shortcut value={1} label="1" setTarget={setAwardNumber} />
      <Shortcut value={2} label="2" setTarget={setAwardNumber} />
      <Shortcut value={3} label="3" setTarget={setAwardNumber} />
      <br/>
      <Shortcut value="saying 'I don't remember' fast" label="idr" setTarget={setAward} />
      <Shortcut value="saying 'I don't know' fast" label="idk" setTarget={setAward} />
      <Shortcut value="use" label="use" setTarget={setAward} />
      <Shortcut value="pronunciation" label="pron" setTarget={setAward} />
      <Shortcut value="sentence making" label="sent" setTarget={setAward} />
      <Shortcut value="careful thinking" label="think" setTarget={setAward} />
      | |
      <Shortcut value={5} label="5" setTarget={setAwardNumber} />
      <Shortcut value={10} label="10" setTarget={setAwardNumber} />
    </div>
  );
};

export default Shortcuts;
