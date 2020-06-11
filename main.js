const startBtn = document.getElementById('start');
const form = document.querySelector('.form');
const words = document.getElementById('words');
const typing = document.getElementById('typing');
const endScreen = document.querySelector('.score');
const wrapper = document.querySelector('.wrapper');
const again = document.getElementById('play-again');
let options = document.getElementById('options');
let showScore = document.getElementById('showScore');
let score = +document.getElementById('score').innerHTML;
let timer = +document.getElementById('timer').innerHTML;

let difficulty = 7;

function playAgain(){
    wrapper.classList.add('close');
    again.classList.add('show');
    form.classList.add('close');
    endScreen.classList.add('show');
    showScore.innerHTML = score;
    typing.value = '';
    document.getElementById('score').innerHTML = 0;
    score = 0;
    timer = 11;
}


function startGame(){
    wrapper.classList.remove('close');
    again.classList.remove('show');
    form.classList.remove('close');
    endScreen.classList.remove('show');

    startBtn.classList.add('hide'); 
    form.classList.add('show')
    typing .focus();
    displayWords();
    let start = setInterval(updateTime,1000);


    function updateTime(){
        timer--
        document.getElementById('timer').innerHTML = timer;
        if(timer === 0){
            playAgain();
        }
    }
}

// display a random word 
async function displayWords(){  
    const res = await fetch('https://random-word-api.herokuapp.com//word?number=1');
    const data = await res.json();
    let task = Math.floor(Math.random() * data.length);
    words.innerHTML = data[task];
}

function checkInput(e){
    let answers = e.target.value;
    if(answers === words.innerHTML){
        typing.value = '';
        displayWords();
        score++;
        console.log(difficulty)
        timer += difficulty;
        document.getElementById('score').innerHTML = score;
    }
}   

// event listeners
startBtn.addEventListener('click',startGame)
typing.addEventListener('input',checkInput);
form.addEventListener('submit',(e)=>{e.preventDefault()});
again.addEventListener('click',startGame);
options.addEventListener('change',(e)=>{
    if(e.target.value === 'medium'){
        difficulty = 5;
    }
    else if(e.target.value === 'hard'){
        difficulty = 3;
    }
    else{
        difficulty = 7;
    }
});