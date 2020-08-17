import React from 'react';
import '../App.css';

function Message(props) {

    const message = [
      
    "*Left-Click on a cell to reveal it.\n*Right-Click on a cell to 'flag' (or 'unflag') it.\n->\n* A revealed cell can be empty, numbered, or a mine.\n* A flagged cell can not be revealed.\n* An empty cell has 0 adjacent cells that contain a mine.\n* A numbered cell has X adjacent cells that contain a mine,where X is the number the cell displays.\n->\n* Reveal a mine and you lose the game.\n* Reveal all cells, except for the cells that contain a mine and you win the game.\n-"
    ,"You lost! Press any difficulty to start a new game. Good luck!\n-","You won! Congratulations! 🎈🎈🎈\n -"]
  //          <p>{props.gameOver ? "You lost! Press any difficulty to start a new game. Good luck!" : "Playing"}</p>
    return (
      <div className="Message">
        {message[props.gameOver].split('\n').map((i,index) => {return <p key={index}>{i}</p>})}
        <a href="https://github.com/RanDByyp">Made by RanDByyp</a>
      </div>
    );
  }
  
  export default Message;
  