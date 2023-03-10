import React from 'react'
import Card from './Card'

const CardList = (props) => {


    return (
        <div>
            <p>{props.details}</p>
            {props.dataArr.map((movieObject) => {
                return <Card key={movieObject.imdbID} basicInfo={movieObject} setIdForDetail={props.setIdForDetail} />
            }
            )
            }
        </div>
    )
}

export default CardList