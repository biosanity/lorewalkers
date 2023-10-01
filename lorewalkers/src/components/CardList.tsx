import { useEffect, useState } from 'react';
import './CardList.scss';
import LoadingSpinner from './LoadingSpinner';

function CardList({ data }: any) {
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const sortCards = (property: string) => {
        const sortedCards = [...data];
    
        if (!property) {
            return sortedCards;
        }
    
        if (property === 'rarity') {
            sortedCards.sort((a, b) => {
                const rarityOrder = ["FREE", "COMMON", "RARE", "EPIC", "LEGENDARY"];
                const rarityA = rarityOrder.indexOf(a[property]);
                const rarityB = rarityOrder.indexOf(b[property]);
    
                if (rarityA < rarityB) {
                    return -1;
                }
                if (rarityA > rarityB) {
                    return 1;
                }
                return 0;
            });
        } else {
            sortedCards.sort((a, b) => {
                if (a[property] < b[property]) {
                    return -1;
                }
                if (a[property] > b[property]) {
                    return 1;
                }
                return 0;
            });
        }
    
        return sortedCards;
    };    

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
                {sortCards(sortBy)
                    .map((card: any) => (
                        <div className="hs-card-wrapper" key={card.id}>
                            <LoadingSpinner isLoading={isLoading} />
                            <div style={{display: isLoading ? "none" : "block"}}>
                                <a href="#">
                                    <img
                                        className="hs-card"
                                        onLoad={() => setTimeout(() => {
                                            setIsLoading(false)
                                        }, 3000)}
                                        src={
                                            `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`
                                        }
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </div>  
    )
  }
  
  export default CardList; 