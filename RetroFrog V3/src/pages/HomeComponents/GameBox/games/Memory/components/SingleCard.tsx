import { Card } from "../Memory"

type SingleCardProps={
    card:Card,
    handleChoice:(card:Card)=>void,
    flipped:boolean,
    disabled:boolean,
}

export default function SingleCard({card, handleChoice, flipped, disabled}:SingleCardProps) {
    
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)  
        }
    }

    return(
        <div className='card'>
            <div className={flipped? "flipped" : "" }>
              <img className="front" src={card.src} alt="card front"></img>
              <img 
                className="back" 
                src="src/assets/games/memory/cover.png" 
                onClick={handleClick} 
                alt="card back">
                </img>
            </div>
        </div>
    )
}