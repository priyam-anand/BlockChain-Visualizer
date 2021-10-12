import React from 'react'
import './card.css'
const Card = ({ cardTitle, cardText, cardImg }) => {
    return (
        <>
            <div className="card card-width my-5">
                <img className="card-img-top card-img-custom" src={cardImg} alt="" />
                <div className="card-body">
                    <h5 className="card-title text-center">{cardTitle}</h5>
                    <p className="card-text text-left">{cardText}</p>
                    <button className="btn btn-outline-primary">
                        Read More
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card
