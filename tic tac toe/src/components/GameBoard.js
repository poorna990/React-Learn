//import  {useState} from 'react';



 export default function GameBoard({onSelectSquare, gameBoard}){

 //turns come from App component
 //previously we were computing gameboard within this component


	/* const[gb,setGB] = useState(initialGameBoard);
	 function handlePlay(rowIndex, columnIndex){
		 setGB((prevGB) => {
			 const updatedBoard = [...prevGB.map(innerArray => [...innerArray])];
			updatedBoard[rowIndex][columnIndex]=activePlayerSymbol;
			return updatedBoard;
		 } );
		 onSelectSquare();
	 }*/
	 
	return (
	<ol id="game-board">
			{gameBoard.map((row, index)=> (<li key={index}> 
	<ol>
			{row.map((playerSymbol, colIndex) => (<li key={colIndex}>
				<button onClick={() => onSelectSquare(index, colIndex)} disabled={playerSymbol !== null}>
					{playerSymbol}
				</button>
			</li>))
	}
	</ol>
	</li>
	))}
		
	</ol>
	 
	);
}