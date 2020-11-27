import React from 'react';
import './card.scss';

const Card = ({ name, image, onClick }) => {
    const blockName = 'card';
    return (
        <>
        {image && <div className={blockName} onClick={onClick}>
            <img src={image} alt='character-img'></img>
            <div className={`${blockName}__name`}>{name}</div>
        </div>}
        </>
    );
}
export default Card;