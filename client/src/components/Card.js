import React from 'react'

const Card = (props) => {

    const details = () => {
        props.setIdForDetail(props.basicInfo.imdbID)
        console.log("details " + props.basicInfo.imdbID)
    }
    return (
        <div style={{ margin: 20 }}>
            <span>{props.basicInfo.Title}</span>
            <button onClick={() => { details() }}>Interested</button>
        </div>
    )
}

export default Card