const game = document.getElementById('game')
const horseOne = document.getElementById('horse-one')
const horseTwo = document.getElementById('horse-two')
const horseThree = document.getElementById('horse-three')
const horseFour = document.getElementById('horse-four')
const horseFive = document.getElementById('horse-five')
const horseSix = document.getElementById('horse-six')
const horseSeven = document.getElementById('horse-seven')
const horseEight = document.getElementById('horse-eight')
const horseNine = document.getElementById('horse-nine')
const horsesOddsDiv = document.getElementById('horsesOddsDiv')
const couponValuesDiv = document.getElementById('values')
const clearButton = document.getElementById('clear')
const oddButtons = horsesOddsDiv.getElementsByTagName('button')
const betValue = document.getElementById('betValue')
const earning = document.getElementById('earning')
const startButton = document.getElementById('startButton')
const startDiv = document.getElementById('start')
const popup = document.getElementById('popup')
const result = document.getElementById('result')
const startBalanceDiv = document.getElementById('balance')
const newBalance = document.getElementById('newBalance')
const winningHorseDiv = document.getElementById('winningHorse')
const newGame = document.getElementById('newGame')
const loadingDiv = document.getElementById('loading')
const allHorses = document.getElementsByClassName('horse')
const startAlert = document.getElementById('alert')


const horseElements = [
  horseOne, horseTwo, horseThree, horseFour, horseFive,
  horseSix, horseSeven, horseEight, horseNine
]



let balance = 10
let potentialGain = 0
let bet = 0
let betStart = false



startBalanceDiv.innerText = `${balance} $`


const horsesData =  {
    "horses": [
      {
        "name": "Falcon",
        "odds": 4.5
      },
      {
        "name": "Windstorm",
        "odds": 3.2
      },
      {
        "name": "Starlight",
        "odds": 6.8
      },
      {
        "name": "Boreas",
        "odds": 7.1
      },
      {
        "name": "Thunder",
        "odds": 2.9
      },
      {
        "name": "Rainbow",
        "odds": 5.6
      },
      {
        "name": "Tempest",
        "odds": 8.3
      },
      {
        "name": "Sunshine",
        "odds": 4.1
      },
      {
        "name": "Lightning",
        "odds": 3.8
      }
    ]
  }



horsesData.horses.forEach( (element, index) => {
    const buttonOdds = document.createElement('button')
    buttonOdds.id = `${index}`
    buttonOdds.textContent = `${element.name} x : ${element.odds}`
    horsesOddsDiv.append(buttonOdds)
    for (let i = 0; i < horseElements.length; i++) {
      horseElements[i].innerText = horsesData.horses[i].name
    }
} )


horsesOddsDiv.addEventListener('click', (e) => {
  e.preventDefault()
  for (let i = 0; i < oddButtons.length; i++) {
    oddButtons[i].disabled = true
  }
  localStorage.setItem('horseID', e.target.id)
  const couponValues = document.createElement('p')
  couponValues.textContent = `${horsesData.horses[e.target.id].name} ------------------------------- ${horsesData.horses[e.target.id].odds}`
  couponValuesDiv.append(couponValues)
  betValue.disabled = false
})


clearButton.addEventListener('click', () => {
  clear()
})

const clear = () => {
  for (let i = 0; i < oddButtons.length; i++) {
    oddButtons[i].disabled = false
  }
  couponValuesDiv.innerHTML = ""
  earning.innerHTML = ""
  localStorage.clear()
  betValue.disabled = true
  betValue.value = " "
}


betValue.addEventListener('input', (e) => {
  e.preventDefault
  bet = e.target.value
  if (bet > balance) {
    earning.style.color = 'red'
    earning.style.fontSize = '20px'  
    earning.innerText = "insufficient balance, please refresh the value."
    betStart = false
  }else{
    earning.style.color = 'white'
    earning.style.fontSize = '25px'  
    potentialGain = (bet * horsesData.horses[localStorage.getItem('horseID')].odds).toFixed(1)
    earning.innerHTML = potentialGain,
    betStart = true
  }
})

startButton.addEventListener('click', () => {
  if (betStart) {
    gamestart()
    startDiv.style.visibility = 'hidden'
    game.style.visibility = 'visible'
  }else{
    if (!betStart) {
      startAlert.innerText = "Please enter the bet amount"
      startAlert.style.color = 'red'
      startAlert.style.backgroundColor = 'white'
      setTimeout(() => {
        startAlert.innerText = ""
      }, 1000);
    }
  }
})


const gamestart = () => {


  const horseDistances = [];
  const horseMultiples = [];
  
  const generateRandomMultiples = () => {
    for (let i = 0; i < horseElements.length; i++) {
      const randomMultiple = Math.random() * (2 - 1) + 1;
      horseMultiples.push(randomMultiple);
    }
  };
  
  const horsesRun = setInterval(() => {
    for (let i = 0; i < horseElements.length; i++) {
      const horseElement = horseElements[i];
      const horseDistance = horseDistances[i] || 0;
      const horseMultiple = horseMultiples[i] || 0;
  
      horseElement.style.transform = `translateX(${horseDistance}px)`;
      horseDistances[i] = horseDistance + (Math.random() * 15 * horseMultiple);
  
      if (horseDistance > 1490) {
        clearInterval(horsesRun);
        finishGame(i);
      }
    }
  }, 100);
  
  generateRandomMultiples();
  

}


const finishGame = (winningHorse) => {
  let message = "";
  betStart = false
  if (winningHorse == localStorage.getItem('horseID')) {
    message = "YOU WIN!";
    result.style.color = 'green'
    balance = balance + parseInt(potentialGain)
    startBalanceDiv.innerText = `${balance} $`
  } else {
    message = "YOU LOSE!";
    result.style.color = 'red'
    balance = balance - bet
    startBalanceDiv.innerText = `${balance} $`
  }

  localStorage.clear();
  result.innerText = message
  newBalance.innerText = `${balance} $`
  winningHorseDiv.innerText = horsesData.horses[winningHorse].name

  setTimeout(() => {
    popup.style.visibility = 'visible';
  }, 500);
  
};

newGame.addEventListener('click', () => {
  startDiv.style.visibility = 'visible'
  popup.style.visibility = 'hidden'
  game.style.visibility = 'hidden'
  for (let i = 0; i < horseElements.length; i++) {
    horseElements[i].style.transform = `translateX(0px)`
    console.log(horseElements[i].style.transitionDuration);
  }
  clear()
})
