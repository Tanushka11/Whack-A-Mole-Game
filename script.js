let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButton = document.getElementById("startNewGame");
let pauseGameButton = document.getElementById("pauseGame");

let squares = document.querySelectorAll(".square");
let timerId = null;
let randomMoleId = null;

let gameMusic = new Audio('./downloads/gameMusic.mp3');
let hitMusic = new Audio('./downloads/hitMusic.mp3');


let score = 0;
let timeLeft = 0;
let hitPosition = null;
// RANDOMLY PLACE MOLE IN SQUARE
function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomSquare = squares[Math.floor(Math.random() * squares.length)]; //0 to 8

  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}
function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `TIME LEFT : ${timeLeft}`
    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
    }
}
randomMole();
// start the game when we click start button
function startGame() {
  score = 0;
  timeLeft = 60;
  scoreH2.innerHTML= 'Your score : 0';
  timeLeft.innerHTML = 'Time left : 60';
  pauseGameButton.innerHTML = 'pause'
  gameMusic.play();
  // call back function
  // set interval calls function at random interval
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown,1000);
}
function pauseResumeGame(){
  if(pauseGameButton.textContent === 'Pause'){
    gameMusic.pause();
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseGameButton.textContent = 'resume';

  }
  else{
    gameMusic.play();
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown,1000);
    pauseGameButton.textContent = 'Pause';

  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if(timerId !== null){
      if (square.id === hitPosition) {
        hitMusic.play();
        setTimeout(()=>{hitMusic.pause();},1000);
        
        score++;
        scoreH2.innerHTML = `YOUR SCORE ${score}`;
        hitPosition = null;
      }
    }
    
  });
});

startNewGameButton.addEventListener("click", startGame);
pauseGameButton.addEventListener('click',pauseResumeGame);

