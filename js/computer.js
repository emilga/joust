
function computerMove(piecePositionComputer) {      
                                   
    // find spaces computer can move to
    var spc = findSpaces(piecePositionComputer+1,true);
    var openSpaces = spc[2];
    var mostOnwardMoves = new Array();
    
    // determine where computer should move based on open positions...
    // for the knight's tour, Warnsdorff's rule is a good approx so for 
    // joust the computer will do something similar except move to a space
    // where it will have the greatest onward moves
    for (var x=0;x<openSpaces.length;x++) {  
        
        var sum = 0;
        if ((openSpaces[x]<=0) || (openSpaces[x]>=64)) { 
            mostOnwardMoves.push(0); 
        }  
        else { 
            var moves = findSpaces(openSpaces[x],true);
            for (var y=0;y<moves[2].length;y++) {
                if ((moves[2][y] > 0) && (moves[2][y] < 64)) { sum += 1; }    
            } 
            mostOnwardMoves.push(sum);
            sum = 0;
        }
    }
        
    // determine space to move to with most onward moves
    // ties are broken arbitraily here by taking first
    // element in openSpaces that appears in case of a tie  
    // develop something better for tie breaking eventually  
    // e.g. go further in tree and view more onward spaces
    var lg = Math.max.apply(null,mostOnwardMoves);      
    var bestSpace = openSpaces[mostOnwardMoves.indexOf(lg)];
    
    console.log(openSpaces);
    console.log(mostOnwardMoves);   
    console.log(bestSpace);
    
    // player won
    if ((bestSpace<=0) || (bestSpace>64)) { 
        alert("You Win!!!!!!!!!!!!!!");
        var angle = 0;
        setInterval(function(){ angle+=3; $(".whiteKnight").rotate(angle); },20); 
    } 
    
    // move black knight
    moveComputerPiece(piecePositionComputer+1,bestSpace,spc[1]);
    
} 

// move black knight to new space  
function moveComputerPiece(curBlackSpace,newSpace,currentBoard) {
    
    // update input board
    currentBoard[curBlackSpace-1] = 'x';
    currentBoard[newSpace-1] = 'B';
    $('#chessboardInput').val(currentBoard.join('')); 
                            
    // update display board  
    $('#chessboard td[data-pos='+(newSpace)+']').append("<div class='blackKnight'><img src='black.png' /></div>"); 
    $('#chessboard td[data-pos='+(curBlackSpace)+']').children('div').remove();
    $('#chessboard td[data-pos='+(curBlackSpace)+']').addClass('gone');
    
}
    
    
