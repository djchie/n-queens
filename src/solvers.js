/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var emptyBoard = new Board({'n':n})

  var solutions = [];

  var iterationCount = 0;
  //Take set of previous solutions; stick in corner from 0,0 to (n-1, n-1)
  //Augment with diagonal 1 in n,n
  //Rotate all previous solutions three times to get all variations

  var recursiveSolver = function(curBoard) {
    if(curBoard.get('n')===1) {
      return [[[1]]];
    }
    else {
      var currentSolutions = [];
      var augmentedSolutions = [];

      var smallerBoard = new Board({'n': (curBoard.get('n')-1)});     //Initialize a board of size n-1
      var smallerSolutions = recursiveSolver(smallerBoard);           //Recursively solve for the solutions for a board of size n-1
      for(var i = 0; i < smallerSolutions.length; i++) {              //Iterates through all of the solutions for the smaller board of size n-1 and augment to size n by padding existing rows
        var augmentedSolution = smallerSolutions[i].slice(0);  //with an extra 0 and adding an extra row at the bottom with a 1 at the end  
        for(var j = 0; j < smallerSolutions[i].length; j++) {           //Pad the end of the existing rows with 0
          augmentedSolution[j].push(0); 
        }

        var newRow = [];                                              //Creates a new row of length n and pushes it to the bottom of the augmented solution
        for(var k = 0; k < curBoard.get('n'); k++)  
        {
          if(k === curBoard.get('n')-1) {
            newRow.push(1);
          }
          else {
            newRow.push(0);
          }
        }
        augmentedSolution.push(newRow);                               //One of the solutions for the smaller (n-1) board has now been completely augmented with padding of extra 0s and additional row
        augmentedSolutions.push(augmentedSolution);                   
      }
    }

    var rotatedSolutions = [];
    for(var m = 0; m < augmentedSolutions.length; m++) {
      rotatedSolutions.push(augmentedSolutions[m]);
      for(var n = 0; n < 3; n++) {
        rotatedSolutions.push(rotateClockwise(rotatedSolutions[rotatedSolutions.length-1]));
      }
    }

    return solutionCleaner(rotatedSolutions);
  }

  var rotateClockwise = function(oldMatrix) {
    // i = rows
    // j = columns
    var n = oldMatrix.length;
    var newMatrix = [];
    for (var i = 0; i < n; i++) {
      var newRow = [];
      for (var j = 0; j < n; j++) {
        newRow.push(0);
      }
      newMatrix.push(newRow);
    }
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        newMatrix[i][j] = oldMatrix[n - j - 1][i];
      }
    }
    return newMatrix;
  }
  
  // var recursiveHelper = function(curBoard, numRooks) {

  //   for(var i = 0; i < n; i++) {                            //Iterate through columns
  //     for(var j = 0; j < n; j++) {                          //Iterate through rows
  //       console.log(iterationCount);
  //       if(curBoard.rows()[j][i] === 0) {                   //Checks whether space is free
  //         iterationCount++;
  //         curBoard.togglePiece(j, i);                       //Toggles to fill the free space with a rook
          
  //         var newMatrix = curBoard.rows();        //Creates a copy of the board with the new rook placement
  //         var copyMatrix = [];
  //         for(var k = 0; k < newMatrix.length; k++) {
  //           copyMatrix.push(newMatrix[k].slice(0));
  //         }
  //         var newBoard = new Board(copyMatrix);
          
  //         curBoard.togglePiece(j, i);                       //Toggles to undo the new rook placement 
          
  //         if(!newBoard.hasAnyRooksConflicts()) {  //If the new board does not have any conflicts 
  //           numRooks--;
  //           if(numRooks === 0) {
  //             //Set temporary board with coordinate marked and push to 'solutions' in the outer scope
  //             solutions.push(newBoard);

  //           } else {
  //             recursiveHelper(newBoard, numRooks);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  console.log('Solving for ' + n + ' rooks');

  var solutionCleaner = function(solutionSet) {
    var flatStrings = [];
    for(var i = 0; i < solutionSet.length; i++) {
      flatStrings.push(_.flatten(solutionSet[i]).toString());
    }
    var cleanStrings = _.uniq(flatStrings);

    var cleanSet = [];

    for(var j = 0; j < cleanStrings.length; j++) {  //For every string representing a flattened, unique solution
      var numbers = cleanStrings[j].split(',');     //Breakup that string into an array of numbers that is n^2 long

      var n = Math.sqrt(numbers.length);            //Calculates n (i.e., the size of the board)

      var cleanSolution = [];
      var newRow = [];
      for(var k = 0; k < numbers.length; k++) {                  //Generates the row for a solution
        newRow.push(parseInt(numbers[k]));
        if((k+1) % n ===0) {
          cleanSolution.push(newRow);
          newRow = [];
        }
      }
      cleanSet.push(cleanSolution);
    }      

    return cleanSet;
  }

  //Solutions are a matrix with two layers of square brackets
  solutions = recursiveSolver(emptyBoard);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions[0]));
  console.log('Found ' + solutions.length + ' possible solutions (including duplicates)');
  return solutions[0];
  };



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
