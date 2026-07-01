// ? Select HTML elements
const boxes = document.querySelectorAll(".box");
const status = document.querySelector(".status");
const restartBtn = document.querySelector(".restartBtn");

// ? Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// ? Winning combinations
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// ? Initial message
status.innerHTML = "Player X Turn";

// ? Add click event to every box
boxes.forEach(function(box){
    box.addEventListener("click", playGame);
});

// ? Restart button
restartBtn.addEventListener("click", restartGame);


// ? Main Game Function

function playGame(event){

    // * Stop if game is over
    if(gameOver){
        return;
    }

    // * Get clicked box index
    let index = event.target.dataset.index;

    // * Ignore if box already filled
    if(board[index] != ""){
        return;
    }

    // * Save move
    board[index] = currentPlayer;

    // * Show X or O
    event.target.innerHTML = currentPlayer;

    // * Check winner
    if(checkWinner()){
        status.innerHTML = "🎉 Player " + currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    // * Check draw
    if(!board.includes("")){
        status.innerHTML = "Match Draw!";
        gameOver = true;
        return;
    }

    // * Change player
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    status.innerHTML = "Player " + currentPlayer + " Turn";
}

// ? Check Winner

function checkWinner(){

    for(let i = 0; i < winPatterns.length; i++){

        let a = winPatterns[i][0];
        let b = winPatterns[i][1];
        let c = winPatterns[i][2];

        if(
            board[a] != "" &&
            board[a] == board[b] &&
            board[b] == board[c]
        ){

            // * Highlight winning boxes
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");

            return true;
        }
    }

    return false;
}


// ? Restart Game

function restartGame(){

    // * Reset board
    board = ["","","","","","","","",""];

    // * Reset player
    currentPlayer = "X";

    // * Reset game status
    gameOver = false;

    // * Clear boxes
    boxes.forEach(function(box){
        box.innerHTML = "";
        box.classList.remove("win");
    });

    status.innerHTML = "Player X Turn";
}