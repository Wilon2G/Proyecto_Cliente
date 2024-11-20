import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

// Definir el tipo de las tarjetas
export interface Card {
  id: number;
  src: string;
  matched: boolean;
}

const cardImages: Omit<Card, 'id'>[] = [
  { "src": "src/assets/games/memory/helmet-1.png", matched: false },
  { "src": "src/assets/games/memory/potion-1.png", matched: false },
  { "src": "src/assets/games/memory/ring-1.png", matched: false },
  { "src": "src/assets/games/memory/scroll-1.png", matched: false },
  { "src": "src/assets/games/memory/shield-1.png", matched: false },
  { "src": "src/assets/games/memory/sword-1.png", matched: false }
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisable(false);
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // return
  return (
    <div className="MemoryGame">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard  
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disable}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
