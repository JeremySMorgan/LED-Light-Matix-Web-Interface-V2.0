/**
 * Created by admin on 1/10/16.
 */

function executeDataSend(numberDivsPerRow, numberDivsPerColumn,returnHex){

    var DE = new DataSendEngine(numberDivsPerRow, numberDivsPerColumn,returnHex);
    DE.sendData();
    DE.printData();
}


function DataSendEngine(numberDivsPerRow, numberDivsPerColumn,returnHex){

    this.numberDivsPerRow = numberDivsPerRow;
    this.numberDivsPerColumn = numberDivsPerColumn;
    this.returnHex = returnHex;

    var JSONObject = {"matrix_data":[]};

    this.sendData = function(){

        for(var i=0; i<numberDivsPerRow; i++){
            for(var j = 0; j<numberDivsPerColumn;j++){
                divColor = "";

                if(this.returnHex){
                    try{
                        divColor = rgb2hex(document.getElementById(i+":"+j).style.backgroundColor);
                    }
                    catch(err){
                        divColor =  "transparent";
                    }
                }
                else{
                    divColor = document.getElementById(i+":"+j).style.backgroundColor;
                }

                if (divColor === ""){
                    divColor="transparent";
                }

                JSONObject.matrix_data.push({
                        row: i,
                        column: j,
                        divColor: document.getElementById(i+":"+j).style.backgroundColor
                });
            }
        }


    };

    this.printData = function(){
        console.log(JSONObject);
    };



    var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

    //Function to convert hex format to a rgb color
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }



}