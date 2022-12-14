import React, { useState } from "react";

import Frame from "./components/Frame";

import Reds15 from "./images/15reds.svg";
import Reds10 from "./images/10reds.svg";
import Reds6 from "./images/6reds.svg";


function App() {

  // These are sent as props to the "Frame" component
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [reds, setReds] = useState(15);

  function StartMenu() {

    const [playerNames, setPlayerNames] = useState({
      p1: "",
      p2: ""
    });
  
    const redArray = [6, 10, 15]; // Amount of reds available when starting the frame

    const [redIndex, setRedIndex] = useState(2); // Used to cycle through redArray
    const [disableDecrementReds, setDisableDecrementReds] = useState(false);
    const [disableIncrementReds, setDisableIncrementReds] = useState(true);

    const fifteenReds = () => {
      return (
      <img src={Reds15} id="15reds" alt="15reds" className="startMenuImg" />
      )
    };

    const tenReds = () => {
      return (
        <img src={Reds10} id="10reds" alt="10reds" className="startMenuImg" />
      )
    };

    const sixReds = () => {
      return (
        <img src={Reds6} id="6reds" alt="6reds" className="startMenuImg" />
      )
    };

    const [packOfReds, setPackOfReds] = useState(fifteenReds);


    const decrementReds = () => {
      if (redIndex > 0) {
        setRedIndex(redIndex - 1);
        setDisableIncrementReds(false);
        setPackOfReds(tenReds);
      }
      if (redIndex === 1) {
        setDisableDecrementReds(true);
        setPackOfReds(sixReds);
      }
    };

    const incrementReds = () => {
      if (redIndex < 2) {
        setRedIndex(redIndex + 1);
        setDisableDecrementReds(false);
        setPackOfReds(tenReds);
      }
      if (redIndex === 1) {
        setDisableIncrementReds(true);
        setPackOfReds(fifteenReds);
      }
    };

    const startFrame = () => {
      setP1Name(playerNames.p1);
      setP2Name(playerNames.p2);
      if (playerNames.p1.length === 0) {
        setP1Name("Player 1");
      }
      if (playerNames.p2.length === 0) {
        setP2Name("Player 2");
      }
      if (playerNames.p1.length > 0 && playerNames.p1 === playerNames.p2) {
        setP2Name(playerNames.p2+"2");
      }
      setReds(redArray[redIndex]);
      console.log("Frame started: " + playerNames.p1 + " vs " + playerNames.p2 + " with " + redArray[redIndex] + " reds")
      setDisplay("scoreboard");
    };

    const changeName = (e) => {
      setPlayerNames({
        ...playerNames,
        [e.target.name]: e.target.value
      })
    };

     return (
      <div id="startMenu">
        {/* <button id="close" onClick={() => closeFoulMenu()}><b>&#x2715;</b></button> */}
        <h3>START A MATCH:</h3>

        <div id="players">
          <div className="playersWrapper">
            <input type="text" id="p1" name="p1" className="nameInput" placeholder="Player 1" maxLength="20" value={playerNames.p1} onChange={(e) => changeName(e)} />
          </div>
          <div id="vsWrapper">
            <label>vs</label>
            <div id="vs">
              vs
            </div>
          </div>
          <div className="playersWrapper">
            <input type="text" id="p2" name="p2" className="nameInput" placeholder="Player 2" maxLength="20" value={playerNames.p2} onChange={(e) => changeName(e)} />
          </div>
        </div>
        <div id="amountOfReds">
          <label>Amount of reds:</label>
          <div id="redsControl">
            <button className="plusMinus" disabled={disableDecrementReds} onClick={decrementReds}>&#8592;</button>
            <div className="displayValue">{redArray[redIndex]}</div>
            <button className="plusMinus" disabled={disableIncrementReds} onClick={incrementReds}>&#8594;</button>
          </div>
        </div>
        <div id="packOfReds">
          {packOfReds}
        </div>
        <button id="startButton" onClick={() => startFrame()}>START</button>
      </div>
    )

  };

  const [display, setDisplay] = useState("startMenu");

  function Display () {
    if (display === "scoreboard") {
      return (
        <Frame p1={p1Name} p2={p2Name} reds={reds} />
      )
    } else {
      return (
        <StartMenu />
      )
    }
  };

  return (
    <div>
      <Display />
    </div>
  );
}

export default App;
