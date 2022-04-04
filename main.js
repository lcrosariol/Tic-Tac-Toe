/*----- constants -----*/
const lookup = {
  '1': 'X', 
  '-1': 'O', 
  'null': ' ', 
};



const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/

initialize();

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  // OR initialize like this:
  // board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}

function render() {
  board.forEach(function(sq, idx) {
    squares[idx].innerHTML = lookup[sq];
    // squares[idx].style
    // squares[idx].message.innerHTML = `${lookup[player].toUpperCase()}`;
        // if (lookup[sq] === 'red') {
        // render('X');
        // } else if (lookup[sq] === 'blue') {
        //     render('O');
        // } else {
        //     render('');
        // }
        // if lookup[sq] === 'red';
        //     squares[idx].style.backgroundImage ="https://i.imgur.com/tQeXE5O.jpg";
        // if($(lookup[sq]) contents == 'red'){$('td').html('X').show();
    // squares[idx].message.textContent = lookup[player];

    

  });
  if (winner === 'T') {
    message.innerHTML = "'Cat's Game!'";
  } else if (winner) {
    message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
  }
}

function handleMove(evt) {
  // obtain index of square
  const idx = parseInt(evt.target.id.replace('sq', ''));
  // check if square is available and return if not
  if (board[idx] || winner) return;
  // update state (board, turn, winner)
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  // Less elegant approach:
  // if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  // if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  // if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  // if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  // if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  // if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  // if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  // if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 'T';
}