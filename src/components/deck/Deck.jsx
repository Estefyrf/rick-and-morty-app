import React, { useCallback, useEffect, useRef, useState } from 'react';
import rickAndMorty from 'api';
import { Card, Loader, DetailsModal} from 'components';
import './deck.scss';

const blockName = 'deck';
const maxCharacterId = 591;
const pageLength = 8;
const maxPageNumber = maxCharacterId / pageLength;

const Deck =  () => {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState({});
    const intersectionElement = useRef(null);
    const deckContainer = useRef(null);

    const closeModal = () => {
        setIsOpen(false);
    }

    const getCharacters = useCallback(() => {
        if(nextPage === maxPageNumber){    
            return;
        }
        const fetchData = async () => {
            if (!characters[nextPage * pageLength]) {
                setIsFetching(true);
                const response =  await rickAndMorty.getCharacters(nextPage);
                setIsFetching(false);
                setCharacters([...characters, ...response.data]);   
            }

            setNextPage(nextPage + 1);
        }
        fetchData();
    }, [nextPage, characters]);

    useEffect(() => {
        const options =  {
            root: deckContainer.current,
            rootMargin: '0px',
            threshold: .25,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting) {
                getCharacters();
            }
        }, options);

        if (intersectionElement && intersectionElement.current) {
            observer.observe(intersectionElement.current);
        }

        return () => { 
            let element = intersectionElement;
            return observer.unobserve(element.current);
        }
    }, [getCharacters]);

    return (
        <>
            <div ref={deckContainer} className={blockName}>
                {characters.map((character, index) => {
                    const { name, image } = character;
                    return (
                        <Card 
                        key={`card-${name}-${index}`} 
                        name={name} 
                        image={image} 
                        onClick = {
                            () => {
                                console.log('clicked');
                                setIsOpen(true);
                                setSelectedCharacter(character);
                            }
                        }/>
                    )
                })}
                
                {nextPage === maxPageNumber
                ? <div className={`${blockName}__max-characters`} ref={intersectionElement}>You have seen all the characters</div> 
                : <div className={`${blockName}__loader`} ref={intersectionElement}>.{ isFetching && <Loader/> }</div>}
            </div>
            <DetailsModal isOpen={isOpen} character={selectedCharacter} modalClose={closeModal}/>
        </>
    )
}
export default Deck;