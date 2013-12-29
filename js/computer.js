
function computerMove(piecePositionComputer) {      
                                   
    // find spaces computer can move to
    var spc = findSpaces(piecePositionComputer+1,true);
    var openSpaces = spc[2];
    var mostOnwardMoves = new Array();
    var checkCircularPaths = new Array();
    
    // determine where computer should move based on open positions...
    // for the knight's tour, Warnsdorff's heuristic is a good approx so for 
    // joust the computer will do something similar except move to a space
    // where it will have the greatest onward moves... 
    // cycling is prevented for 4 iterations of onward moves
    for (var x=0;x<openSpaces.length;x++) {          
        var sum = 0;
        var moves = findSpaces(openSpaces[x],true); 
        checkCircularPaths.push(openSpaces[x]);
        checkCircularPaths.push(moves[2]);
        for (var y=0;y<moves[2].length;y++) {      
            sum += 1;  
            var moves_2 = findSpaces(moves[2][y],true); 
            for (var z=0;z<moves_2[2].length;z++) { 
                // prevent cycling for 2nd set of spaces
                if (checkCircularPaths.toString().indexOf(moves_2[2][z]) == -1) {   
                    checkCircularPaths.push(moves_2[2][z]);                          
                    sum += 1; 
                    var moves_3 = findSpaces(moves_2[2][z],true);
                    for (var w=0;w<moves_3[2].length;w++) { 
                        // prevent cycling for 3rd set of spaces
                        if (checkCircularPaths.toString().indexOf(moves_3[2][w]) == -1) { 
                            checkCircularPaths.push(moves_3[2][w]);
                            sum += 1;   
                            var moves_4 = findSpaces(moves_3[2][w],true); 
                            for (var v=0;v<moves_4[2].length;v++) { 
                                // prevent cycling for 4th set of spaces
                                if (checkCircularPaths.toString().indexOf(moves_4[2][v]) == -1) {    
                                    sum += 1; 
                                }            
                            }   
                        }       
                    }   
                }          
            } 
        } 
        
        mostOnwardMoves.push(sum);
        checkCircularPaths = new Array();
    }
        
    // choose best space with most onward moves
    var lg = Math.max.apply(null,mostOnwardMoves); 
    var bestSpace = openSpaces[mostOnwardMoves.indexOf(lg)];

    console.log(openSpaces); 
    console.log(mostOnwardMoves); 
    console.log(bestSpace);
    
    // player won
    if (mostOnwardMoves.length==0) { 
        alert("You Win!!!!!!!!!!!!!!");
        var angle = 0;
        setInterval(function(){ angle+=3; $(".whiteKnight").rotate(angle); },20); 
    } 
    
    // move black knight
    else { moveComputerPiece(piecePositionComputer+1,bestSpace,spc[1]); }
    
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
    
    
