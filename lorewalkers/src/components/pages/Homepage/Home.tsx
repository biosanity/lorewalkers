import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import './Home.scss';
import { hsSets } from '../../../utils/card-details';
import CardList from '../../CardList';
import CardFilters from '../../CardFilters';

// TODO FIX ANYWHERE I'M USING 'ANY'

function Home() {
    const [baseCardData, setBaseCardData] = useState<any[]>([]);
    const [filteredCardData, setFilteredCardData] = useState<any[]>([]);
    const [searchedCard, setSearchedCard] = useState('');

    async function fetchCardData() {
        try {
          const response = await fetch('https://api.hearthstonejson.com/v1/185749/enUS/cards.collectible.json');
          const data = await response.json();
          // TODO - Figure out the best way to filter out dupes.
          const filteredResponseData = data.slice(0, 200).filter((card: any) => {
            return hsSets.some((set) => set.name === card.set); // Remove unnecessary sets
          });
          setBaseCardData(filteredResponseData);
          setFilteredCardData(filteredResponseData);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      const handleCardSearch = (event: any) => {
        setSearchedCard(event.target.value.toLowerCase());
      }

      const filteredCardSearch = baseCardData.filter((card) => {
        if (searchedCard === '' || searchedCard.length < 3) {
            return;
        } else {
            return card.name.toLowerCase().includes(searchedCard)
        }
      }).slice(0, 20);

    const handleFiltersChange = (
        selectedRarity: string | null, 
        selectedSet: string | null, 
        selectedClasses: Array<string>
    ) => {

        setFilteredCardData(() => {
             return baseCardData
                .filter((card) => {
                    return selectedRarity ? selectedRarity === card.rarity : true;
                })
                .filter((card) => {
                    return selectedSet ? selectedSet && selectedSet === card.set : true;
                })
                .filter((card) => {
                    return selectedClasses?.length > 0 
                    ? selectedClasses?.includes(card.cardClass)
                    : true;
                })
        });
    }

    useEffect(() => {
        fetchCardData();
    }, [])

    return(
        <div className='homepage'>
            <div className='page-banner'>
                <h1>LOREWALKERS</h1>
                <div className='search-filter'>
                    <div className='search-bar'>
                        <input 
                            type='text' 
                            placeholder='Search cards...' 
                            onChange={handleCardSearch} 
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' inverse className="filter-icon" />
                    </div>
                    {filteredCardSearch.length > 0 &&
                        <ul className="search-results">
                            {filteredCardSearch.map((card) => {
                            const matchingSet = hsSets.find((set) => set.name === card.set);

                            return (
                                <li key={card.id}>
                                <a href="">
                                    <span>{card.name}</span> 
                                    <br/>
                                    <em>{matchingSet?.label || ''}</em>
                                </a>
                                </li>
                            );
                            })}
                        </ul>
                    }
                </div>
                <div className='random-card-btn'>
                    <a>
                        <span>Random Card</span>
                        <FontAwesomeIcon icon={faArrowsRotate} inverse />
                    </a>
                </div>
            </div>
            <h1>Filters</h1>
            <CardFilters onFiltersChange={handleFiltersChange} />
            <hr></hr>
            <div>
                <CardList data={filteredCardData} />
            </div>
        </div>
    )
  }
  
  export default Home;