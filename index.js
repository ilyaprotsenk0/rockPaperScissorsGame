const score = document.getElementById('header-score-count');

if (!localStorage.getItem('score')) {
    localStorage.setItem('score', `${score}`);
} else {
    score.innerText = localStorage.getItem('score');
}

// Show/hide rules

const rulesBlock = document.getElementById('rules-block');
const showModalRules = document.getElementById('show-modal-rules');

showModalRules.addEventListener('click', () => {
    rulesBlock.classList.remove('hidden');
});

const closeModalRules = document.getElementById('close-modal-rules');

closeModalRules.addEventListener('click', () => {
    rulesBlock.classList.add('hidden');
});

// Choosing of figure

const chooseFigureBlock = document.getElementById('choose-figure-block');
const playerVsComputerBlock = document.getElementById('player-vs-computer-block');

const paperFigure = document.getElementById('paper-figure');
const scissorsFigure = document.getElementById('scissors-figure');
const rockFigure = document.getElementById('rock-figure');

const figures = [paperFigure, scissorsFigure, rockFigure];

const figuresInfo = [
    {name: 'paper', className: 'paper-figure', img: 'images/icon-paper.svg'},
    {name: 'scissors', className: 'scissors-figure', img: 'images/icon-scissors.svg'},
    {name: 'rock', className: 'rock-figure', img: 'images/icon-rock.svg'}
]

figures.forEach(el => {
    el.addEventListener('click', () => {
        simulateBattle(el.getAttribute('data-id'), chooseRandomFigure());
        chooseFigureBlock.classList.add('hidden');
        playerVsComputerBlock.classList.remove('hidden');
    });
});

// Computer logic

function chooseRandomFigure() {
    return Math.floor(Math.random() * figuresInfo.length);
}

function drawFigures(playerValue, computerValue) {
    const playerFigure = document.getElementById('player-figure');
    const playerFigureImg = document.getElementById('player-figure-img');

    if (playerFigure.classList.length) {
        playerFigure.classList.remove(playerFigure.classList[0]);
        playerFigure.classList.add(figuresInfo[playerValue].className);
    } else {
        playerFigure.classList.add(figuresInfo[playerValue].className);
    }
    
    playerFigureImg.setAttribute('src', figuresInfo[playerValue].img);

    const computerFigure = document.getElementById('computer-figure');
    const computerFigureImg = document.getElementById('computer-figure-img');

    if (computerFigure.classList.length) {
        computerFigure.classList.remove(computerFigure.classList[0]);
        computerFigure.classList.add(figuresInfo[computerValue].className);
    } else {
        computerFigure.classList.add(figuresInfo[computerValue].className);
    }

    computerFigureImg.setAttribute('src', figuresInfo[computerValue].img);
}

function simulateBattle(playerValue, computerValue) {
    
    drawFigures(playerValue, computerValue);
    const playerFigureName = figuresInfo[playerValue].name;
    const computerFigureName = figuresInfo[computerValue].name;

    const gameResultText = document.getElementById('game-result-text');

    if (didPlayerWin(playerFigureName, computerFigureName)) {
        gameResultText.innerText = "YOU WON";
    } else if (playerFigureName == computerFigureName) {
        gameResultText.innerText = "DRAW";
    } else {
        gameResultText.innerText = "YOU LOSE";
    }
}

function didPlayerWin(playerFigure, computerFigure) {
    if ((playerFigure == "paper" && computerFigure == "rock") || 
        (playerFigure == "rock" && computerFigure == "scissors") || 
        (playerFigure == "scissors" && computerFigure == "paper")) {

        localStorage.setItem('score', `${Number(localStorage.getItem('score')) + 1}`);
        score.innerText = localStorage.getItem('score');
        return true;
    }
}

// Play again

const playAgainBtn = document.getElementById('play-again-btn');

playAgainBtn.addEventListener('click', () => {
    playerVsComputerBlock.classList.add('hidden');
    chooseFigureBlock.classList.remove('hidden');
});