const paperFigure = document.getElementById('paper-figure');
const scissorsFigure = document.getElementById('scissors-figure');
const rockFigure = document.getElementById('rock-figure');

const figures = [paperFigure, scissorsFigure, rockFigure];
figures.forEach(el => {
    el.addEventListener('click', () => {
        console.log(el);
    });
})