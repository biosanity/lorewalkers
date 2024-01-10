import { useEffect, useMemo, useState } from 'react';
import './CardList.scss';
import LoadingSpinner from './LoadingSpinner';

function CardList({ data }: any) {
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const sortedCards = useMemo(() => {
        console.log('use memo')
        const cards = [...data];

        if (!sortBy) {
            return cards;
        }

        if (sortBy === 'rarity') {
            cards.sort((a, b) => {
                const rarityOrder = ["FREE", "COMMON", "RARE", "EPIC", "LEGENDARY"];
                const rarityA = rarityOrder.indexOf(a[sortBy]);
                const rarityB = rarityOrder.indexOf(b[sortBy]);

                return rarityA - rarityB;
            });
        } else {
            cards.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            });
        }

        return cards;
    }, [data, sortBy]);  

    return (
        <div>
            <h1>Cards ({data.length})</h1>
            <div className='card-sort-fields'>
                <label>Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value='' selected>None</option>
                    <option value='name'>Name</option>
                    <option value='cost'>Mana Cost</option>
                    <option value='rarity'>Rarity</option> 
                </select>
            </div>
            <div className='hs-card-img-container'>
                {sortedCards
                    .map((card: any) => (
                        <div className="hs-card-wrapper" key={card.id}>
                            {/* <LoadingSpinner isLoading={isLoading} /> */}
                            {/* {isLoading && <LoadingSpinner />} Show spinner while loading */}
                            {/* <div style={{display: isLoading ? "none" : "block"}}> */}
                            {/* <div> */}
                                <a href="#">
                                    <img
                                        className="hs-card"
                                        // onLoad={() => setTimeout(() => {
                                        //     setIsLoading(false)
                                        // }, 3000)}
                                        onLoad={() => setIsLoading(false)}
                                        loading="lazy"
                                        src={
                                            `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`
                                        }
                                        
                                    />
                                </a>
                            {/* </div> */}
                        </div>
                    ))}
            </div>
        </div>  
    )
  }

export default CardList; 