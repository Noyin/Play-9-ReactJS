import React from 'react';

const Done = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again</button>
        </div>
    )
} 

export default Done;