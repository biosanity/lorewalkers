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

    async function fetchCardData() {
        try {
          const response = await fetch('https://api.hearthstonejson.com/v1/185749/enUS/cards.collectible.json');
          const data = await response.json();
      
          // TODO - Figure out the best way to filter out dupes.
          const filteredResponseData = data.slice(0, 50).filter((card: any) => {
            return hsSets.some((set) => set.name === card.set); // Remove unnecessary sets
          });
      
          setBaseCardData(filteredResponseData);
          setFilteredCardData(filteredResponseData);
        } catch (error) {
          console.error('Error:', error);
        }
      }

    const handleFiltersChange = (
        selectedRarity: string, 
        selectedSet: string, 
        selectedClasses: Array<string>
    ) => {
        setFilteredCardData((prevCardData) => {
            const newData = [...baseCardData].filter((card) => {
                  return card.rarity === selectedRarity;
                });
            return newData;
        });
    }

    useEffect(() => {
        fetchCardData();
    }, [])

    return(
        <div className='homepage'>
            <div className='page-banner'>
                <h1>LOREWALKERS</h1>
                <div className='main-search-bar'>
                    <input type='text' placeholder='Search cards...' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' inverse className="filter-icon" />
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