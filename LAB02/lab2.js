const prompt = require('prompt');

prompt.start();

//prompt to get user input and display output 
prompt.get(['userSelection'], function(_,result){
    
    // getting user selection and coverting it to uppercase
    const userSelection = result.userSelection.toUpperCase();

    // variable that calls function to generate computer selection
    const computerSelection = computerSelectedOption();

    // printing computer selection
    console.log("Computer Selection: " + computerSelection);

    // printing user selection
    console.log("User Selection: " + userSelection);

    // deciding game winner using the winner function
    const gameWinner = winner(userSelection, computerSelection);

    console.log("Winner: " + gameWinner);

});

// function to generate random selection for computer
function computerSelectedOption()
{
    const number = Math.random();

    if (number < 0.34)
    {
        return "PAPER";
    }

    else if (number < 0.67)
    {
        return "SCISSORS";
    }

    else if (number < 1.00)
    {
        return "ROCK";
    }
}

// function that determines the winner of the game
function winner(userSelection, computerSelection)
{
    if (computerSelection === "SCISSORS" && userSelection === "PAPER")
    {
        return "Oh no, Computer Wins";
    }
    else if (computerSelection === "PAPER" && userSelection === "ROCK")
    {
        return "Oh no, Computer Wins";
    }
    else if (computerSelection === "ROCK" && userSelection === "SCISSORS")
    {
        return "Oh no, Computer Wins";
    }
    else if (computerSelection === userSelection)
    {
        return "It's a tie!";
    }
    else{
        return "Hurray, User Wins";
    }
}

