import React  from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import './modalDetails.scss';

const blockName = 'modal-details';
const style = {
        overlay: {
            backgroundColor: "rgba(151, 206, 76, 0.1)",
            zIndex: 1,
        }, 
        content: {
            top : '60%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "40vw",
            height: "45vh",
            backgroundColor: "rgba(10,10,10,1)",
            border: "0",
        }
}
const detailsModal = (props) => {
    const { isOpen, modalClose, character} = props;
    const {name, image, location, species, status} = character;

    return(
        <Modal style={style} isOpen={isOpen} onRequestClose={modalClose}>
            <div className={`${blockName}__close`} onClick={modalClose}>
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </div>
            <div className={`${blockName}__container`}>
                <img className={`${blockName}__img`} src={image} alt='character'></img>
                <div className={`${blockName}__text-container`}>
                    <h2 className={`${blockName}__name`}>{name}</h2>
                    <div className={`${blockName}__text`}>
                        <div className={`${blockName}__text--highlight`}>Location </div>
                        {location  && location.name}
                    </div>
                    <div className={`${blockName}__text`}>
                        <div className={`${blockName}__text--highlight`}>Species </div>
                        {species}
                    </div>
                    <div className={`${blockName}__text`}>
                        <div className={`${blockName}__text--highlight`}>Status </div> 
                        <FontAwesomeIcon 
                            className={status === 'Alive' ? `${blockName}__text--alive` : `${blockName}__text--dead`}
                            icon={faCircle}>
                         </FontAwesomeIcon>
                        {status}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default detailsModal;