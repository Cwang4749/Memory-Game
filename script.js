//global constants
const clueHoldTime = 1000; //1000ms = 1s, time that each clue is sustained
const cluePauseTime = 333; //Time in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//global variables
var pattern = [6, 4, 8, 1, 6, 3, 8, 5, 2, 7];
var progress = 0; //can be used to keep track of the pattern
var gamePlaying = false; //to keep track of if the game is ongoing or not
var tonePlaying = false; //to keep track of if a sound is being played or not
var volume = 0.5; //must be btwn 0.0 and 1.0
var guessCounter = 0; //keeps track of player's progress
var lives = 0; //to keep track of lives

//var for countdown timer
var timeLeft = 15;
var timeOn = false;
var myInterval;

//audio setup
var currTone;
var flute1 = document.getElementById("flute1");
flute1.loop = true;
var flute2 = document.getElementById("flute2");
flute2.loop = true;
var piano1 = document.getElementById("piano1");
piano1.loop = true;
var piano2 = document.getElementById("piano2");
piano2.loop = true;
var zither1 = document.getElementById("zither?1");
zither1.loop = true;
var zither2 = document.getElementById("zither?2");
zither2.loop = true;
var zither3 = document.getElementById("zither?3");
zither3.loop = true;
var kalimba = document.getElementById("kalimba");
kalimba.loop = true;

function startGame(){
  //initialization
  progress = 0;
  gamePlaying = true;
  lives = 2; //3 lives, gameover on 3rd mistake
  document.getElementById("counter").innerHTML = lives + 1;
  
  //reset timer
  timeLeft = 15;
  document.getElementById("timeDisplay").innerHTML = timeLeft;
  
  //randomize pattern
  for(let i = 0; i < pattern.length; i++){
    pattern[i] = Math.floor(Math.random() * 8) + 1; //random number between 1-8
  }
  
  //swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden")
  document.getElementById("stopBtn").classList.remove("hidden")
  
  //start the clue sequence
  playClueSequence();
}
function stopGame(){
  gamePlaying = false;
  document.getElementById("stopBtn").classList.add("hidden")
  document.getElementById("startBtn").classList.remove("hidden")
  document.getElementById("counter").innerHTML = "";
  
  //timer related changes
  document.getElementById("timeDisplay").innerHTML = 15;
  timeOn = false;
  window.clearInterval(myInterval);
  resetTime();
}



//adds or removes the class "lit" to the button to light/clear it
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn) {
  document.getElementById("button"+btn).classList.remove("lit")
}


function playSingleClue(btn){
  if(gamePlaying) {
    let delay = clueHoldTime;
    delay -= (progress + 1) * 75;
    lightButton(btn);
    playTone(btn, delay);
    setTimeout(clearButton, delay, btn);
  }
}
function playClueSequence() {
  guessCounter = 0;

  let delay = nextClueWaitTime;
  delay = delay * 4;
  delay = delay/5;
  let timerDelay = delay;
  for (let i = 0; i <= progress; i++) {
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  timeOn = true;
  let buffer = clueHoldTime + cluePauseTime;
  buffer = buffer * progress;
  timerDelay = timerDelay + buffer;
  setTimeout(function(){timer()}, timerDelay);
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    //start button not pressed
    return;
  }
  
  //game logic
  if (btn != pattern[guessCounter]) {
    //if guess is incorrect
    
    //resets timer for next attempt
    timeOn = false;
    window.clearInterval(myInterval);
    resetTime();
    
    document.getElementById("counter").innerHTML = lives;
    if (lives != 0) {
      lives--;
      playClueSequence();
    } else {
      setTimeout(function() {
        loseGame();
      }, 333); //guess is wrong, game is lost
    }
  } else {
    if (guessCounter != progress) {
      //if turn is ongoing
      guessCounter++; //game continues, check next guess
    } else {
      //turn is over
      
      //resets timer for next turn
      timeOn = false;
      window.clearInterval(myInterval);
      resetTime();
      
      if (progress != pattern.length - 1) {
        //if progress has yet to reach the end of the pattern array
        progress++;
        playClueSequence();
      } else {
        winGame(); //game is won
      }
    }
  }
}

function winGame(){
  stopGame();
  alert("Congratulations, you won!")
}
function loseGame(){
  stopGame();
  alert("Game over. You Lost.");
}

//timer functions
function resetTime() {
        timeLeft = 15;
      document.getElementById("timeDisplay").innerHTML = timeLeft;
}
function timer() {
  myInterval = setInterval(function(){
    
    if(timeLeft > 0 && timeOn) {
      timeLeft -= 1;
      document.getElementById("timeDisplay").innerHTML = timeLeft;
    }
    else {
      loseGame();
      window.clearInterval(myInterval)
      //clearInterval(myInterval)
    }
    
  }, 1000)
}

//audio functions
const freqMap = {
      //each button has a unique frequency
      1: zither3, //261.6,
      2: zither2, //329.6,
      3: zither1, //392,
      4: piano2, //466.2
      5: flute2,
      6: piano1,
      7: flute1,
      8: kalimba
};

function playTone(btn, len) {
  currTone = freqMap[btn];
  currTone.play();
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) {
  if(!tonePlaying) {
    currTone = freqMap[btn];
    currTone.play().setTargetAtTime(0.5, currTone.currentTime + 0.05, 0.0025);
    tonePlaying = true;
  }
}
function stopTone() {
  currTone.pause();
  currTone.currentTime = 0;
  tonePlaying = false;
}


// // Sound Synthesis Functions
// const freqMap = {
//   //each button has a unique frequency
//   1: 130,//261.6,
//   2: 180,//329.6,
//   3: 230,//392,
//   4: 280,//466.2
//   5: 330,
//   6: 380,
//   7: 430,
//   8: 480
// }
// function playTone(btn,len){ 
//   o.frequency.value = freqMap[btn]
//   g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
//   tonePlaying = true
//   setTimeout(function(){
//     stopTone()
//   },len)
// }
// function startTone(btn){
//   if(!tonePlaying){
//     o.frequency.value = freqMap[btn]
//     g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
//     tonePlaying = true
//   }
// }
// function stopTone(){
//     g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
//     tonePlaying = false
// }

// //Page Initialization
// // Init Sound Synthesizer
// var context = new AudioContext()
// var o = context.createOscillator()
// var g = context.createGain()
// g.connect(context.destination)
// g.gain.setValueAtTime(0,context.currentTime)
// o.connect(g)
// o.start(0)