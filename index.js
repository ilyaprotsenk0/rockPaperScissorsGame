// Setting score to localStorage from #header-score-count

const score = document.getElementById('header-score-count');

if (!localStorage.getItem('score')) {
    localStorage.setItem('score', `${Number(score.innerText)}`);
} else {
    score.innerText = localStorage.getItem('score');
}

// Logic for opening/closing modal rules window

const rulesBlock = document.getElementById('rules-block');
const showModalRules = document.getElementById('show-modal-rules');

showModalRules.addEventListener('click', () => {
    rulesBlock.classList.remove('hidden');
});

const closeModalRules = document.getElementById('close-modal-rules');

closeModalRules.addEventListener('click', () => {
    rulesBlock.classList.add('hidden');
});

// Getting access to HTML elements

const paperFigure = document.getElementById('paper-figure');
const scissorsFigure = document.getElementById('scissors-figure');
const rockFigure = document.getElementById('rock-figure');

const chooseFigureBlock = document.getElementById('choose-figure-block');
const playerVsComputerBlock = document.getElementById('player-vs-computer-block');
const gameResultBlock = document.getElementById('game-result-block');

const playerFigure = document.getElementById('player-figure');
const computerFigure = document.getElementById('computer-figure');

// Creating array of object that contains data about figures

const figuresInfo = [
    {name: 'paper', className: 'paper-figure', img: 'images/icon-paper.svg'},
    {name: 'scissors', className: 'scissors-figure', img: 'images/icon-scissors.svg'},
    {name: 'rock', className: 'rock-figure', img: 'images/icon-rock.svg'}
];

// Hiding 'choose-fighter' block and showing 'player vs computer' block after user choises figure

const figures = [paperFigure, scissorsFigure, rockFigure];

figures.forEach(el => {
    el.addEventListener('click', () => {
        simulateBattle(el.getAttribute('data-id'), chooseRandomFigure());
        chooseFigureBlock.classList.add('hidden');
        playerVsComputerBlock.classList.remove('hidden');
    });
});

// Function for random choose of computer figure

function chooseRandomFigure() {
    return Math.floor(Math.random() * figuresInfo.length);
}

// Function to clean figure color (border) and winner shadows

function cleanFigure(figure) {
    if (figure.classList.length) {
        figure.classList.remove(figure.classList[0]);
        figure.parentElement.classList.remove('winner'); 
    }
}

// Function to draw figures at 'player vs computer' block

/* 
   Player logic: 
        1. Cleaning figure border and shadows from previous round
        2. Drawing new figure border and img based on player choise
   
    Computer logic:
        1. Cleaning figure border and shadows from previous round
        2. Hiding figure border and img until timer finish
        3. Drawing new figure border and img based on player choise
        4. Showing block with game result (who has won)
*/

function drawFigures(playerValue, computerValue) {
    cleanFigure(playerFigure);
    playerFigure.classList.add(figuresInfo[playerValue].className);

    const playerFigureImg = document.getElementById('player-figure-img');
    playerFigureImg.setAttribute('src', figuresInfo[playerValue].img);

    cleanFigure(computerFigure);
    const computerFigureImg = document.getElementById('computer-figure-img');
    computerFigureImg.classList.add('hidden');
    gameResultBlock.classList.add('hidden');

    setTimeout(() => {
        computerFigure.classList.add(figuresInfo[computerValue].className);
        computerFigureImg.classList.remove('hidden');
        computerFigureImg.setAttribute('src', figuresInfo[computerValue].img);
        gameResultBlock.classList.remove('hidden');
    }, 1500);
}

// Function that draws text who has won this round in game result block

function simulateBattle(playerValue, computerValue) {
    drawFigures(playerValue, computerValue);

    const playerFigureName = figuresInfo[playerValue].name;
    const computerFigureName = figuresInfo[computerValue].name;
    const gameResultText = document.getElementById('game-result-text');

    if (didPlayerWin(playerFigureName, computerFigureName)) {
        gameResultText.innerText = "YOU WIN";
        drawWinnerShadow(playerFigure);
    } else if (playerFigureName == computerFigureName) {
        gameResultText.innerText = "DRAW";
    } else {
        gameResultText.innerText = "YOU LOSE";
        drawWinnerShadow(computerFigure);
    }
}

// Function to choose a winner

function didPlayerWin(player, computer) {
    if ((player == "paper" && computer == "rock") || 
        (player == "rock" && computer == "scissors") || 
        (player == "scissors" && computer == "paper")) {

        setTimeout(() => {
            localStorage.setItem('score', `${Number(localStorage.getItem('score')) + 1}`);
            score.innerText = localStorage.getItem('score');
        }, 1500);
        return true;
    }
}

// Function to draw shadow over winner figure

function drawWinnerShadow(winner) {
    setTimeout(() => {
        winner.parentElement.classList.add('winner');
    }, 1500);
}

// Logic for start a new game by clicking 'Play again' button

const playAgainBtn = document.getElementById('play-again-btn');

playAgainBtn.addEventListener('click', () => {
    playerVsComputerBlock.classList.add('hidden');
    chooseFigureBlock.classList.remove('hidden');
});