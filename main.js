const scoreBoard = document.querySelector('.score')
const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
let rndNumber
let timeUp = true
let score = 0
let started = false

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === rndNumber) {
    return randomHole(holes)
  }
  rndNumber = hole
  return hole
}

function peep() {
  const time = randomTime(500, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (timeUp) return peep()
  }, time)
}

function bonk(e) {
  if (!e.isTrusted) return
  this.parentNode.classList.remove('up')
  score++
  scoreBoard.textContent = score
}

function startGame() {
  if (started) return
  timeUp = true
  started = true
  score = 0
  scoreBoard.textContent = 0
  peep()
  setTimeout(() => {
    timeUp = false
    started = false
  }, 5000)
}

moles.forEach(mole => mole.addEventListener('click', bonk))