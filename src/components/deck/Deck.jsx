import React, { useCallback, useEffect, useRef, useState } from 'react';
import rickAndMorty from 'api';
import { Card, Loader} from 'components';
import './deck.scss';

const Deck =  () => {
    const blockName = 'deck';
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const loader = useRef(null);
    const deckContainer = useRef(null);

    const getCharacters = useCallback(() => {
        const fetchData = async () => {
            setIsFetching(true);
            const response =  await rickAndMorty.getCharacters(nextPage);
            console.log('--->',response);
            setIsFetching(false);
            setCharacters([...characters, ...response.data.results]);
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

        if (loader && loader.current) {
            console.log("LoaderElement");
            observer.observe(loader.current);
        }

        return () => { 
            let loaderElement = loader;
            return observer.unobserve(loaderElement.current);
        }
    }, [getCharacters]);

    return(
        <div className={blockName}>
            <div ref={deckContainer} className={`${blockName}__container`}>
                {characters.map((character) => {
                    const { name, image } = character;
                    return(
                        <Card key={`card-${name}`} name={name} image={image} />
                    )  
                })}
                <div className={`${blockName}__line-break`}/>
                <div ref={loader}>{ isFetching && <Loader/> }</div>
            </div>
        </div>
    )
}
export default Deck;