
function computerMove(piecePositionComputer) {      
                                   
    // find spaces computer can move to
    var spc = findSpaces(piecePositionComputer+1,true);
    var openSpaces = spc[2];
    var chooseFromPaths = new Array();
    var checkCircularPaths = new Array();

    // determine longest path and go in that direction
    var passSpace = new Array();
    for (var g=0;g<openSpaces.length;g++) {
        var mostOnwardMoves = new Array();
        passSpace[0] = openSpaces[g]; 
        var m = longestPath(passSpace,mostOnwardMoves,checkCircularPaths,0);
        chooseFromPaths.push(Math.max.apply(null,m));     
    }

    // choose best space with most onward moves
    var lg = Math.max.apply(null,chooseFromPaths); 
    var bestSpace = openSpaces[chooseFromPaths.indexOf(lg)];
    
    // player won
    if (chooseFromPaths.length==0) { 
        alert("You Win!!!!!!!!!!!!!!");
        var angle = 0; setInterval(function(){ angle+=3; $(".whiteKnight").rotate(angle); },20); 
    } 
    else { moveComputerPiece(piecePositionComputer+1,bestSpace,spc[1]); }
    
    console.log('had spaces: '+openSpaces); 
    console.log('best path lengths: '+chooseFromPaths); 
    console.log('best space: '+bestSpace);
    console.log("---------------------");
    
}

// returns array with all possible path lengths
function longestPath(initalSpaces,mostOnwardMoves,checkCircularPaths,pathLen) {  
    for (var x=0;x<initalSpaces.length;x++) {
        // make sure space was not visited
        if (checkCircularPaths.toString().indexOf(initalSpaces[x]) == -1) {
            checkCircularPaths.push(initalSpaces[x]);   
            var nextMoves = findSpaces(initalSpaces[x],true);
            // prevent cycling deeper in graph
            for (var t=0;t<checkCircularPaths.length;t++) {
                if (nextMoves[2].indexOf(checkCircularPaths[t]) != -1) { 
                    nextMoves[2].splice(nextMoves[2].indexOf(checkCircularPaths[t]),1); 
                }   
            }
            pathLen += 1;
            mostOnwardMoves.push(checkCircularPaths.length);
            if (pathLen < 5) { longestPath(nextMoves[2],mostOnwardMoves,checkCircularPaths,pathLen); }
            checkCircularPaths.pop();
            pathLen -= 1;
        } 
    }
    return mostOnwardMoves; 
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
    
    
