import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const PlayerTurn = {
  playerX: 0,
  playerO: 1,
}

const BOARD_SIZE = 3

const Square = ({value, index, onUpdateBoard }) => {
  const handleClick = () => {
    if (value === 0) {
      onUpdateBoard(index)
    }
  }

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={handleClick}
    >
      { value > 0 ? 'X' : (value < 0 ? 'O' : ' ')}
    </div>
  )
}

const Board = () => {
  const [turn, setTurn] = useState(PlayerTurn.playerX)        // 0: X player, 1: O Player
  const [values, setValues] = useState(new Array(9).fill(0))  // 0: Initial state, 1: X player, -1: O Player
  const [winner, setWinner] = useState(null)

  const checkGameWinner = () => {
    const winStrategy = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]

    for (let i = 0; i < winStrategy.length; i++) {
      let sum = 0;
      for (let j = 0; j < winStrategy[i].length; j++) {
        sum += values[winStrategy[i][j]]
      }

      if (BOARD_SIZE === Math.abs(sum)) {
        setWinner(turn === PlayerTurn.playerX ? 'X' : 'O')
      }
    }
  }

  const handleReset = () => {
    setTurn(PlayerTurn.playerX)
    setValues(new Array(9).fill(0))
    setWinner(null)
  }

  const handleBoardUpdate = (index) => {
    if (winner) return

    values[index] = turn === PlayerTurn.playerX ? 1 : -1

    setTurn(1 - turn)
    setValues(values)

    checkGameWinner()
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{turn === PlayerTurn.playerX ? 'X' : 'O'}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner || 'None'}</span></div>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square key="square0" index={0} value={values[0]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square1" index={1} value={values[1]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square2" index={2} value={values[2]} onUpdateBoard={handleBoardUpdate} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square key="square3" index={3} value={values[3]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square4" index={4} value={values[4]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square5" index={5} value={values[5]} onUpdateBoard={handleBoardUpdate} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square key="square6" index={6} value={values[6]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square7" index={7} value={values[7]} onUpdateBoard={handleBoardUpdate} />
          <Square key="square8" index={8} value={values[8]} onUpdateBoard={handleBoardUpdate} />
        </div>
      </div>
    </div>
  )
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);