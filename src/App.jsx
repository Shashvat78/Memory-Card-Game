import { useState, useEffect } from "react";
import ScoreCard from "./components/scoreCard";
import CardGrid from "./components/cardGrid";
import shuffle from "./util/shuffle";

function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [difficulty, setDifficulty]=useState("easy");

  useEffect(() => {
    async function fetchData() {
      let limit=6;
      if(difficulty==="medium") limit=12;
      if(difficulty==="hard") limit=18;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await res.json();

      const results = await Promise.all(
        data.results.map(async (p) => {
          const details = await fetch(p.url).then((r) => r.json());
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );


      setCards(shuffle(results));
    }

    fetchData();
  }, [difficulty]);

  function handleCardClick(id) {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBest(Math.max(best, newScore));
      setClickedCards([...clickedCards, id]);
    }
    setCards(shuffle(cards));
  }

  return (
    <div className="min-h-screen w-screen bg-green-500 flex flex-col p-6">
      <div className="text-xl font-bold mb-4 flex flex-col items-center">
         <h1 >Memory Game</h1>
         <ScoreCard score={score} best={best} />
      </div>
      <div className="flex gap-4 mb-6">
  <button onClick={() => setDifficulty("easy")}
    className={`px-4 py-2 rounded-lg font-bold ${difficulty === "easy" ? "bg-blue-300 text-white" : "bg-gray-200"}`}  >
    Easy
  </button>
  <button
    onClick={() => setDifficulty("medium")}
    className={`px-4 py-2 rounded-lg font-semibold ${difficulty === "medium" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  >
    Medium
  </button>
  <button
    onClick={() => setDifficulty("hard")}
    className={`px-4 py-2 rounded-lg font-semibold ${difficulty === "hard" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
  >
    Hard
  </button>
  </div>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
    
  );
}

export default App;
