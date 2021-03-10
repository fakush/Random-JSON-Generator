//Random JSON Generator
//TODO: Funcionalidad Copy to clipboard
// Cambio colores
//Añadir fechas - numero between - tabla?

//Variables globales
let newFieldset = `
                    <div class="row">
                        <div class="form-group col-3">
                            <input type="text" class="form-control" id="inputKey" placeholder="Key">
                        </div>
                        <div class="form-group col-9">
                            <input type="text" class="form-control" id="inputValues" placeholder="Values">
                        </div>
                    </div>
                    `;
let myJSON = [];
let myData = [];
class ArrayDeDatos {
    constructor (type, key, values) {
        this.type = type;
        this.key = key;
        this.values = values;
    }  
}

//Get a list of all the arrays with data.
function showDataFields() {
    let aux = ``; 
    for (let i = 0; i < myJSON.length; i++) {
        // let valuesString = JSON.stringify(myJSON[i].values);
        // let newString = valuesString.replace(",", ", ");
        aux+=`
            <div class="alert alert-secondary fade show shadow" role="alert">
                <button class="close" onclick="removeFieldset(${i})"><span class="material-icons">remove_circle_outline</span></button>    
                ${myJSON[i].key}: ${myJSON[i].values}
            </div>
        `;
    }
    return aux;
}

//Carga de valores precargados
let divPersona = ``;
let divObjetos = ``;
let divLugares = ``;
let divDatos = ``;

function divBoton(index){
    return `<button onclick="addArray(${index})" class="btn btn-dark shadow boton"><span class="material-icons">add_circle_outline</span> ${myData[index].tituloSet}</button>`;
}

function addDataButtons(){
    $.get("https://raw.githubusercontent.com/fakush/Random-JSON-Generator/master/js/datos-precargados.json", function(data, status){
        myData = JSON.parse(data);
        for (let i = 0; i < myData.length; i++) {
            if(myData[i].categoriaSet == "personas"){
                divPersona += divBoton(i);
                $("#categoriaPersona").html(divPersona);
            } else if(myData[i].categoriaSet == "objetos"){
                divObjetos += divBoton(i);
                $("#categoriaObjetos").html(divObjetos);
            } else if(myData[i].categoriaSet == "lugares"){
                divLugares += divBoton(i);
                $("#categoriaLugares").html(divLugares);
            } else if(myData[i].categoriaSet == "datos"){
                divDatos += divBoton(i);
                $("#categoriaDatos").html(divDatos);
            }
        }
    });
}

//Agregar y quitar lineas al generador.
function addArray(int){
    let sample = myData[int]; 
    let dataForArray = new ArrayDeDatos(sample.tipoSet, sample.setKey, sample.setValues);
    myJSON.push(dataForArray);
    document.getElementById("arrayDataContainer").innerHTML = showDataFields();
    $("#generateJSON").show(); //Muestra el boton para Generar el JSON.
}

function addFieldset(){
    if (document.getElementById(`inputKey`).value != "" && document.getElementById(`inputValues`).value != ""){
        let dataForArray = new ArrayDeDatos("singleData", document.getElementById(`inputKey`).value, document.getElementById(`inputValues`).value);
        myJSON.push(dataForArray);
        $("#generateJSON").show(); //Muestra el boton para Generar el JSON.
    }
}

function removeFieldset(i){ //Esto es solo para no olvidarme de implementar esta función.
    myJSON.splice(i, 1);
    $("#arrayDataContainer").html(showDataFields());
}

//Creates the JSON file
let outputJSON = []; //This array will contain all the mixed data of the JSON array.
let outputArray = [];
function generateJSON(){
    if (myJSON.length > 0) {
        $("#exportJSON").show(); //Muestra el boton para Exportar el JSON.
        let iteraciones = parseInt(document.getElementById(`multiplier`).value);
        let auxOut = ``;
        for (let i = 0; i < iteraciones; i++) {
            let salidaJson = []; //En este array se arma cada "entradaJSON"
            let salidaArray = []; //En este array se arma cada "entradaArray"
            let counter = 0;
            if (document.getElementById("addIndex").checked == true) {
                salidaJson[0] = ` "id": "${i}"`;
                salidaArray[0] = i;
                counter = 1;
            }
            for (let i = 0; i < myJSON.length; i++) {
                if (myJSON[i].type == "singleData"){
                    let valoresToArray = myJSON[i].values.split("' , '");
                    let valorRandom = valoresToArray[Math.floor(Math.random() * valoresToArray.length)];
                    salidaJson[i+counter] = ` "${myJSON[i].key}": "${valorRandom}"`;
                    salidaArray[i+counter]= `"${valorRandom}"`;
                } else if (myJSON[i].type == "numero") {
                    let valorRandom = Math.floor(myJSON[i].values[0] + (Math.random() * (myJSON[i].values[1] - myJSON[i].values[0])));
                    salidaJson[i+counter] = ` "${myJSON[i].key}": "${valorRandom}"`;
                    salidaArray[i+counter]= `"${valorRandom}"`;
                } else if (myJSON[i].type == "matrizDe3") {
                    valorRandom = myJSON[i].values[Math.floor(Math.random() * myJSON[i].values.length)];
                    // OJO AL PIOJO, CHEQUEATE ESTA MATRIX!!!
                    salidaJson[i+counter] = `"categoria": "${valorRandom[0]}", "subCategoria": "${valorRandom[1]}", "item": "${valorRandom[2][Math.floor(Math.random() * valorRandom[2].length)]}"`;
                    salidaArray[i+counter]= `"${valorRandom[0]}", "${valorRandom[1]}", "${valorRandom[2][Math.floor(Math.random() * valorRandom[2].length)]}"`;
                }else if (myJSON[i].type == "matrizDe2") {
                    valorRandom = myJSON[i].values[Math.floor(Math.random() * myJSON[i].values.length)];
                    salidaJson[i+counter] = `"provincia": "${valorRandom[0]}", "capital": "${valorRandom[1]}"`;
                    salidaArray[i+counter]= `"${valorRandom[0]}", "${valorRandom[1]}"`;
                }
            }
            auxOut+=`
                <div class="alert alert-danger" style="display:inline-block;" role="alert">
                    [${salidaArray}]
                </div>
                `;
            outputArray.push(`{${salidaArray}}`);
            outputJSON.push(`{${salidaJson}}`);
        }
        // document.getElementById("outputArrays").innerHTML = auxOut;
        // document.getElementById("jsonData").innerHTML = `
        //                                             <div class="alert alert-danger col-12" role="alert">
        //                                                     [${outputJSON}]
        //                                             </div>
        //                                             `;
    }
    //Ojo al piojo, dejo esta función separada porque luego de aprobar el TF quedará todo en una sola página.
    exportJSON();
}


// PAso todo esto a jQuery momentaneamente.
//Borra todo
function clearForm(){
    myJSON = [];
    $("#arrayRowContainer").html(newFieldset);
    $("#arrayDataContainer").html("");
    $("#outputJSON").html("");
    $("#jsonData").html("");
    $("#generateJSON").hide();
    $("#exportJSON").hide();
}


function exportJSON(){ //Pone el JSON en memoria y pasa a otra página.
    if (outputJSON.length != 0) {
        sessionStorage.setItem('outputJSON', JSON.stringify(outputJSON));
        sessionStorage.setItem('outputArray', JSON.stringify(outputArray));
        window.location.href = "resultados.html";
    }
}

//Here we go!
window.onload = function() {
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
    $("#generateJSON").hide(); //Oculta el boton para Generar el JSON.
    $("#exportJSON").hide(); //Oculta el boton para Exportar el JSON.
    $("#addFieldset").hide(); //Oculta el boton para añadir Fieldset.
    $("#inputKey").change(function(){
        keyStatus = true;
        checkStatus();
    });
    $("#inputValues").change(function(){
        valueStatus = true;
        checkStatus();
    });
    addDataButtons();
}

//Evento en JQuery
let keyStatus = false;
let valueStatus =  false;    
function checkStatus(){
    if (keyStatus == true && valueStatus == true) {
        $("#addFieldset").show(); //Muestra el boton para añadir Fieldset.
    }
}