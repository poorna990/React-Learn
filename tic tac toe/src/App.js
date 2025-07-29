import logo from './logo.svg';
import Player from './components/Player.js';
import GameOver from './components/GameOver.js';
import {useState} from 'react';
import GameBoard from './components/GameBoard.js';
import Log from './components/Log.js';
import './App.css';

//import './winning-combinations.js';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]


];
function updatePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O';

    return currentPlayer;
}

function App() {
    const[players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2'

    });
   // const[activePlayer, setActivePlayer]=useState('X');
    const [gameTurns, setGameTurns] = useState([]);
   
    const activePlayer = updatePlayer(gameTurns);
    let gb =[...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gb[row][col] = player;

    }
    let winner;
    
    for (const combo of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gb[combo[0].row][combo[0].column];
        const secSquareSymbol = gb[combo[1].row][combo[1].column];
        const thirdSquareSymbol = gb[combo[2].row][combo[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            //earlier used only symbol // winner = firstSquareSymbol;
            //usestate to get platers name 
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;
    function handleSelectSquare(rowIndex, colIndex){
        
       // setActivePlayer((currentActivePlayer)=> currentActivePlayer==='X'? 'O':'X');


        setGameTurns(prevTurns => {
            const currentPlayer = updatePlayer(prevTurns);
            const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]; //update in an immutable way
     console.log(updatedTurns);
            return updatedTurns; 
        });
        
    }

    function handleRestart() {
        setGameTurns([]);

    }

    function handleNameChange(symbol, newName) {
        //update state based on oldState
        setPlayers(prevPlayers => {
            return {
                //other playername which was not changed
                ...prevPlayers,
                //javascript concept(not react concept) to update specific key with changed player name
                [symbol]: newName
            };
        }
        );
    }
  return <main>
    <div id="game-container"> 
          <ol id="players" className="highlight-player">
              <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handleNameChange} />
              <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handleNameChange} />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRestart}></GameOver> }
          <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gb}/>
    </div>

    <Log turns={gameTurns}/>
  </main>
}

export default App;
