import React from 'react';
import '../App.css';

class Cell extends React.Component
{
    constructor(props) 
    {
      super(props);
      this.mouseDownEvent = this.mouseDownEvent.bind(this);
    };

    getValue ()
    {
      if (!this.props.isRevealed) 
      {
        return this.props.isFlagged ? "🚩" : null;
      }
      if (this.props.isMine)
      {
        if(this.props.isExploded)
        {
          return '💥';
        }
        return '💣';
      }
      if (this.props.neighbours == 0) {
        return null;
      }
      return this.props.neighbours;
    }

    mouseDownEvent (event)
    {
      switch(event.button)
      {
        case 0:
          this.props.onLeftClick(this.props);
          break;
        case 2: 
          this.props.onRightClick(this.props);
          break;
      }
    }

    render() 
    {
        const cell = true;
        const revealed = this.props.isRevealed;
  
        return (
            <div className={[cell && 'Cell', revealed && 'revealed']
            .filter(c => c != false)
            .join(' ')}
            onMouseDown={this.mouseDownEvent}
            onContextMenu={(e)=> e.preventDefault()}>
                {this.getValue()}
            </div>
        );
    }
}
  
export default Cell;