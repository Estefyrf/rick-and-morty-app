import React from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import './loader.scss';

const Loader = () => {
    const blockName = 'loader';
    return (
        <div className={blockName}>
            <FontAwesomeIcon icon={faCircleNotch} spin/>
        </div>
    );
}
export default Loader;
