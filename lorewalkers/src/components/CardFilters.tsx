import React, { useState } from 'react';

import './CardFilters.scss';
import { hsClasses, hsSets, hsRarity } from '../utils/card-details';

function CardFilters({ onFiltersChange }: any) {
    const [selectedRarity, setSelectedRarity] = useState('None');
    const [selectedSet, setSelectedSet] = useState('None');
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    
const handleRarityChange = (event: any) => {
    setSelectedRarity(event.target.value);
    onFiltersChange(event.target.value, selectedSet, setSelectedClasses);
}

const handleSetChange = (event: any) => {
    setSelectedSet(event.target.value);
    onFiltersChange(selectedRarity, event.target.value, setSelectedClasses);
}

const handleClassChange = (className: any) => {
    const updatedClasses = selectedClasses.includes(className)
      ? selectedClasses.filter((item) => item !== className)
      : [...selectedClasses, className];

    setSelectedClasses(updatedClasses);
    onFiltersChange(selectedRarity, selectedSet, updatedClasses);
  };

    return (
       <div className="card-filters">
            <div className="card-detail-filters">
                <label>Rarity:</label>
                <select className="card-rarity-filter" onChange={(e) => handleRarityChange(e)}>
                    <option selected>None</option>
                    {hsRarity.map((item: any, index:number) => (
                        <option key={index} value={item.name}>{item.label}</option>
                    ))}
                </select>
                <label>Set:</label>
                <select className="card-set-filter" onChange={(e) => handleSetChange(e)}>
                    <option selected>None</option>
                    {hsSets.map((item: any, index:number) => (
                        <option key={index}>{item.label}</option>
                    ))}
                </select>
            </div>
            <div className="class-filters">
                {hsClasses.map((item: any, index: number) => (
                    <div className="class-filter-btn" key={index}>
                        <input 
                            type="checkbox" 
                            id={item.name}
                            checked={selectedClasses.includes(item.name)}
                            onChange={() => handleClassChange(item.name)} 
                        />
                        <label 
                            htmlFor={item.name}
                            style={{ backgroundColor: hsClasses[index].color }}
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
       </div>
    )
  }
  
  export default CardFilters; 