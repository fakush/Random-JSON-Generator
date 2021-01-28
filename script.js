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
    for (let i = 0; i < index; i++) {
        aux+=`
        <div class="row">
            <div class="alert alert-danger col 3" role="alert">
                ${myJSON[i].key}
            </div>
            <div class="alert alert-danger col 9" role="alert">
                ${myJSON[i].values}
            </div>
        </div>
        `;
    }
    myJSON.storeInLocal;
}

//Agregar y quitar lineas al generador.
function addFieldset(){
    let dataForArray = new ArrayDeDatos(document.getElementById(`inputKey`).value, document.getElementById(`inputValues`).value);
    myJSON.push(dataForArray);
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
    document.getElementById("arrayDataContainer").innerHTML = showDataFields();
    index++;
}

function removeFieldset(){
    console.log("removeFieldset");
}

//Get User values/filters

//Creates the JSON file

//Borra todo
function clearForm(){
    let myJSON = [];
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
}
//Export Options
function generateJSON(){
    console.log("genetateJSON");
}

//Here we go!
window.onload = function() {
    document.getElementById("arrayRowContainer").innerHTML = newFieldset;
}
