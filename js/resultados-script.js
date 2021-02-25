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
    //Indentar el archivo de exportación

    //Mandar JSON a archivo
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(`[${resultados}]`);
    let exportFileDefaultName = 'data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

ponerEnPantalla();