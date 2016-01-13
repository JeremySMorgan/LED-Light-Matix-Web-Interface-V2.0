/**
 * Created by admin on 1/8/16.
 */


/*

 < ------------------------- ROWS ARE LEFT RIGHT ------------------------- >


 |
 |
 |
 |
 |
 |
 COLUMNS ARE UP DOWN
 |
 |
 |
 |
 |
 |

 */


// This function creates a DrawEngine object and calls its functions

function DrawEngineCreation(numberDivsPerRow, numberDivsPerColumn){

    var DE = new DrawEngine(numberDivsPerRow, numberDivsPerColumn);
    window.numberDivsPerRow = numberDivsPerRow;
    window.numberDivsPerColumn = numberDivsPerColumn;
    DE.addDivsToArray();
}

function clearDrawingArea(){
    var DE = new DrawEngine(window.numberDivsPerRow, window.numberDivsPerColumn);
    DE.clearDrawingArea();
}


// The DrawEngine object creates event listeners for all singleDivs and changes their color

function DrawEngine(numberDivsPerRow, numberDivsPerColumn){

    // Number of divs per row and column
    this.numberDivsPerRow = numberDivsPerRow;
    this.numberDivsPerColumn = numberDivsPerColumn;

    var drawing = false;

    //Changes color of clicked square!
    function manageClick(i,j){

        if (drawing){

            // Set singleDiv of concern to value of color picker
            document.getElementById(i+":"+j).style.backgroundColor = "#"+document.getElementById("HEXOUTPUT").value;
        }

    }


    // Iterates through all singleDivs and adds event listeners
    this.addDivsToArray = function(){
        for (i = 0; i < this.numberDivsPerRow; i++) {
            for (j = 0; j < this.numberDivsPerColumn; j++) {

                var divIncrement = function(i,j) {
                    return function(){
                        manageClick(i,j);}
                };

                id=(i+":"+j).toString();

                // THIS WORKS!!! JUST NOT VERY GOOD!
                document.getElementById(id).addEventListener("mouseover",divIncrement(i,j),false);

                document.body.onmousedown = function() {
                    setDrawing(true);
                };

                document.body.onmouseup = function(){
                    setDrawing(false);
                };

                function setDrawing(bool){
                    drawing = bool;
                }


            }
        }
    };


    this.clearDrawingArea = function(){
        for (i = 0; i < this.numberDivsPerRow; i++) {
            for (j = 0; j < this.numberDivsPerColumn; j++) {
                id=i+":"+j;
                document.getElementById(id).style.backgroundColor = "transparent";
            }
        }
    }


}

