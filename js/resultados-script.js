let resultadoJSON = JSON.parse(sessionStorage.getItem('outputJSON'));
let resultadoArray = JSON.parse(sessionStorage.getItem('outputArray'));
// resultadoArray = resultadoArray.replace(/\\/g, "");
// resultadoArray = resultadoArray.replace(/"{/g, "{");
// resultadoArray = resultadoArray.replace(/}"/g, "}");

function ponerEnPantalla (){
    let aux = ``;
    for (let i = 0; i < resultadoArray.length; i++){
        resultadoArray[i] = resultadoArray[i].replace("{", "");
        resultadoArray[i] = resultadoArray[i].replace("}", "");
        aux += `
                <div class="alert alert-danger shadow" style="display:inline-block;" role="alert">
                    [${resultadoArray[i]}]
                </div>
        `;
    };
    document.getElementById("showMeTheArray").innerHTML = aux;
    document.getElementById("showMeTheJSON").innerHTML = `
            <div class="alert alert-danger shadow" style="display:inline-block;" role="alert">
                [${resultadoJSON}]
            </div>
            `;
}

function exportToJsonFile() {
    //Indentar el archivo de exportación

    //Mandar JSON a archivo
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(`[${resultadoJSON}]`);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

ponerEnPantalla();