window.userScore = 0;
window.computerScore = 0;

//Write the rest of the code here
function Computer(){
    // Computer functions only generated random Choice. Write the related code here
    const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
}

function Play(userChoice)
{
    //Complete the play function here
    const computerChoice = Computer();
    let result = '';

    if (userChoice === computerChoice) 
        {
        document.getElementById('scr').textContent =
        `Your Score: ${window.userScore} | Computer Score: ${window.computerScore}`;

        document.getElementById('res').textContent =
        `You choosed: ${userChoice} | Computer chooses: ${computerChoice}`;
      } 
      
      else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) 
      {
        window.userScore++;
        document.getElementById('scr').textContent =
        `Your Score: ${window.userScore} | Computer Score: ${window.computerScore}`;

        document.getElementById('res').textContent =
        `You choosed: ${userChoice} | Computer chooses: ${computerChoice}`;
      }

      else
      {
        window.computerScore++;
        document.getElementById('scr').textContent =
        `Your Score: ${window.userScore} | Computer Score: ${window.computerScore}`;

        document.getElementById('res').textContent =
        `You choosed: ${userChoice} | Computer chooses: ${computerChoice}`;
      }
}


