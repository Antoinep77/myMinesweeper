import React from 'react';
import {Cell} from './Cell';
import {generateBoard} from '../tools/boardGeneration';
import {getNewBoard} from '../tools/zerosDFS';
import {checkWin} from '../tools/checkWin';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: generateBoard(10,10,15),
            bombNumber:15,
            ended:false
        }
        this.revealCell = this.revealCell.bind(this);
        this.disactivateCell = this.disactivateCell.bind(this);
        this.restartGame = this.restartGame.bind(this);
        props.onNewGame(this.restartGame);
    }

    restartGame(rowNumber,colNumber,bombNumber){
        this.setState({board:generateBoard(rowNumber,colNumber,bombNumber), bombNumber, ended:false});
    }


    revealCell(cellRow,cellCol){
        let cellProps = this.state.board[cellRow][cellCol];
        if (!cellProps.disactivated && !(this.state.ended)){
            let newBoard = this.state.board.map((row,i)=> row.map((cell,j)=>{
                return (i===cellRow && j===cellCol) ? {...cell,revealed:true} : cell
            }))

            if (cellProps.neighbours === 0 && !cellProps.isBomb)
                newBoard = getNewBoard(this.state.board,cellRow,cellCol);

            if (cellProps.isBomb){
                newBoard = this.state.board.map((row,i) => row.map((cell,j)=>{
                  if (cellRow===i && cellCol === j)
                    return {...cell, revealed:true, exploding:true}
                  return  cell.isBomb? {...cell, revealed:true} : cell;
                }))
                this.setState({ended:true});
                setTimeout(() => window.alert("You loose !"),50);

            }
            var winBoard = checkWin(newBoard,this.state.bombNumber);
            if (winBoard){
                newBoard = winBoard;
                this.setState({ ended:true});
                setTimeout(() =>window.alert("You won !"),50);
            }

            this.setState({board:newBoard});
        }
    }

    disactivateCell(cellRow,cellCol){
        let cellProps = this.state.board[cellRow][cellCol];
        if (!cellProps.revealed && !(this.state.ended)){
            let newBoard = this.state.board.map((row,i)=> row.map((cell,j)=>{
                return (i===cellRow && j===cellCol) ? {...cell,disactivated:!cellProps.disactivated } : cell
            }))
            this.setState({board:newBoard});
        }
    }


    render(){
        return (
        <table>
            <tbody>
            { this.state.board.map( (row,cellRow) =>
                <tr>{
                row.map((cellProps,cellCol) => (<td>
                    <Cell cellStatus={cellProps} onLeftClick={()=>this.revealCell(cellRow,cellCol)} 
                    onRightClick={()=>this.disactivateCell(cellRow,cellCol)} /> 
                    </td> )
                )}
                </tr>)
            }
            </tbody>
        </table>
        )
    }
}

export {Board}