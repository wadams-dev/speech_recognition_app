// var msg = document.getElementById('msg');
// var randomNumber = getRandomNumber();
// console.log('Number: ' + randomNumber);
//
//
// function getRandomNumber(){
//     return Math.floor(Math.random() * 100) + 1;
// }
//
// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

//create random number
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}
console.log(randomNum);

//initialize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create variable to work with Speech Recognition object
let recognition = new window.SpeechRecognition();

//start Game
recognition.start();

//listen for result
recognition.addEventListener('result', onSpeak);

//create onSpeak function
function onSpeak(e){
  const msg = e.results[0][0].transcript;
  console.log(msg);

  writeMessage(msg);
  checkNumber(msg);
}

//create writeMessage function display msg to dom
function writeMessage(msg){
  msgEl.innerHTML = `
                    <div> You said: </div
                    <span class="box">${msg}</span>
                    `;
}

//create checkNumber function check msg against number
function checkNumber(msg){
  const num = +msg;
  //check if number is valid
  if(Number.isNaN(num)){
    msgEl.innerHTML += '<div> That is not a valid number </div>';
    return;
  }
  //check if number is in range
  if(num > 100 || num < 1){
    msgEl.innerHTML += '<div> Your number must be between 1-100 </div>';
    return;
  }
  //check number against random number
  if(num === randomNum){
    document.body.innerHTML = `<h2>Congrats! You guessed the number <br> It was ${num}</h2><button class="play-again" id="play-again">Play Again</button>`;
  } else if (num > randomNum){
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}
//allow user to continue to guess
recognition.addEventListener('end', ()=> recognition.start());
//play button functionality
document.body.addEventListener('click', e => {
  if(e.target.id === 'play-again'){
    window.location.reload();
  }
});
