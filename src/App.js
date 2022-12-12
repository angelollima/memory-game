import { useEffect, useState } from "react";
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

const cardImages1 = [
  { "src": "/img/lua-sol-1.jpeg", matched: false },
  { "src": "/img/lua-sol-2.jpeg", matched: false },
  { "src": "/img/lua-sol-3.jpeg", matched: false },
  { "src": "/img/lua-sol-4.jpeg", matched: false },
  { "src": "/img/lua-sol-5.jpeg", matched: false },
  { "src": "/img/lua-sol-6.jpeg", matched: false },
  { "src": "/img/lua-sol-7.jpeg", matched: false },
  { "src": "/img/lua-sol-8.jpeg", matched: false },
  { "src": "/img/lua-sol-9.jpeg", matched: false },
]

function App() {

  const [images, setImages] = useState();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //shuffle cards
  const shuffleCards = (props) => {
    const shuffledCards = [...props, ...props]
      .sort(() => Math.random() - 0.5)
      .map((props) => ({ ...props, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  //handleChoice
  const handleChoice = (props) => {
    choiceOne ? setChoiceTwo(props) : setChoiceOne(props)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn();
        }, 500);
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  function closeDetails() {
    let detail = document.getElementById('detail')
    detail.removeAttribute("open")
  }

  return (
    <div className="w-[90vw] mx-auto">
      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl">Memory Card</p>
        <details id="detail" className="flex flex-col gap-4">
          <summary>Choose the theme</summary>
            <button
              onClick={() => { setImages("1"); closeDetails(); }}
              className="px-3 py-1 my-1 rounded-md text-white bg-zinc-400 cursor-pointer"
              >Moons</button>
            <button
              onClick={() => { setImages("2"); closeDetails(); }}
              className="px-3 py-1 my-1 rounded-md text-white bg-zinc-400 cursor-pointer"
            >Games</button>
        </details>
        {images ? 
          <button
          onClick={() => images === "1" ? shuffleCards(cardImages1) : shuffleCards(cardImages)}
          className="px-3 py-1 rounded-md text-white bg-zinc-400 cursor-pointer"
          >New Game</button> : ""}
      </div>

      <div className="mt-4 grid grid-cols-3 lg:grid-cols-6 gap-2">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
