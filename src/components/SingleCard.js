import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped }) {

  const handleClick = () => {
    handleChoice(card)
  }
  
  return (
    <div className="card relative">
      <div className={flipped ? "flipped" : ""}>
        <img className="front rounded-lg" src={card.src} alt="front-card" />
        <img
          className="back block rounded-lg"
          src="/img/cover.png"
          alt="back-card"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
