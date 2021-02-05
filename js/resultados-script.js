let resultados = JSON.parse(sessionStorage.getItem('outputJSON'));

function ponerEnPantalla (){
    //Poner los datos en pantalla
    document.getElementById("showMeTheJSON").innerHTML = `
            <div class="alert alert-danger" style="display:inline-block;" role="alert">
                [${resultados}]
            </div>
            `;
}

function exportToJsonFile() {
    //Mandar JSON a archivo
    let dataStr = JSON.stringify(resultados);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}



ponerEnPantalla();