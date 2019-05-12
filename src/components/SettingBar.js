import React from 'react';

class SettingBar extends React.Component{

    constructor(props){
        super(props);
        this.maxCols =30;
        this.maxRows=20;
        this.state = {
            advanced: false,
            rowNumber :10,
            colNumber: 10,
            bombNumber :15,
            level : "small",
            gameLevels:{
                small:{
                    rowNumber :10,
                    colNumber: 10,
                    bombNumber :15
                },
                medium:{
                    rowNumber :15,
                    colNumber: 15,
                    bombNumber :30
                },
                large:{
                    rowNumber :20,
                    colNumber: 20,
                    bombNumber :60
                }
            }
        }
        this.startNewGame = this.startNewGame.bind(this);
        this.handleBombNumber=this.handleBombNumber.bind(this);
        this.handleColNumber=this.handleColNumber.bind(this);
        this.handleRowNumber=this.handleRowNumber.bind(this);
    }

    startNewGame(event){
        event.preventDefault();
        if (window.confirm("Do you want to start a new game ? \n You will loose track of the current game."))
            this.props.startNewGame(this.state.rowNumber,this.state.colNumber,this.state.bombNumber);
    }

    handleBombNumber(event){
        var bombLimit = Math.floor(this.state.colNumber*this.state.rowNumber/2);
            if (event.target.value > bombLimit) {
              event.target.setCustomValidity('With these dimensions, there should be less than '+bombLimit+'bombs.');
           } else {
              event.target.setCustomValidity("");
            }
        this.setState({bombNumber:parseInt(event.target.value)})
    }
    handleRowNumber(event){
        if (event.target.value > this.maxRows) {
          event.target.setCustomValidity('The number of rows is limited to '+this.maxRows);
       } else if(event.target.value < 1 ){
            event.target.setCustomValidity('There should be atleast one row.');
       }
       else {
          event.target.setCustomValidity("");
        }
    this.setState({rowNumber:parseInt(event.target.value)})
}
    handleColNumber(event){
        if (event.target.value > this.maxCols) {
            event.target.setCustomValidity('The number of columns is limited to '+this.maxCols);
        }else if(event.target.value < 1 ){
        event.target.setCustomValidity('There should be atleast one column.');
        }
        else {
              event.target.setCustomValidity("");
            }
        this.setState({colNumber:parseInt(event.target.value)})
    }

    render(){
        return (
            <form class="needs-validation" onSubmit={this.startNewGame}>     

            {this.state.advanced ?
                    (<div class="form-row">
                        <div class="col-md-4 mb-3">
                        <label for="row">
                            Number of rows :
                            </label>
                            <input id="row" type="number" value ={this.state.rowNumber} 
                                onChange={this.handleRowNumber}/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="col">
                                Number of columns :
                            </label>
                            <input id ="col" type="number" value ={this.state.colNumber} 
                                onChange={this.handleColNumber}/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="bomb">
                                Number of bombs :
                            </label>
                            <input id="bomb" type="number" value ={this.state.bombNumber} 
                                onChange={this.handleBombNumber}/>
                        </div>
                    </div>)
                    :<div class="form-group">
                        <label for="gameLevel">
                            Select your level :
                        </label>
                        <div>
                        <select id="gameLevel" value={this.state.level} onChange={(event)=> this.setState({level:event.target.value,...this.state.gameLevels[event.target.value] })}>
                            {Object.keys(this.state.gameLevels).map(level => (
                                <option value={level}>{level}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                }

            <label>
                <input type="checkbox" onChange={(event)=> this.setState({advanced:event.target.checked})} checked ={this.state.advanced}/>
                {" Advanced parameters"}
            </label> 
                <div>
                    <button >Start a new game</button>
                </div>
            </form>)
    }
} 

export {SettingBar};