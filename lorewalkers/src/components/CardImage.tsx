import { useState } from "react";

import './CardImage.scss';
import LoadingSpinner from "./LoadingSpinner";


function CardImage({ card }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const src = `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card?.id}.png`

    return (
        <div className="hs-card-wrapper" key={card.id}>
            <div>
                <a href="#">
                    <img
                        className="hs-card"
                        onLoad={(e) => setIsLoading(false)}
                        src={src}
                        style={{display: isLoading ? "none" : "block"}}    
                    />
                    <div className="spinner">
                        <LoadingSpinner isLoading={isLoading} />
                    </div>
                </a>
            </div>
        </div>
    )
}

export default CardImage