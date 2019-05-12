import React from 'react';
import {Board} from './Board';
import {SettingBar} from './SettingBar';

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            callback:null
        }
        this.startNewGame = this.startNewGame.bind(this);
        this.onNewGame = this.onNewGame.bind(this);
    }

    startNewGame(rowNumber,colNumber,bombNumber){
        this.state.callback(rowNumber,colNumber,bombNumber);
    }

    onNewGame(callback){
         this.setState({callback})
    }

    render(){
        return (
            <div class="game">
                <div class="setting-bar">
                    <SettingBar startNewGame={this.startNewGame}/>
                </div>
                <div class="board">
                    <Board onNewGame={this.onNewGame}/>
                </div>
            </div>
        )
    }
}
export {Game};