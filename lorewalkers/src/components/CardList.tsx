import { useState } from 'react';
import './CardList.scss';

function CardList({ data }: any) {
    const [sortBy, setSortBy] = useState('');

    const sortCards = (property: string) => {
        const sortedCards = [...data];

        if (!property) { return sortedCards }

        sortedCards.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });

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
                    {/* FIX RARITY TO SHOW IN ORDER COMMON/RARE/EPIC/LEGENDARY */}
                    <option value='rarity'>Rarity</option> 
                </select>
            </div>
            <div className='hs-card-img-container'>
                {sortCards(sortBy)
                    .map((card: any) => (
                        <img
                            key={card.id}
                            className='hs-card'
                            src={
                                `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`
                            }
                        />
                    ))}
            </div>
        </div>  
    )
  }
  
  export default CardList; 