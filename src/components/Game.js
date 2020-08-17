import React from 'react';
import Field from './Field';
import Menu from './Menu';
import Message from './Message';
import '../App.css';

class Game extends React.Component
{

    constructor(props)
    {   
        super(props);

        this.difficultySettings = 
        [
            {height: 8, width: 8, mines: 10},
            {height: 13,width: 15,mines: 40},
            {height: 16,width: 30,mines: 99}
        ];

        this.state = {
            pendingNewGame: false,
            gameOver: 0,
            difficulty: 0,
            height: this.difficultySettings[0].height,
            width: this.difficultySettings[0].width,
            mines: this.difficultySettings[0].mines,
            flags: this.difficultySettings[0].mines,
            cells: (this.difficultySettings[0].height * this.difficultySettings[0].width) - this.difficultySettings[0].mines
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleFlagging = this.handleFlagging.bind(this);
        this.handleResetPendingNewGame = this.handleResetPendingNewGame.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
    }

    changeDifficulty(d)
    {
        this.setState(
        { 
            difficulty: d,
            height: this.difficultySettings[d].height,
            width: this.difficultySettings[d].width,
            mines: this.difficultySettings[d].mines,
            flags: this.difficultySettings[d].mines,
            cells: (this.difficultySettings[d].height * this.difficultySettings[d].width) - this.difficultySettings[d].mines
        });
    }

    setPendingNewGame()
    {
        this.setState((state) => 
        {
            return state.pendingNewGame = true;
        });
    }

    handleResetPendingNewGame()
    {
        this.setState((state) => 
        {
            return state.pendingNewGame = false;
        });

        this.setState((state) =>
        {
            return state.gameOver = 0;
        });
    }
    
    handleButtonClick(difficulty)
    {
        this.changeDifficulty(difficulty);
        this.setPendingNewGame();
    }

    handleFlagging(flags)
    {
        this.setState((state) => 
        {
            return state.flags = flags;
        });
    }

    handleGameOver(gameState)
    {
        this.setState((state) =>
        {
            return state.gameOver = gameState;
        });
    }

    handleReveal(cells)
    {
        this.setState((state) =>
        {
            return state.cells = cells;
        });
    }

    render() 
    {
        const divStyle = { maxWidth: this.state.width+35+'px'
            };

        return (
            <div className="Game" style={divStyle}>
                <div className="game-holder">
                    <Menu 
                        flags={this.state.flags}
                        cells={this.state.cells}
                        gameOver={this.gameOver}
                        onButtonClick={this.handleButtonClick}
                    />
                    <Field
                        width={this.state.width} 
                        height={this.state.height} 
                        mines={this.state.mines}
                        flags={this.state.flags}
                        cells={this.state.cells}
                        gameOver={this.state.gameOver}
                        pendingNewGame={this.state.pendingNewGame}
                        afterNewGame={this.handleResetPendingNewGame}
                        onGameOver={this.handleGameOver}
                        onFlag={this.handleFlagging}
                        onCellRevealed={this.handleReveal}
                    />
                    <Message gameOver={this.state.gameOver}/>
                </div>
            </div>
        );
    }
}

export default Game;