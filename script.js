const screens = document.querySelectorAll('.screen');
const startBtn = document.querySelector('.start');
const timeList = document.querySelector('.time-list');
const timeLeft = document.querySelector('#time');
const board = document.querySelector('#board');
let gameDuration = 0;
let score = 0;
let timerID;
const colors = ['#00CC99', '#66CC00', '#CCFF33', '#00CCFF', '#3300CC', '#CC00FF', '#FF0066', '#FF6600', '#FFFF66'];

startBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('time-btn')) {
        gameDuration = parseInt(evt.target.dataset.duration);
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();    
    }
});

function startGame () {
    timerID = setInterval(countdown, 1000);
    printTime(gameDuration);
    createRandomCircle();
};

function countdown () {
    if (gameDuration === 0) {
        finishGame();
    }
    else {
        let currentTime = --gameDuration;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        printTime(currentTime);
    }
}

function printTime (value) {
    timeLeft.innerHTML = `00:${value}`;
};

function createRandomCircle () {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = getRandomNumber(10, 60);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0 + size, width - size);
    const y = getRandomNumber(0 + size, height - size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    const color = generateColor();
    circle.style.background = color;
    circle.style.boxShadow = `0 0 10px ${color}`;
    board.appendChild(circle);
};

function finishGame () {
    clearInterval(timerID);
    timeLeft.parentNode.remove();
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
};

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function generateColor () {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};