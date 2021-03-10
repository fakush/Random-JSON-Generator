let resultadoJSON = JSON.parse(sessionStorage.getItem('outputJSON'));
let resultadoArray = JSON.parse(sessionStorage.getItem('outputArray'));

function ponerEnPantalla (){
    let aux = ``;
    for (let i = 0; i < resultadoArray.length; i++){
        resultadoArray[i] = resultadoArray[i].replace("{", "");
        resultadoArray[i] = resultadoArray[i].replace("}", "");
        aux += `
                <div class="alert alert-secondary shadow" role="alert">
                    <button class="close" onclick="copyToClipboard(${i})"><span class="material-icons">content_copy</span></button>
                    <p>[${resultadoArray[i]}]</p>
                </div>
        `;
    };
    document.getElementById("showMeTheArray").innerHTML = aux;
    document.getElementById("showMeTheJSON").innerHTML = `
            <div class="alert alert-secondary shadow alert-dismissible fade show" role="alert">
                <button class="close" onclick="copyToClipboardJSON()"><span class="material-icons">content_copy</span></button>
                <p>[${resultadoJSON}]</p>
            </div>
        `;
}

function copyToClipboard(i){
    resultadoArray[i] = resultadoArray[i].replace("{", "");
    resultadoArray[i] = resultadoArray[i].replace("}", "");
    var copyText = `[${resultadoArray[i]}]`;
    console.log(copyText)
    navigator.clipboard.writeText(copyText);
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
    // document.execCommand("copy");
    alert("Copiado al portapapeles: " + copyText);
}

function copyToClipboardJSON(){
    var copyText = `[${resultadoJSON}]`;
    console.log(copyText)
    navigator.clipboard.writeText(copyText);
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
    // document.execCommand("copy");
    alert("JSON Copiado al portapapeles");
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