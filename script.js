//global constants
const clueHoldTime = 1000; //1000ms = 1s, time that each clue is sustained
const cluePauseTime = 333; //Time in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence


//global variables
var pattern = [1, 2, 3, 4, 2, 1, 3, 4];
var progress = 0; //can be used to keep track of the pattern
var gamePlaying = false; //to keep track of if the game is ongoing or not
var tonePlaying = false; //to keep track of if a sound is being played or not
var volume = 0.5; //must be btwn 0.0 and 1.0
var guessCounter = 0; //keeps track of player's progress


function startGame(){
  //initialization
  progress = 0;
  gamePlaying = true;
  
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
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  
  let delay = nextClueWaitTime;
  for(let i = 0; i <= progress; i++) {
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i])
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){ //start button not pressed
    return;
  }
  
  //game logic
  if(btn != pattern[guessCounter]){ //if guess is incorrect
    loseGame(); //guess is wrong, game is lost
  }
  else{
    if(guessCounter != progress){ //if turn is ongoing
      guessCounter++; //game continues, check next guess
    }
    else{ //turn is over
      if(progress != pattern.length - 1){ //if progress has yet to reach the end of the pattern array
        progress++;
        playClueSequence();
      }
      else{
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

// Sound Synthesis Functions
const freqMap = {
  //each button has a unique frequency
  1: 130,//261.6,
  2: 230,//329.6,
  3: 330,//392,
  4: 430//466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)