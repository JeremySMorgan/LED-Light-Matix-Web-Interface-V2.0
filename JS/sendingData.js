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

function executeDataSend(numberDivsPerRow, numberDivsPerColumn,returnHex){
    var DE = new DataSendEngine(numberDivsPerRow, numberDivsPerColumn,returnHex);
    DE.sendData();
    DE.printData();
}

function DataSendEngine(numberDivsPerRow, numberDivsPerColumn,returnHex){
    this.numberDivsPerRow = numberDivsPerRow;
    this.numberDivsPerColumn = numberDivsPerColumn;
    this.returnHex = false;


    var JSONObject = {"matrix_data":[]};


    this.getColor = function(X,Y){
        var trans = "transpar";
        var XdivColor = "transpar";
        try {
            if(this.returnHex){
                try{
                    XdivColor = rgb2hex(document.getElementById(X+":"+Y).style.backgroundColor);
                }
                catch(err){
                    XdivColor=trans;
                }
            }
            else{
                XdivColor = document.getElementById(X+":"+Y).style.backgroundColor;
            }
        }
        catch(err){
            XdivColor =  trans;
        }
        if (XdivColor===""){
            XdivColor = trans;
        }
        if (XdivColor===" "){
            XdivColor = trans;
        }

        return XdivColor;
    };






    // CREATE JSON OBJECT TO SEND
    this.sendData = function() {

        xInv = false;

        for(var Y = 0; Y < numberDivsPerColumn; Y++) {


            if (xInv){
                for (var Xinv = 0; Xinv < numberDivsPerRow; Xinv++) {

                    JSONObject.matrix_data.push({
                        COLOR: this.getColor(Xinv,Y)
                    });

                }
                xInv = false;
            }

            else{
                for (var X = numberDivsPerRow; X > 0; X--) {

                    JSONObject.matrix_data.push({
                        COLOR: this.getColor(X,Y)
                    });

                }
                xInv = true;
            }


        }







    };



    // THIS IS WHERE WE SEND DATA TO ARDUINO!!
    this.printData = function(){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("demo").innerHTML = xhttp.responseText; // I JUST CHANGED THIS!?!
            }
        };

        console.log(JSON.stringify(JSONObject));
        xhttp.open("POST", "ajax_data:"+JSON.stringify(JSONObject)+"&END=true", true);
        xhttp.send();
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
