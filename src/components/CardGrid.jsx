import Card from "./card";

function CardGrid({cards,onCardClick}){
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cards.map((card) => (
           <Card
          key={card.id}
          name={card.name}
          image={card.image}
          onClick={() => onCardClick(card.id)}
           />
      ))}
        </div>
    );
}

export default CardGrid