//Random DB Generator

//Variables globales
let index = 0;
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
class ArrayDeDatos {
    constructor (key, values) {
        this.key = key;
        this.values = values;
    }
    storeInLocal(key, values) {
        this.sessionStorage.setItem(index + "-"+ key, JSON.stringify(values));
    }    
}

//Get a list of all the arrays with data.
function showDataFields() {
    let aux = ``; 
    for (let i = 0; i < index+1; i++) {
        aux+=`
        <div class="row">
            <div class="alert alert-danger col-3" role="alert">
                ${myJSON[i].key}
            </div>
            <div class="alert alert-danger col-9" role="alert">
                ${myJSON[i].values}
            </div>
        </div>
        `;
    }
    return aux;
    // myJSON.storeInLocal;
}

//Agregar y quitar lineas al generador.
function addFieldset(){
    let dataForArray = new ArrayDeDatos(document.getElementById(`inputKey`).value, document.getElementById(`inputValues`).value);
    myJSON.push(dataForArray);
    // document.getElementById("arrayRowContainer").innerHTML = newFieldset;
    document.getElementById("arrayDataContainer").innerHTML = showDataFields();
    index++;
}

function removeFieldset(){
    console.log("removeFieldset");
}

//Get User values/filters

//Creates the JSON file
let outputArray = []; //This array will contain all the mixed data to stringify into JSON

function generateJSON(){
    // console.log("comienza la magia");
    if (myJSON.length > 0) {
        let iteraciones = parseInt(document.getElementById(`multiplier`).value);
        let auxOut = ``;
        for (let i = 0; i < iteraciones; i++) {
            let auxArray = []; //En este array se arma cada "entrada"
            let setCounter = document.getElementById(`addIndex`).value;
            if (setCounter != false) {
                auxArray[0] = i;
                for (let i = 0; i < myJSON.length; i++) { //Toma un valor random de cada array y lo añade al array de salida.
                    let valorRandom = myJSON[i].values.split(",");
                    auxArray[i+1] = valorRandom[Math.floor(Math.random() * auxArray.length)];
                }
            } else {
                for (let i = 0; i < myJSON.length; i++) { //Toma un valor random de cada array y lo añade al array de salida.
                    let valorRandom = myJSON[i].values.split(",");
                    auxArray[i] = valorRandom[Math.floor(Math.random() * valorRandom.length)];
                }
            }
            auxOut+=`
                        <div class="alert alert-danger" role="alert">
                            ${auxArray}
                        </div>
                        `;
            // console.log(`auxArray: ${i}`);
            // console.log(auxArray);
            outputArray.push(auxArray);
        }
        document.getElementById("outputArray").innerHTML = auxOut;
    } else {
        document.getElementById("outputArray").innerHTML = "Todavía no hay valores";
    }
    document.getElementById("jsonData").innerHTML = `
                                                    <div class="alert alert-danger col-12" role="alert">
                                                        ${JSON.stringify(outputArray)}
                                                    </div>
                                                    `;
}

//Borra todo
function clearForm(){
    myJSON = [];
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
    document.getElementById("arrayDataContainer").innerHTML = "";
    document.getElementById("outputArray").innerHTML = "";
    document.getElementById("jsonData").innerHTML = "";
}

//Here we go!
window.onload = function() {
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
}
