import React, { useState } from "react";

import Red from "../images/red.svg";
import FoulBall from "../images/foul.svg";
import EndTurn from "../images/endturn.svg";
import Yellow from "../images/yellow.svg";
import Green from "../images/green.svg";
import Brown from "../images/brown.svg";
import Blue from "../images/blue.svg";
import Pink from "../images/pink.svg";
import Black from "../images/black.svg";

import AddFoul from "../images/addfoul.svg";

function Scoreboard() {

    // Player info
    const [p1, setP1] = useState({
        name: "Player 1", score: 0, active: true
    });
    const [p2, setP2] = useState({
        name: "Player 2", score: 0, active: false
    });

    let p1Name = p1.name.toUpperCase();
    let p2Name = p2.name.toUpperCase();

    // Info screen stuff
    // Testausta varten, vaihda takas 15
    const [redsLeft, setRedsLeft] = useState(2);
    let pointsLeft = (redsLeft * 8) + 27;
    let pointDifference = (Math.abs(p1.score - p2.score));

    const [breakCounter, setBreakCounter] = useState(0);

    // Used to follow frame progress
    const [turnInProgress, setTurnInProgress] = useState(false);
    const [disableRed, setDisableRed] = useState(false);
    const [redPottedPreviously, setRedPottedPreviously] = useState(false);

    const [disableYellow, setDisableYellow] = useState(true);
    const [disableGreen, setDisableGreen] = useState(true);
    const [disableBrown, setDisableBrown] = useState(true);
    const [disableBlue, setDisableBlue] = useState(true);
    const [disablePink, setDisablePink] = useState(true);
    const [disableBlack, setDisableBlack] = useState(true);

    const enableColors = () => {
        setDisableYellow(false);
        setDisableGreen(false);
        setDisableBrown(false);
        setDisableBlue(false);
        setDisablePink(false);
        setDisableBlack(false);
    };

    const disableColors = () => {
        setDisableYellow(true);
        setDisableGreen(true);
        setDisableBrown(true);
        setDisableBlue(true);
        setDisablePink(true);
        setDisableBlack(true);
    };

    const noRedsLeft = (value) => {
        setRedPottedPreviously(false);
        disableColors();
        if (value === 1) {
            setDisableYellow(false);
        } else if (value === 2) {
            setDisableGreen(false);
        } else if (value === 3) {
            setDisableBrown(false);
        } else if (value === 4) {
            setDisableBlue(false);
        } else if (value === 5) {
            setDisablePink(false);
        } else if (value === 6) {
            setDisableBlack(false);
        } else if (value === 7) {
            // endFrame();
        }
    };

    // potRed
    const potRed = () => {
        setTurnInProgress(true);
        setRedPottedPreviously(true);
        if (p1.active) {
            setP1(prevState => ({
                ...prevState, score: prevState.score + 1
            }))
            console.log(p1.name + " potted a red");
        } else {
            setP2(prevState => ({
                ...prevState, score: prevState.score + 1
            }))
            console.log(p2.name + " potted a red");
        }
        setRedsLeft(redsLeft - 1);
        if (redsLeft === 1) {
            setDisableRed(true);
        };
        setBreakCounter(breakCounter + 1);
        document.getElementById("breakCounter").style.display = "inline-block";
        document.getElementById("breakCounterBG").style.backgroundColor = "#FFFFFF";
        enableColors();
    };

    // const foul

    // endTurn
    const endTurn = () => {
        setTurnInProgress(false);
        setRedPottedPreviously(false);

        if (p1.active) {
            document.getElementById("p1Score").style.backgroundColor = "#2a2a2a";
            document.getElementById("p2Score").style.backgroundColor = "#424242";
        } else {
            document.getElementById("p1Score").style.backgroundColor = "#424242";
            document.getElementById("p2Score").style.backgroundColor = "#2a2a2a";
        };

        setP1(prevState => ({
            ...prevState, active: !prevState.active
        }));
        setP2(prevState => ({
            ...prevState, active: !prevState.active
        }));
        if (redsLeft > 0) {
            disableColors();
        } else if (redPottedPreviously) {
            noRedsLeft(1);
        }
        if (breakCounter > 0) {
            console.log("Turn ended");
        }
        setBreakCounter(0);
        document.getElementById("breakCounter").style.display = "none";
        document.getElementById("breakCounterBG").style.backgroundColor = "#deccb8";
    };

    // potColor; value & name come as parameters from the buttons
    const potColor = (value, name) => {
        setTurnInProgress(true);
        setRedPottedPreviously(false);
        if (p1.active) {
            setP1(prevState => ({
                ...prevState, score: prevState.score + value
            }))
            console.log(p1.name + " potted a  " + name)
        } else {
            setP2(prevState => ({
                ...prevState, score: prevState.score + value
            }))
            console.log(p2.name + " potted a " + name)
        }
        disableColors();
        if (redsLeft === 0 && redPottedPreviously) {
            noRedsLeft(1);
        } else if (redsLeft === 0 && redPottedPreviously === false) {
            noRedsLeft(value);
        } else {
            // Do nothing
        }
        setBreakCounter(breakCounter + value);
    };

    // Change active player by clicking their name/score on the scoreboard
    const scoreboardClick = (value) => {
        if ((value === 1 && p1.active) || (value === 2 && p2.active)) {
            // Do nothing
        } else if (turnInProgress) {
            console.log("Press End turn to end break");
        } else {
            endTurn();
        }
    };

    // Foul menu
    function Foul() {

        // Points for opponent: 
        const [foulPoints, setFoulPoints] = useState(4);
        const [totalPointsConceded, setTotalPointsConceded] = useState(0);

        const [disableDecrementCount, setDisableDecrementCount] = useState(true);
        const [disableIncrementCount, setDisableIncrementCount] = useState(false);

        const decrementCount = (e) => {
            e.preventDefault();
            if (foulPoints > 4) {
                setFoulPoints(foulPoints - 1);
            }
            if (foulPoints === 5) {
                setDisableDecrementCount(true);
            }
            setDisableIncrementCount(false);
        };

        const incrementCount = (e) => {
            e.preventDefault();
            if (foulPoints < 7) {
                setFoulPoints(foulPoints + 1);
            }
            if (foulPoints === 6) {
                setDisableIncrementCount(true);
            }
            setDisableDecrementCount(false);
        };


        // Reds removed: 
        const [redsRemoved, setRedsRemoved] = useState(0);

        const [disableDecrementReds, setDisableDecrementReds] = useState(true);
        const [disableIncrementReds, setDisableIncrementReds] = useState(false);


        const decrementRedsRemoved = (e) => {
            e.preventDefault();
            if (redsRemoved > 0) {
                setRedsRemoved(redsRemoved - 1);
            }

            if (redsRemoved === 1) {
                setDisableDecrementReds(true);
            }
            setDisableIncrementReds(false);
        };

        const incrementRedsRemoved = (e) => {
            e.preventDefault();
            if (redsRemoved < redsLeft) {
                setRedsRemoved(redsRemoved + 1);
            }
            setDisableDecrementReds(false);
            if (redsRemoved === redsLeft - 1) {
                setDisableIncrementReds(true);
            }
        }

        // Free ball for next turn:

        const [freeBall, setFreeBall] = useState(false);
        
        const [disableAddFoul, setDisableAddFoul] = useState(false);

        const freeBallNext = (e) => {
            if (e.target.checked) {
                setFreeBall(true);
                setDisableAddFoul(true);
            } else {
                setFreeBall(false);
                setDisableAddFoul(false);
            }
        };

        const addFoul = () => {
            setTotalPointsConceded(totalPointsConceded + foulPoints);
            setRedsLeft(redsLeft - redsRemoved);
            if (p1.active) {
                setP2(prevState => ({
                    ...prevState, score: prevState.score + foulPoints
                }))
                console.log(foulPoints + " foul points awarded to " + p2.name)
            } else {
                setP1(prevState => ({
                    ...prevState, score: prevState.score + foulPoints
                }))
                console.log(foulPoints + " foul points awarded to " + p1.name)
            }
            document.getElementById("totalPointsConceded").style.visibility = "visible";
        };

        const foulEndTurn = () => {
            setRedsLeft(redsLeft - redsRemoved);
            if (p1.active) {
                setP2(prevState => ({
                    ...prevState, score: prevState.score + foulPoints
                }))
                console.log(foulPoints + " foul points awarded to " + p2.name)
            } else {
                setP1(prevState => ({
                    ...prevState, score: prevState.score + foulPoints
                }))
                console.log(foulPoints + " foul points awarded to " + p1.name)
            }
            endTurn();
        };

        // Buttons for submit
        const handleSubmit = (e) => {
            e.preventDefault();
            foulEndTurn();
        }

        // Foul menu modal
        return (
            <div id="foulMenu">
                <button id="close"><b>&#x2715;</b></button>
                <h3>FOUL MENU </h3>
                <form onSubmit={handleSubmit}>
                    <div id="pointsForOpponent">
                        <label>Points for opponent:</label>
                        <div className="formControls">
                            <button className="plusMinus" disabled={disableDecrementCount} onClick={decrementCount}>-</button>
                            <div className="displayValue">{foulPoints}</div>
                            <button className="plusMinus" disabled={disableIncrementCount} onClick={incrementCount}>+</button>
                        </div>
                    </div>
                    <div id="redsRemoved">
                        <label>Reds removed:</label>
                        <div className="formControls">
                            <button className="plusMinus" disabled={disableDecrementReds} onClick={decrementRedsRemoved}>-</button>
                            <span className="displayValue">{redsRemoved}</span>
                            <button className="plusMinus" disabled={disableIncrementReds} onClick={incrementRedsRemoved}>+</button>
                        </div>
                    </div>
                    <div id="freeBallNext">
                        <label htmlFor="freeBall">Free ball for next turn:</label>
                        <input type="checkbox" id="freeBall" onChange={freeBallNext} ></input>
                    </div>
                    <div id="totalPointsConceded">Total points conceded: {totalPointsConceded}</div>
                    <div id="formButtons">
                        <input type="image" src={AddFoul} id="formAddFoul" alt="endturn" className="ball" disabled={disableAddFoul} onClick={addFoul} />
                        <input type="image" src={EndTurn} id="formEndTurn" alt="endturn" className="ball" onClick={foulEndTurn} />
                    </div>
                </form>
            </div>
        )
    };

    return (
        <div>
            <div id="breakCounterBG">
                <span id="breakCounter">Current break: <b>{breakCounter}</b></span>
            </div>

            <div id="scoreboard">
                <div id="p1Score" className="playerScore" onClick={() => scoreboardClick(1)}>{p1.score}
                    <div className="playerName">{p1Name}</div>
                </div>
                <div id="p2Score" className="playerScore" onClick={() => scoreboardClick(2)}>{p2.score}
                    <div className="playerName">{p2Name}</div>
                </div>
            </div>

            Reds left:&nbsp;<b>{redsLeft}&nbsp;</b>
            <div id="info">
                <p><span id="breakCounter">Current break:&nbsp;<b>{breakCounter}&nbsp;</b></span>
                    Possible points left:&nbsp;<b>{pointsLeft}&nbsp;</b>
                    Point difference:&nbsp;<b>{pointDifference}</b></p>

            </div>

            <div id="control">
                <div id="firstRow">
                    <input type="image" src={Red} disabled={disableRed} id="red" alt="red" className="ball" onClick={potRed} />
                    <input type="image" src={FoulBall} id="foul" alt="foul" className="ball" />
                    <input type="image" src={EndTurn} id="endturn" alt="endturn" className="ball" onClick={endTurn} />
                </div>
                <div className="break"></div>
                <div id="colors">
                    <div id="baulkColors">
                        <input type="image" src={Yellow} disabled={disableYellow} id="yellow" alt="yellow" className="ball" onClick={() => potColor(2, "yellow")} />
                        <input type="image" src={Green} disabled={disableGreen} id="green" alt="green" className="ball" onClick={() => potColor(3, "green")} />
                        <input type="image" src={Brown} disabled={disableBrown} id="brown" alt="brown" className="ball" onClick={() => potColor(4, "brown")} />
                    </div>
                    <div className="break"></div>
                    <div id="bigColors">
                        <input type="image" src={Blue} disabled={disableBlue} id="blue" alt="blue" className="ball" onClick={() => potColor(5, "blue")} />
                        <input type="image" src={Pink} disabled={disablePink} id="pink" alt="pink" className="ball" onClick={() => potColor(6, "pink")} />
                        <input type="image" src={Black} disabled={disableBlack} id="black" alt="black" className="ball" onClick={() => potColor(7, "black")} />
                    </div>
                </div>
            </div>
            <div>
                <Foul/>
            </div>
        </div>

    );
}

export default Scoreboard;