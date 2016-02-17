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

function executeDataSend(numberDivsPerRow, numberDivsPerColumn){
    var DE = new DataSendEngine(numberDivsPerRow, numberDivsPerColumn);
    DE.sendData();
    DE.printData();
}

function DataSendEngine(numberDivsPerRow, numberDivsPerColumn){
    this.numberDivsPerRow = numberDivsPerRow;
    this.numberDivsPerColumn = numberDivsPerColumn;


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

        xInv = true;
        count = 0;

        for(var Y = 0; Y < numberDivsPerColumn; Y++) {

            if (xInv){
                for (var Xinvr = 0; Xinvr < numberDivsPerRow; Xinvr++) {


                    console.log("x going Right: "+Xinvr);

                    count++;
                    JSONObject.matrix_data.push({
                        COLOR: this.getColor(Xinvr,Y)
                    });

                }
                xInv = false;
            }

            else{
                for (var X = numberDivsPerRow-1; X >= 0; X--) {

                    console.log("x going LEFT: "+X);

                    count++;
                    JSONObject.matrix_data.push({
                        COLOR: this.getColor(X,Y)
                    });

                }
                xInv = true;
            }


        }

        console.log("count: "+ count);

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
        //xhttp.open("POST", "ajax_data:"+JSON.stringify(JSONObject)+"&END=true", true);
        //xhttp.send();
    };



}
