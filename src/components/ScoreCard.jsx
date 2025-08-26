function ScoreCard({ score, best }) {
  return (
    <div className="flex gap-6 text-xl mb-6">
      <p>Score: {score}</p>
      <p>Best: {best}</p>
    </div>
  );
}

export default ScoreCard;
