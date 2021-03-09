const highScoresList = document.querySelector('#highScoreList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
  return `<li class="high-score">${score.name}-${score.scoree}</li>`
}).join('')