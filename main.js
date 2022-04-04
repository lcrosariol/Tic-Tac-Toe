// Well I worked all weekend and didn't come up with much to add to the solution.  I was able to get the X's and O's to show up, and made some styling changes to the game.
// I was not able to come up with a way to change things up.  I looked at many other people's code and learned some new things but was not able to apply them.  




/*----- constants -----*/

// const
//1) Define required constants:
//	1.1) Define a colors object with keys of 'null' (when the square is empty), 
//       and players 1 & -1. The value assigned to each key represents the color 
//       to display for an empty square (null), player 1 and player -1.

const lookup = {
  '1': 'X', 
  '-1': 'O', 
  'null': ' ', 
};

//	1.2) Define the 8 possible winning combinations, each containing three 
//       indexes of the board that make a winner if they hold the same player value.

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//var - used to track the state of the game
//    -Store elements on the page that will be accessed in code more 
//     than once in variables to make code more concise, readable and performant.

//2) Define required variables used to track the state of the game:
//	2.1) Use a board array to represent the squares.	
//  2.2) Use a turn variable to remember whose turn it is.
//	2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', choices);
document.querySelector('button').addEventListener('click', initialize);

//3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
//	3.1) Store the 9 elements that represent the squares on the page.

// let squaresOnGameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]

//4) Upon loading the app should:
//	4.1) Initialize the state variables:
//		4.1.1) Initialize the board array to 9 nulls to represent empty squares. 
//              The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.

/*----- functions -----*/

initialize();

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  // OR initialize like this:
  // board = new Array(9).fill(null);
  turn = 1;

//		4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.

  winner = null;

//              Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 

  render();
}



// The render() function's responsibility is to transfer all state to the DOM. This includes the hiding/showing of parts of the 
//  UI based upon the application's state. For example, when a hand is in play in a game of Blackjack, the render() function would 
//  show the hit/stand buttons and hide the betting-related buttons. 

//  Also, if the render() function becomes too large, you can break 
//  it up into smaller functions, e.g., renderScores(),


//	4.2) Render those state variables to the page:
//		4.2.1) Render the board:
//			4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
//				4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
//				4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).


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

//	4.3) Wait for the user to click a square
//event listeners -player clicking on a square
//                -player clicking on a reset button


//5) Handle a player clicking a square:
//	5.1) Obtain the index of the square that was clicked by either:
//		5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
//		5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.


function choices(evt) {
  // obtain index of square
  const idx = parseInt(evt.target.id.replace('sq', ''));
  // Gets the index number of the square.
//The parseInt function converts its first argument to a string, parses that string, then returns an integer or NaN.  

  // check if square is available and return if not
  if (board[idx] || winner) return;
  // update state (board, turn, winner)
  board[idx] = turn;
  //update the game board squares, turns, and winner situation
  turn *= -1;

//The multiplication assignment operator ( *= ) multiplies a variable by the value of the right operand and assigns the result to the variable.

  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < win.length; i++) {
    if (Math.abs(board[win[i][0]] + board[win[i][1]] + board[win[i][2]]) === 3) return board[win[i][0]];

    //The Math.abs() function returns the absolute value of a number. That is, it returns x if x is positive or zero, and the negation of x if x is negative.
    
  }
    //	5.2) If the board has a value at the index, immediately return because that square is already taken.
    //	5.3) If winner is not null, immediately return because the game is over.
    //	5.4) Update the board array at the index with the value of turn.
    //	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
    //	5.6) Set the winner variable if there's a winner:
    //		5.6.1) Loop through the each of the winning combination arrays defined.
    //		5.6.2) Total up the three board positions using the three indexes in the current combo.
    //		5.6.3) Convert the total to an absolute value (convert any negative total to positive).
    //		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
    //	5.7) If there's no winner, check if there's a tie:
    //		5.7.1) Set winner to 'T' if there are no more nulls in the board array.
    //	5.8) All state has been updated, so render the state to the page (step 4.2).




  if (board.includes(null)) return null;
  return 'T';
}

//6) Handle a player clicking the replay button:
//	6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).



//Display an empty tic-tac-toe board when the page is initially displayed.
//A player can click on the nine cells to make a move.
//Every click will alternate between marking an X and O.
//Once occupied with an X or O, the cell cannot be played again.
//Provide a Reset Game button that will clear the contents of the board.

//Upon loading the app should:
//	4.1) Initialize the state variables
//	4.2) Render those values to the page
//	4.3) Wait for the user to click a square

// Bonuses
// Display whose turn it is ("X" or "O").
// Provide win logic and display a winning message.
// Provide logic for a cat's game (tie), also displaying a message.
// Add your personal touch with unique styling.