# React-Minesweeper-Clone

# Description

A minesweeper clone made with Reactjs.

This is my first React app. I solely made it to get a better understanding how React works and thus did not put time into making the app properly responsive or accesible for mobile use. I might or might not do so, for this project, in the future.

![Image of Minesweeper](https://raw.githubusercontent.com/RanDByyp/React-Minesweeper/gh-pages/sweeper.PNG)

# Table of Contents

**src folder**
  - **utility.js** - A collection of modular function that are used by the components of the app.

**src/components folder**
- **Game.js** Stores game settings such as difficulty, width/height, amount of mines, game-state.
  - **Field.js** Generates and stores all data of the game (What cells, are revealed, mines, flagged, etc). Handles manipulation/changes of cells. 
    - **Cell.js** Gets value from Field.js and handles returning the correct display-image.
  - **Menu.js** Gets input to change difficulty/start new game. Passes it on to Game.js, which triggers regeneration in Field.js
  - **Message.js** Displays the correct message based on game-state
  
# Credits

This program was made by Joran de Boer AKA RanDByyp using React.

# Contact

[Twitter](https://twitter.com/RandbYyp)<br>[Website](https://randbyyp.github.io/)


  
