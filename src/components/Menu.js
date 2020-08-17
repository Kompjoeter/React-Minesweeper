import React from 'react';
import '../App.css';

function Menu(props) {

    const buttonClickEvent = (event) =>
    {
        props.onButtonClick(event.target.value);
    }

    return (
      <div className="Menu">
        <button className="menu-item" value="0" onClick={buttonClickEvent}>Easy</button>
        <button className="menu-item" value="1" onClick={buttonClickEvent}>Medium</button>
        <button className="menu-item" value="2" onClick={buttonClickEvent}>Hard</button>
        <p className="menu-item">{'🚩'+props.flags}</p>
      </div>
    );
  }
  
  export default Menu;
  