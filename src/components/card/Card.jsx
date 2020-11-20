import React from 'react';
import './card.scss';

const Card = ({ name, image }) => {
    const blockName = 'card';
    return (
        <div className={blockName}>
            <img src={image} alt='character-img'></img>
            {image && <div className={`${blockName}__name`}>{name}</div>}
        </div>
    );
}
export default Card;