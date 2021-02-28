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

const paperFigure = document.getElementById('paper-figure');
const scissorsFigure = document.getElementById('scissors-figure');
const rockFigure = document.getElementById('rock-figure');

const figures = [paperFigure, scissorsFigure, rockFigure];
figures.forEach(el => {
    el.addEventListener('click', () => {
        console.log(el);
    });
});