import { useMemo, useState } from 'react';
import './CardList.scss';
import CardImage from './CardImage';

const imagePerRow = 30;

function CardList({ data }: any) {
    const [sortBy, setSortBy] = useState(''); 
    const [next, setNext] = useState(imagePerRow);

    const sortedCards = useMemo(() => {
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

    const handleMoreImage = () => {
        setNext(next => Math.min(next + imagePerRow, sortedCards.length))
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
            <div  className="hs-card-img-container">
                {sortedCards?.slice(0, next)?.map((card) => {
                    return (
                        <div>
                            <CardImage card={card} />
                        </div>
                    );
                })}
            </div>

            {sortedCards.length > next ? (
                <div className='lw-btn'>
                    <a onClick={handleMoreImage}>
                        <span>Load More Images</span>
                    </a>
                </div>
            ) : (
                <div className='results-end-message'>
                    <p>Job's Done!</p>
                </div>
            )}
        </div>  
    )
  }

export default CardList; 