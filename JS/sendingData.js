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

                var XdivColor = "transparent";

                try {
                    if(this.returnHex){
                        try{
                            XdivColor = rgb2hex(document.getElementById(i+":"+j).style.backgroundColor);
                        }
                        catch(err){
                            XdivColor="transparent";
                        }
                    }

                    else{
                        XdivColor = document.getElementById(i+":"+j).style.backgroundColor;
                    }
                    }
                catch(err){
                    divColor =  "transparent";
                }

                if (XdivColor===""){
                    XdivColor = "transparent";
                }

                if (XdivColor===" "){
                    XdivColor = "transparent";
                }
                console.log(XdivColor);


                JSONObject.matrix_data.push({
                        row: i,
                        column: j,
                        divColor: XdivColor
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