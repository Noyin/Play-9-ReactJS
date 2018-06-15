import React from 'react';
import Stars from './Stars';
import Answer from './Answer';
import Button from './Button';
import Numbers from './Numbers';
import Done from './Done';


class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars : Game.randomNumber(),
        answerIsCorrect : null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
    });
    state = Game.initialState()

    possibleCombinationSum = function(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars ===
            prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }))
    };

    acceptAnswer = () => {
        this.setState((prevState) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), () => {this.updateDoneStatus()}
        
        );

        this.setState()
    };

    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(number =>
        usedNumbers.indexOf(number) === -1)

        return this.possibleCombinationSum(possibleNumbers, randomNumberOfStars)
    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!'}
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!'}
            }
        });
    }

    redraw = () => {
        if(this.state.redraws > 0) {
            this.setState(prevState => ({
                randomNumberOfStars: Game.randomNumber(),
                selectedNumbers: [],
                answerIsCorrect: null,
                redraws: prevState.redraws - 1
            }), () => 
            this.updateDoneStatus())
        }
    }

    resetGame = () => {
        this.setState(Game.initialState())
    }

    
    render() {
        const {
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus
        } = this.state;

        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars randomNumberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} 
                    checkAnswer={this.checkAnswer} 
                    answerIsCorrect={answerIsCorrect} 
                    acceptAnswer={this.acceptAnswer}
                    redraw={this.redraw}
                    redraws={redraws}/>
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <br />
                <br/>
                {doneStatus ?
                    <Done doneStatus={doneStatus} resetGame={this.resetGame}/> : <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}/> 

                }
            </div>
        );
    }
}

export default Game;
