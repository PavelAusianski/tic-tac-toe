class TicTacToe {
 
    constructor() {
        this.currentPlayerSymbol = 'x';
        this.gridSize = 3;
        this.matrix = TicTacToe.createMatrix(this.gridSize, this.gridSize, null);
    }
 
    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }
 
    nextTurn(rowIndex, columnIndex) {
        let fieldValueIcon = this.getFieldValue(rowIndex, columnIndex);
        if (fieldValueIcon != null) {
            return;
        }
        this.matrix[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
        this.changePlayer();
    }
 
    changePlayer() {
        this.currentPlayerSymbol = this.getCurrentPlayerSymbol() === 'x' ? 'o' : 'x';
    }
 
    isFinished() {
        return this.getWinner() != null || this.isDraw();
    }
 
    getWinner() {
        let rowWinner = this.getRowWinner(),
            colWinner = this.getColWinner(),
            diagonalWinner = this.getDiagonalWinner();
 
        if (rowWinner != null) {
            return rowWinner;
        } else if (colWinner != null) {
            return colWinner;
        } else if (diagonalWinner != null) {
            return diagonalWinner;
        } else {
            return null;
        }
    }
 
    //check horizontal winner
    getRowWinner() {
        for (let i = 0; i < this.gridSize; i++) {
            let score = 0;
            for (let j = 0; j < this.gridSize; j++) {
                score += this.getFieldValueScore(i, j);
            }
            if (this.determineIconByScore(score) != null) {
                return this.determineIconByScore(score);
            }
        }
        return null;
    }
 
    //check vertical  winner
    getColWinner() {
        for (let i = 0; i < this.gridSize; i++) {
            let score = 0;
            for (let j = 0; j < this.gridSize; j++) {
                score += this.getFieldValueScore(j, i);
            }
            if (this.determineIconByScore(score) != null) {
                return this.determineIconByScore(score);
            }
        }
        return null;
    }
 
    //check diagonals  winner
    getDiagonalWinner() {
        let mainDiagonalScore = 0, secondaryDiagonalScore = 0;
        for (let i = 0; i < this.gridSize; i++) {
            mainDiagonalScore += this.getFieldValueScore(i, i);  // main diagonal
            secondaryDiagonalScore += this.getFieldValueScore(i, this.gridSize - i - 1);
        }
        let mainDScoreIcon = this.determineIconByScore(mainDiagonalScore),
            secondDScoreIcon = this.determineIconByScore(secondaryDiagonalScore);
 
        if (mainDScoreIcon != null) {
            return mainDScoreIcon;
        } else if (secondDScoreIcon != null) {
            return secondDScoreIcon;
        } else {
            return null;
        }
    }
 
    printMatrix(matrix) {
        console.log('__________________');
        let text = '';
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                let val = matrix[i][j];
                text += (val === null ? '_' : val) + ' ';
            }
            console.log(text);
            text = '';
        }
    }
 
    determineIconByScore(score) {
        if ((Math.abs(score) === this.gridSize)) {
            return score > 0 ? 'x' : 'o';
        } else {
            return null;
        }
    }
 
    getFieldValueScore(rowIdx, colIdx) {
        //assume that field with 'x' scores 1 and with 'o' scores -1, if empty - 0
        let fieldValue = this.getFieldValue(rowIdx, colIdx);
        return fieldValue == null ? 0 : fieldValue === 'x' ? 1 : -1;
    }
 
    noMoreTurns() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }
 
    isDraw() {
        return this.getWinner() == null && this.noMoreTurns();
    }
 
    getFieldValue(rowIndex, colIndex) {
        return this.matrix[rowIndex][colIndex];
    }
 
    static createMatrix(rows, cols, initialElementValue) {
        let rowsArray = [];
        for (let i = 0; i < rows; i++) {
            let colsArray = [];
            for (let j = 0; j < cols; j++) {
                colsArray[j] = initialElementValue;
            }
            rowsArray[i] = colsArray;
        }
        return rowsArray;
    }
}
 
module.exports = TicTacToe;