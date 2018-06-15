import React from 'react';

const Stars = (props) => {
    let stars = [];
    for (let i=0; i<props.randomNumberOfStars; i++) {
        stars.push(<i key={1} className="fa fa-star"></i>)
    }
    return (
        <div className="col-5">
            {stars}
        </div>
    )
} 

export default Stars;