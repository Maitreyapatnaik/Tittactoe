/* import React, { useState } from 'react'
import './App.css'

function App() {
  
  let flag = 1;
  const[count, setCount] = useState(1)

function Checkwin(){

 

  const winCombo =[
    [0,1,2],   
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]    
  ]
    let c =[];


    for(let i=0; i<=8;i++){
      c.push(document.getElementById(`cell${i}`).innerHTML)
    }

    for(let x of winCombo){
      if(x.every(index => c[index]===player)){
        document.getElementById('result').innerHTML=player + " is winner"
        flag=0
        console.log(flag)
      }
    }
    

    
  }

  const[player, setPlayer] = useState('O')

  function Add(index){

    if(flag===1){
      if((document.getElementById(index).innerHTML==="")){
        if(player=='X'){
          document.getElementById(index).innerHTML=player
          Checkwin()
          setPlayer('O')
        }
        else{
          document.getElementById(index).innerHTML=player
          setCount(count+1)
          console.log(count)
          Checkwin()
          setPlayer('X')
        }
      }
      else{
        alert('Not allowed')
      }
    }

     
    
  }
  

  return (

    <>
      <div className="main">
      <h1>Tic Tac Toe</h1>
        <div className="board">
          
          

            <div className="cell" id="cell0" onClick={()=>{Add('cell0','c0')}}></div>

            <div className="cell" id="cell1" onClick={()=>{Add('cell1')}}></div>
            <div className="cell" id="cell2" onClick={()=>{Add('cell2')}}></div>
            <div className="cell" id="cell3" onClick={()=>{Add('cell3')}}></div>
            <div className="cell" id="cell4" onClick={()=>{Add('cell4')}}></div>
            <div className="cell" id="cell5" onClick={()=>{Add('cell5')}}></div>
            <div className="cell" id="cell6" onClick={()=>{Add('cell6')}}></div>
            <div className="cell" id="cell7" onClick={()=>{Add('cell7')}}></div>
            <div className="cell" id="cell8" onClick={()=>{Add('cell8')}}></div>
        </div>
        <h1>Player {player}'s turn</h1>
        <button onClick={()=>{window.location="/"}}>Restart</button>
        <h1 id="result"></h1>
    </div>
    </>
    
  )
}
export default App
*/
import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('O');
  const [winner, setWinner] = useState(null);

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(board) {
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function handleCellClick(index) {
    // Prevent moves if there's already a winner or the cell is occupied
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner); // Stop the game if there's a winner
    } else if (newBoard.every(cell => cell)) {
      setWinner('Draw'); // Stop the game if it's a draw
    } else {
      setPlayer(player === 'O' ? 'X' : 'O'); // Switch player if the game continues
    }
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setPlayer('O');
    setWinner(null);
  }

  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner ? (
        <h1>{winner === 'Draw' ? "It's a Draw!" : `${winner} is the Winner!`}</h1>
      ) : (
        <h1>Player {player}'s turn</h1>
      )}
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

export default App;

