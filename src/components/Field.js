import React from 'react';
import Cell from './Cell';
import {
    initializeNestedArray, 
    populateNestedArray,
    getNeighboursOfNestedArrayIndex,
    iterizeNestedArrayDoThingIf
} from '../utility';
import '../App.css';
import { render } from '@testing-library/react';

class Field extends React.Component
{

    constructor(props) 
    {
        super(props);
        this.state = 
        {  
            field: this.generateField(),
        }
        this.cellCount = this.props.cells;
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    newGame()
    {
        this.setState((state) => 
        {
            return state.field = this.generateField();
        });
        this.cellCount = this.props.cells;
        this.props.onGameOver();
    }

    generateField()
    {
        let field = this.initializeField();
        field = this.plantMinesField(field);
        return this.countNeighboursField(field);
    }

    initializeField()
    {
        console.log('🌱🔲 initializeField()');
        return initializeNestedArray(
            this.props.width,
            this.props.height, 
            (x, y) =>
            (
                //Properties for each cell (Index of Nested Array)
                {
                    corX: x,
                    corY: y,
                    isMine: false,
                    isExploded: false,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                    neighbours: 0
                }
            )
        )
    }

    plantMinesField(field)
    {
        console.log('💣🔲 populateField()');
        return populateNestedArray(
            field,
            //Condition()
            (target) => target.isMine,
            //Value()
            (target) => 
            {
                target.isMine = true;
                return target;
            },
            //Populate-Amount
            this.props.mines
        );
    }

    countNeighboursField(field)
    {
        console.log('🏠🔲 countNeighboursField()');
        return iterizeNestedArrayDoThingIf(
            field,
            (nestedArray,x,y) =>
            {
                let mineCount = 0;
                let neighbours = getNeighboursOfNestedArrayIndex(nestedArray,x,y);
                
                neighbours.forEach(neighbour => {if(neighbour.isMine){mineCount++}});
                nestedArray[y][x].neighbours = mineCount;

                if (mineCount == 0 && !nestedArray[y][x].isMine)
                {
                    nestedArray[y][x].isEmpty = true;
                }
                return nestedArray[y][x];
            });
    }

    updateState(field)
    {
        this.setState((state) => 
        {
            return state.field = field;
        });
    }
    
    updateCellOfField(field,cell)
    {   
        field[cell.corY][cell.corX] = cell;
        return field;
    }

    incrementFlag(incr)
    {
        let flagCount = this.props.flags;

        if (incr > 0)
        {
            if (this.props.flags >= this.props.mines)
            {
                incr = 0;
            }
        }
        else if (incr < 0)
        {
            if (this.props.flags < 1)
            {
                incr = 0;
            }
        }
        flagCount += incr;
        this.props.onFlag(flagCount);
    }

    incrementCells(cell)
    {
        if (!cell.isMine)
        {
            this.cellCount--;
        }
        if (this.cellCount <= 0)
        {
            this.props.onGameOver(2);
        }
        this.props.onCellRevealed(this.cellCount);
    }

    flagCell(field,cell)
    {
        if (!cell.isRevealed)
        {
            if (cell.isFlagged)
            {
                field[cell.corY][cell.corX].isFlagged = false;
                this.incrementFlag(1);
            }
            else
            {
                if(this.props.flags > 0)
                {
                    field[cell.corY][cell.corX].isFlagged = true;
                    this.incrementFlag(-1);
                }
            }
        }
        return field[cell.corY][cell.corX];
    }
    
    revealCell(field,cell)
    {
        this.incrementCells(cell);
        field[cell.corY][cell.corX].isRevealed = true;
        return field[cell.corY][cell.corX];
    }

    revealNeighbours(field,cell)
    {
        let neighbours = getNeighboursOfNestedArrayIndex(this.state.field,cell.corX,cell.corY);
    
        neighbours.forEach(neighbour => 
        {  
            if (!neighbour.isRevealed)
            {
                this.checkCell(neighbour);   
            }
        });

        return field;
    }

    revealMines(field,cell)
    {
        console.log('💣 revealMines()')
        
        return iterizeNestedArrayDoThingIf(field,(nestedArray,x,y)=>
        {
            if (nestedArray[y][x].isMine)
            {
                if (x == cell.corX && y == cell.corY)
                {
                    nestedArray[y][x].isExploded = true;
                }
                nestedArray[y][x] = this.revealCell(field,nestedArray[y][x]);
                nestedArray[y][x] = this.flagCell(field,nestedArray[y][x]);
            }
            return nestedArray[y][x];
        })
    }

    checkCell(cell)
    {
        console.log('🔎 checkCell()');
        if (!cell.isRevealed & !cell.isFlagged & !this.props.gameOver)
        {
            let fieldData = this.state.field;

            if (cell.isEmpty)
            {
                cell = this.revealCell(fieldData,cell);
                cell = this.flagCell(fieldData,cell);
                fieldData = this.updateCellOfField(fieldData,cell);
                fieldData = this.revealNeighbours(fieldData,cell);
            }
            else if (!cell.isEmpty && !cell.isMine)
            {
                cell = this.revealCell(fieldData,cell);
                cell = this.flagCell(fieldData,cell);
                fieldData = this.updateCellOfField(fieldData,cell);
            }
            else if (cell.isMine)
            {
                fieldData = this.revealMines(fieldData,cell);
                this.props.onGameOver(1);
            }
            this.updateState(fieldData);
        }   
    }

    handleLeftClick(cell)
    {
        this.checkCell(cell);
    }

    handleRightClick(cell)
    {
        if (!this.props.gameOver)
        {
            let fieldData = this.state.field;

            cell = this.flagCell(fieldData,cell);
            fieldData = this.updateCellOfField(fieldData,cell);

            this.updateState(fieldData);
        }
    }

    handleGameOver()
    {
        this.props.onGameOver();
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.pendingNewGame == true & prevProps.pendingNewGame == false)
        {
            this.newGame();
            this.props.afterNewGame();
        }
    }

    render() {
        const divStyle = {
            gridTemplateColumns: 'repeat('+this.props.width+',1fr)',
            gridTemplateRows: 'repeat('+this.props.height+',1fr)'
          };

        return (
            <div className="Field" style={divStyle}>        
                 {
                    this.state.field.map(innerArray => innerArray.map(item => 
                    <Cell 
                        key={String('x'+item.corX+'y'+item.corY)}
                        corX={item.corX}
                        corY={item.corY}
                        isMine={item.isMine}
                        isExploded={item.isExploded}
                        isRevealed={item.isRevealed}
                        isEmpty={item.isEmpty}
                        isFlagged={item.isFlagged}
                        neighbours={item.neighbours}
                        onLeftClick = {this.handleLeftClick}
                        onRightClick = {this.handleRightClick}
                    />))
                }                    
            </div>
        );
    }
}

export default Field;