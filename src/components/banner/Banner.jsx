import React from 'react';
import Logo from 'images/logo.png';
import './banner.scss';

const Banner = () => {
    const blockName = 'banner';
    return(
        <div className={blockName}>
            <img src={Logo} alt='logo' className={`${blockName}__logo`}/>
        </div>
    );
} 
export default Banner;