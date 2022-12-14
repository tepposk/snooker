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

function Frame(props) {

    // Player info
    const [p1, setP1] = useState({
        name: props.p1, score: 0, active: true
    });
    const [p2, setP2] = useState({
        name: props.p2, score: 0, active: false
    });

    const p1Name = p1.name.charAt(0).toUpperCase() + p1.name.slice(1);
    const p2Name = p2.name.charAt(0).toUpperCase() + p2.name.slice(1);

    const [activePlayer, setActivePlayer] = useState(p1Name);
    const [passivePlayer, setPassivePlayer] = useState(p2Name);

    // Info screen stuff
    const [redsLeft, setRedsLeft] = useState(props.reds);
    let pointsLeft = (redsLeft * 8) + 27; // Highest possible amount of points left on the table without fouls
    let pointDifference = (Math.abs(p1.score - p2.score)); // Difference between leading and trailing player

    const [breakCounter, setBreakCounter] = useState(0); // Counts points of current break. Updated after every pot

    const [turnInProgress, setTurnInProgress] = useState(false); // Set to true when a player pots a ball and false when their turn ends
    const [disableRed, setDisableRed] = useState(false); // Used to disable the red ball at the end of the frame
    const [redPottedPreviously, setRedPottedPreviously] = useState(false); // Used to determine frame progress when redsLeft reaches 0 

    // Control when the colors are available or not
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

    const toggleActivePlayer = () => {

        if (p1.active) {
            document.getElementById("p1Score").style.backgroundColor = "#2a2a2a";
            document.getElementById("p2Score").style.backgroundColor = "#424242";
            setActivePlayer(p2Name);
            setPassivePlayer(p1Name);
        } else {
            document.getElementById("p1Score").style.backgroundColor = "#424242";
            document.getElementById("p2Score").style.backgroundColor = "#2a2a2a";
            setActivePlayer(p1Name);
            setPassivePlayer(p2Name);
        };

        setP1(prevState => ({
            ...prevState, active: !prevState.active
        }));
        setP2(prevState => ({
            ...prevState, active: !prevState.active
        }));
    };

    const [noRedsLastPottedColor, setNoRedsLastPottedColor] = useState(1); // Used to control the active color after a foul when there's no reds left

    // Called when there are no more reds on the table. Value determines which ball(s) to (de)activate
    const noRedsLeft = (value) => {
        setRedPottedPreviously(false);
        disableColors();
        console.log("noRedsLeft(" + value + ")");
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
            // This should end Frame(); automatically
        }
        setNoRedsLastPottedColor(value);
    };

    const potRed = () => {
        setTurnInProgress(true);
        setRedPottedPreviously(true);
        if (p1.active) {
            setP1(prevState => ({
                ...prevState, score: prevState.score + 1
            }));
            console.log(p1.name + " potted a red");
        } else {
            setP2(prevState => ({
                ...prevState, score: prevState.score + 1
            }));
            console.log(p2.name + " potted a red");
        };
        setRedsLeft(redsLeft - 1);
        if (redsLeft === 1) {
            setDisableRed(true);
        };
        setBreakCounter(breakCounter + 1);
        enableColors();
    };

    const endTurn = () => {
        setTurnInProgress(false);
        setRedPottedPreviously(false);

        /*         // Change active player
                if (p1.active) {
                    document.getElementById("p1Score").style.backgroundColor = "#2a2a2a";
                    document.getElementById("p2Score").style.backgroundColor = "#424242";
                    setActivePlayer(p2Name);
                    setPassivePlayer(p1Name);
                } else {
                    document.getElementById("p1Score").style.backgroundColor = "#424242";
                    document.getElementById("p2Score").style.backgroundColor = "#2a2a2a";
                    setActivePlayer(p1Name);
                    setPassivePlayer(p2Name);
                };
        
                setP1(prevState => ({
                    ...prevState, active: !prevState.active
                }));
                setP2(prevState => ({
                    ...prevState, active: !prevState.active
                })); */

        // Check what happens next
        if (redsLeft > 0) {
            disableColors();
        } else if (redPottedPreviously) {
            noRedsLeft(1);
        };
        if (breakCounter > 0) {
            console.log("Turn ended");
        };
        setBreakCounter(0);
        toggleActivePlayer();
        document.getElementById("breakCounter").style.visibility = "hidden";
    };

    // value & name are passed as parameters from the control buttons
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
        document.getElementById("breakCounter").style.visibility = "visible";
    };

    // Change active player by clicking their name/score on the scoreboard. Only available when no pots have been made (a turn is not in progress)
    const scoreboardClick = (value) => {
        if ((value === 1 && p1.active) || (value === 2 && p2.active)) {
            // Do nothing
        } else if (turnInProgress) {
            // This should probably flash/highlight "End turn" button to guide the user
        } else {
            endTurn();
        }
    };

    // Returns the control buttons i.e. the balls 
    function Control() {

        return (
            <div id="control">
                <div id="firstRow" className="ballRow">
                    <input type="image" src={Red} disabled={disableRed} id="red" alt="red" className="ball" onClick={potRed} />
                    <input type="image" src={FoulBall} id="foul" alt="foul" className="ball" onClick={() => openFoulMenu(redsLeft)} />
                    <input type="image" src={EndTurn} id="endturn" alt="endturn" className="ball" onClick={endTurn} />
                </div>
                <div className="break"></div>
                <div id="colors">
                    <div id="baulkColors" className="ballRow">
                        <input type="image" src={Yellow} disabled={disableYellow} id="yellow" alt="yellow" className="ball" onClick={() => potColor(2, "yellow")} />
                        <input type="image" src={Green} disabled={disableGreen} id="green" alt="green" className="ball" onClick={() => potColor(3, "green")} />
                        <input type="image" src={Brown} disabled={disableBrown} id="brown" alt="brown" className="ball" onClick={() => potColor(4, "brown")} />
                    </div>
                    <div className="break"></div>
                    <div id="bigColors" className="ballRow">
                        <input type="image" src={Blue} disabled={disableBlue} id="blue" alt="blue" className="ball" onClick={() => potColor(5, "blue")} />
                        <input type="image" src={Pink} disabled={disablePink} id="pink" alt="pink" className="ball" onClick={() => potColor(6, "pink")} />
                        <input type="image" src={Black} disabled={disableBlack} id="black" alt="black" className="ball" onClick={() => potColor(7, "black")} />
                    </div>
                </div>
                <div className="break"></div>
                {/* <div><button>print log</button></div> */}
            </div>
        )
    };

    // Called by the "Foul" ball
    const openFoulMenu = () => {
        setDisplay("foul");
    };

    // Called by the close icon on the foul menu
    const closeFoulMenu = () => {
        setDisplay("control");
    };

    // Foul menu
    function FoulMenu() {

        const dynamicFoulPoints = () => {
            if (noRedsLastPottedColor > 3) {
                return (
                    noRedsLastPottedColor + 1
                )
            } else {
                return (
                    4
                )
            }
        };

        const [fouls, setFouls] = useState(1); // Displays the amount of fouls in a row to help the user keep track
        const [foulPoints, setFoulPoints] = useState(dynamicFoulPoints);
        const [totalPointsConceded, setTotalPointsConceded] = useState(foulPoints); // Amount of points conceded from consecutive fouls


        const [disableDecrementCount, setDisableDecrementCount] = useState(true);
        const [disableIncrementCount, setDisableIncrementCount] = useState(false);

        const [foulMenuRedsLeft, setFoulMenuRedsLeft] = useState(redsLeft); // Updated when the foul menu is open and used to update redsLeft on the main app when the menu is closed

        const decrementCount = () => {
            if (foulPoints > 4) {
                setFoulPoints(foulPoints - 1);
                setTotalPointsConceded(totalPointsConceded - 1);
            }
            if (foulPoints === 5) {
                setDisableDecrementCount(true);
            }
            setDisableIncrementCount(false);
        };

        const incrementCount = () => {
            if (foulPoints < 7) {
                setFoulPoints(foulPoints + 1);
                setTotalPointsConceded(totalPointsConceded + 1);
            }
            if (foulPoints === 6) {
                setDisableIncrementCount(true);
            }
            setDisableDecrementCount(false);
        };

        const [redsRemoved, setRedsRemoved] = useState(0);

        const [disableDecrementReds, setDisableDecrementReds] = useState(true);
        const [disableIncrementReds, setDisableIncrementReds] = useState(false);

        const decrementRedsRemoved = () => {
            if (redsRemoved > 0) {
                setRedsRemoved(redsRemoved - 1);
            }

            if (redsRemoved === 1) {
                setDisableDecrementReds(true);
            }
            setDisableIncrementReds(false);
        };

        const incrementRedsRemoved = () => {
            if (redsRemoved < foulMenuRedsLeft) {
                setRedsRemoved(redsRemoved + 1);
            }
            setDisableDecrementReds(false);
            if (redsRemoved === foulMenuRedsLeft - 1) {
                setDisableIncrementReds(true);
            }
        };

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

        // Lets user add consecutive fouls without closing the foul menu in between
        const addFoul = () => {
            setTotalPointsConceded(totalPointsConceded + foulPoints);
            setFoulMenuRedsLeft(foulMenuRedsLeft - redsRemoved);
            setTotalPointsConceded(totalPointsConceded + foulPoints);
            setRedsRemoved(0);
            setFouls(fouls + 1);
        };

        // Ends the turn, closes the foul menu and adds the conceded points to the point tally in the main app
        const foulEndTurn = () => {
            setFoulMenuRedsLeft(foulMenuRedsLeft - redsRemoved);
            setRedsLeft(foulMenuRedsLeft - redsRemoved);
            if (p1.active) {
                setP2(prevState => ({
                    ...prevState, score: prevState.score + totalPointsConceded
                }))
                console.log(totalPointsConceded + " foul points awarded to " + p2.name);
            } else {
                setP1(prevState => ({
                    ...prevState, score: prevState.score + totalPointsConceded
                }))
                console.log(totalPointsConceded + " foul points awarded to " + p1.name);
            };
            console.log("foulMenuRedsLeft - redsRemoved: " + (foulMenuRedsLeft - redsRemoved));
            console.log("foulMenuRedsLeft :" + foulMenuRedsLeft);
            console.log("redsRemoved :" + redsRemoved);
            console.log("noRedsLastPottedColor :" + noRedsLastPottedColor);
            if ((foulMenuRedsLeft - redsRemoved) === 0) {
                setDisableRed(true);
                noRedsLeft(noRedsLastPottedColor);
            };
            closeFoulMenu();
            toggleActivePlayer();
            //endTurn();
        };

        // Foul menu 
        return (
            <div id="foulMenu">
                <button id="close" onClick={() => closeFoulMenu()}><b>&#x2715;</b></button>
                <h3>FOUL BY {activePlayer.toUpperCase()}:</h3>
                <div>foulMenuRedsLeft: {foulMenuRedsLeft}</div>
                <div id="pointsForOpponent">
                    <label>Points for {passivePlayer}:</label>
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
                <nobr>Fouls: {fouls}</nobr><br />
                <nobr className="totalPointsConceded">Total points conceded: <b>{totalPointsConceded}</b></nobr>
                <div id="foulButtonsArea">
                    <div className="buttonWrapper">
                        <button id="foulConfirm" className="foulButtons" onClick={() => foulEndTurn()}>Confirm</button>
                    </div>
                    <div>
                        <div id="or">or</div>
                    </div>
                    <div className="buttonWrapper">
                        <button id="addAnotherFoul" className="foulButtons" onClick={() => addFoul()}>+ Add another foul</button>
                    </div>
                </div>
            </div>
        )
    };

    const [display, setDisplay] = useState("control"); // Used to control what the app displays with "Display" function, alternates between control/foul menu

    // Controls what the app displays below the scoreboard
    function Display() {
        if (display === "control") {
            return (
                <Control />
            )
        } else {
            return (
                <FoulMenu />
            )
        }
    };

    // Renders the scoreboard to the top of the page, and keeps it open for as long as the frame is live
    return (
        <div>
            <div id="scoreboard">
                <div id="p1Score" className="playerScore" onClick={() => scoreboardClick(1)}>{p1.score}
                    <div className="playerName">{p1Name.toUpperCase()}</div>
                </div>
                <div id="p2Score" className="playerScore" onClick={() => scoreboardClick(2)}>{p2.score}
                    <div className="playerName">{p2Name.toUpperCase()}</div>
                </div>
            </div>

            <div id="breakCounter">
                Break: <b>{breakCounter}</b>
            </div>

            Reds left:&nbsp;<b>{redsLeft}&nbsp;</b>
            <div id="info">
                <p><span id="breakCounter">Current break:&nbsp;<b>{breakCounter}&nbsp;</b></span>
                    Possible points left:&nbsp;<b>{pointsLeft}&nbsp;</b>
                    Point difference:&nbsp;<b>{pointDifference}</b></p>
            </div>
            <div>
                <Display />
            </div>
        </div>

    );
}

export default Frame;