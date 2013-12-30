                
// find available spaces for player & computer to move
function findSpaces(piecePosition,computerMove) {
   
   // get board and create array with individual spaces
   var currentBoard = $('#chessboardInput').val();
   currentBoard = currentBoard.split(/\r\n|\r|\n/g).join("").replace(/ /g,"").split("");  
   piecePosition = parseInt(piecePosition); 
   
   // determine possible spaces knight can move to
   var openSpaces = new Array(); 
   openSpaces.push(piecePosition+6,piecePosition-6,piecePosition+10,piecePosition-10,piecePosition+15,piecePosition-15,piecePosition+17,piecePosition-17); 
   
   // arrays to check for overlaps on board
   var spacesToRemove = new Array();
   var removeOverlaps_cols_1_2 = new Array(7,8,15,16,23,24,31,32,39,40,47,48,55,56,63,64);
   var removeOverlaps_cols_7_8 = new Array(1,2,9,10,17,18,25,26,33,34,41,42,49,50,57,58); 
   
   // determine what spaces are unavailable 
   for (var i=0;i<openSpaces.length;i++) {
        if ((currentBoard[openSpaces[i]-1] == 'x') || (currentBoard[openSpaces[i]-1] == 'B') || (currentBoard[openSpaces[i]-1] == 'W') ||
            (openSpaces[i] < 1) || (openSpaces[i] > 64)) {
            if (spacesToRemove.indexOf(openSpaces[i]) == -1) { spacesToRemove.push(openSpaces[i]); }   
        }  
        // check if columns 1/2 overlap to columns 7/8
        for (var c1=0;c1<removeOverlaps_cols_7_8.length;c1++) {
            if (piecePosition==removeOverlaps_cols_7_8[c1]) {
                if (removeOverlaps_cols_1_2.indexOf(openSpaces[i]) != -1) {
                     if (spacesToRemove.indexOf(openSpaces[i]) == -1) { spacesToRemove.push(openSpaces[i]); }
                }    
            }    
        }
        // check if columns 7/8 overlap to columns 1/2
        for (var c2=0;c2<removeOverlaps_cols_1_2.length;c2++) {
            if (piecePosition==removeOverlaps_cols_1_2[c2]) {
                if (removeOverlaps_cols_7_8.indexOf(openSpaces[i]) != -1) {
                     if (spacesToRemove.indexOf(openSpaces[i]) == -1) { spacesToRemove.push(openSpaces[i]); } 
                }    
            }    
        }
   }  
   
   // remove unavailable spaces so openSpaces will 
   // contain only the proper spaces knight can move to
   for (var i=0;i<spacesToRemove.length;i++) {
        openSpaces.splice(openSpaces.indexOf(spacesToRemove[i]),1); 
   }    
   
   // display only to player where moving is possible
   if (!computerMove) {
       for (var i=0;i<openSpaces.length;i++) { 
            $("#chessboard td[data-pos="+(openSpaces[i])+"]").addClass('movableGreenSpaces');
       } 
       // computer won
       if ($('.movableGreenSpaces').length == 0) { 
           alert('You Lose!!!!!!!!');
           var angle = 0; setInterval(function(){ angle+=3; $(".blackKnight").rotate(angle); },20); 
       }
   }  
   
   // returns current piece position, input board, and open spaces
   return new Array(piecePosition,currentBoard,openSpaces);
   
}

// move white knight to new space
function movePiece(curWhiteSpace,newSpace,currentBoard) {

    // update input board
    currentBoard[curWhiteSpace-1] = 'x';
    currentBoard[newSpace-1] = 'W';
    $('#chessboardInput').val(currentBoard.join('')); 
                            
    // update display board  
    $('#chessboard td[data-pos='+(curWhiteSpace)+']').children('div').remove();
    $('#chessboard td[data-pos='+(curWhiteSpace)+']').addClass('gone');
    $('#chessboard td[data-pos='+(newSpace)+']').append("<div class='whiteKnight'><img src='white.png' /></div>");
    $("#chessboard td").removeClass('movableGreenSpaces'); 
    
    // notify computer to move
    return true;
   
} 

