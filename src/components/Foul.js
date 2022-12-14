import React, { useState } from "react";


function Foul() {

    // Points for opponent: 
    const [foulPoints, setFoulPoints] = useState(4);

    const decrementCount = (e) => {
        e.preventDefault();
        if (foulPoints > 4) {
            setFoulPoints(foulPoints - 1);
        }
    };

    const incrementCount = (e) => {
        e.preventDefault();
        if (foulPoints < 7) {
            setFoulPoints(foulPoints + 1);
        }
    };


    // Reds removed: 
    const [redsRemoved, setRedsRemoved] = useState(0);

    const decrementRedsRemoved = (e) => {
        e.preventDefault();
        if (redsRemoved > 0) {
            setRedsRemoved(redsRemoved - 1);
        }
    };

    const incrementRedsRemoved = (e) => {
        e.preventDefault();
        if (redsRemoved < 15) {
            setRedsRemoved(redsRemoved + 1);
        }
    }

    // Free ball for next turn:

    const [freeBall, setFreeBall] = useState(false);

    const freeBallNext = (e) => {
        if (e.target.checked) {
            setFreeBall(true);
        } else {
            setFreeBall(false);
        }
        console.log(freeBall);
    };

    // Buttons for submit
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Points awarded: " + foulPoints);
    }


    return (
        <form onSubmit={handleSubmit}>
            <div id="pointsForOpponent">
                <label>Points for opponent: </label>
                <button onClick={decrementCount}>-</button>
                {foulPoints}
                <button onClick={incrementCount}>+</button>
            </div>
            <div id="redsRemoved">
                <label>Reds removed: </label>
                <button onClick={decrementRedsRemoved}>-</button>
                {redsRemoved}
                <button onClick={incrementRedsRemoved}>+</button>
            </div>
            <div id="freeBallNext">
                <label htmlFor="freeBall">Free ball for next turn: </label>
                <input type="checkbox" id="freeBall" onChange={freeBallNext}/>
            </div>
            <div id="totalPointsConceded">Total points conceded: <b>4</b></div>
            <br />
            <button type="reset">Add foul</button>
            <br />
            <button type="submit">End turn</button>
        </form>
    )
};

export default Foul;