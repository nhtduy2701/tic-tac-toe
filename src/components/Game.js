import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let location;
    if (move > 0) {
      const prevSquares = history[move - 1];
      let [r, c] = [null, null];
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== prevSquares[i]) {
          r = Math.floor(i / 3);
          c = i % 3;
          location = "(" + r + ", " + c + ")";
        }
      }
      description = "Go to move #" + move + location;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <div>
            You are at move #{currentMove} {location}
          </div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  function toggleSort() {
    setIsAscending(!isAscending);
  }
  const sortMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSort}>
          {isAscending ? "Descending" : "Ascending"}
        </button>
        <ol>{sortMoves}</ol>
      </div>
    </div>
  );
}
