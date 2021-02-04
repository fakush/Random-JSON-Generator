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
        
            <div class="alert alert-danger" style="display:inline-block;" role="alert">
                ${myJSON[i].key} : ${myJSON[i].values}
            </div>
        
        `;
    }
    return aux;
}

//Agregar y quitar lineas al generador.
function addArray(int){
    let sample = arrayLoco[int]; 
    let dataForArray = new ArrayDeDatos(sample[0], sample[1]);
    myJSON.push(dataForArray);
    document.getElementById("arrayDataContainer").innerHTML = showDataFields();
    index++;
}

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
                        <div class="alert alert-danger" style="display:inline-block;" role="alert">
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


//Arrays simples
var arrayLoco = [
    ["Números 1..30", "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,28,29,30"],
    ["Caracteres a..z", `'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'`],
    ["Nombres de Mujer (20)", `"Sofía", "María", "Lucía", "Martina", "Catalina", "Elena", "Emilia", "Valentina", "Paula", "Zoe"`],
    ["Nombres de Mujer (100)", `"MARIA CARMEN", "MARIA", "CARMEN", "ANA MARIA", "JOSEFA", "ISABEL", "MARIA PILAR", "MARIA DOLORES", "LAURA", "MARIA TERESA", "ANA", "CRISTINA", "MARTA", "MARIA ANGELES", "FRANCISCA", "LUCIA", "MARIA ISABEL", "MARIA JOSE", "ANTONIA", "DOLORES", "SARA", "PAULA", "ELENA", "MARIA LUISA", "RAQUEL", "ROSA MARIA", "PILAR", "CONCEPCION", "MANUELA", "MARIA JESUS", "MERCEDES", "JULIA", "BEATRIZ", "NURIA", "SILVIA", "ROSARIO", "JUANA", "ALBA", "IRENE", "TERESA", "ENCARNACION", "PATRICIA", "MONTSERRAT", "ANDREA", "ROCIO", "MONICA", "ROSA", "ALICIA", "MARIA MAR", "SONIA", "SANDRA", "ANGELA", "MARINA", "SUSANA", "NATALIA", "YOLANDA", "MARGARITA", "MARIA JOSEFA", "CLAUDIA", "EVA", "MARIA ROSARIO", "INMACULADA", "SOFIA", "MARIA MERCEDES", "CARLA", "ANA ISABEL", "ESTHER", "NOELIA", "VERONICA", "ANGELES", "NEREA", "CAROLINA", "MARIA VICTORIA", "EVA MARIA", "INES", "MIRIAM", "MARIA ROSA", "DANIELA", "LORENA", "ANA BELEN", "MARIA ELENA", "MARIA CONCEPCION", "VICTORIA", "AMPARO", "MARIA ANTONIA", "CATALINA", "MARTINA", "LIDIA", "ALEJANDRA", "CELIA", "MARIA NIEVES", "CONSUELO", "OLGA", "AINHOA", "FATIMA", "GLORIA", "EMILIA", "MARIA SOLEDAD", "CLARA", "MARIA CRISTINA"`],
    ["Nombres de Hombre (100)", `"ANTONIO","MANUEL","JOSE","FRANCISCO","DAVID","JUAN","JOSE ANTONIO","JAVIER","DANIEL","JOSE LUIS","FRANCISCO JAVIER","CARLOS","JESUS","ALEJANDRO","MIGUEL","JOSE MANUEL","RAFAEL","MIGUEL ANGEL","PEDRO","PABLO","ANGEL","SERGIO","JOSE MARIA","FERNANDO","JORGE","LUIS","ALBERTO","JUAN CARLOS","ALVARO","ADRIAN","JUAN JOSE","DIEGO","RAUL","IVAN","JUAN ANTONIO","RUBEN","ENRIQUE","OSCAR","RAMON","VICENTE","ANDRES","JUAN MANUEL","JOAQUIN","SANTIAGO","VICTOR","EDUARDO","MARIO","ROBERTO","JAIME","FRANCISCO JOSE","MARCOS","IGNACIO","ALFONSO","JORDI","HUGO","RICARDO","SALVADOR","GUILLERMO","EMILIO","GABRIEL","MARC","GONZALO","JULIO","JULIAN","MOHAMED","JOSE MIGUEL","TOMAS","MARTIN","AGUSTIN","JOSE RAMON","NICOLAS","ISMAEL","JOAN","FELIX","SAMUEL","CRISTIAN","AITOR","LUCAS","HECTOR","JUAN FRANCISCO","IKER","JOSEP","JOSE CARLOS","ALEX","MARIANO","DOMINGO","SEBASTIAN","ALFREDO","CESAR","JOSE ANGEL","FELIPE","JOSE IGNACIO","VICTOR MANUEL","RODRIGO","LUIS MIGUEL","MATEO","JOSE FRANCISCO","JUAN LUIS","XAVIER","ALBERT"`],
    ["Nombres de Mixtos (200)", `"ANTONIO","MANUEL","JOSE","FRANCISCO","DAVID","JUAN","JOSE ANTONIO","JAVIER","DANIEL","JOSE LUIS","FRANCISCO JAVIER","CARLOS","JESUS","ALEJANDRO","MIGUEL","JOSE MANUEL","RAFAEL","MIGUEL ANGEL","PEDRO","PABLO","ANGEL","SERGIO","JOSE MARIA","FERNANDO","JORGE","LUIS","ALBERTO","JUAN CARLOS","ALVARO","ADRIAN","JUAN JOSE","DIEGO","RAUL","IVAN","JUAN ANTONIO","RUBEN","ENRIQUE","OSCAR","RAMON","VICENTE","ANDRES","JUAN MANUEL","JOAQUIN","SANTIAGO","VICTOR","EDUARDO","MARIO","ROBERTO","JAIME","FRANCISCO JOSE","MARCOS","IGNACIO","ALFONSO","JORDI","HUGO","RICARDO","SALVADOR","GUILLERMO","EMILIO","GABRIEL","MARC","GONZALO","JULIO","JULIAN","MOHAMED","JOSE MIGUEL","TOMAS","MARTIN","AGUSTIN","JOSE RAMON","NICOLAS","ISMAEL","JOAN","FELIX","SAMUEL","CRISTIAN","AITOR","LUCAS","HECTOR","JUAN FRANCISCO","IKER","JOSEP","JOSE CARLOS","ALEX","MARIANO","DOMINGO","SEBASTIAN","ALFREDO","CESAR","JOSE ANGEL","FELIPE","JOSE IGNACIO","VICTOR MANUEL","RODRIGO","LUIS MIGUEL","MATEO","JOSE FRANCISCO","JUAN LUIS","XAVIER","ALBERT", "MARIA CARMEN", "MARIA", "CARMEN", "ANA MARIA", "JOSEFA", "ISABEL", "MARIA PILAR", "MARIA DOLORES", "LAURA", "MARIA TERESA", "ANA", "CRISTINA", "MARTA", "MARIA ANGELES", "FRANCISCA", "LUCIA", "MARIA ISABEL", "MARIA JOSE", "ANTONIA", "DOLORES", "SARA", "PAULA", "ELENA", "MARIA LUISA", "RAQUEL", "ROSA MARIA", "PILAR", "CONCEPCION", "MANUELA", "MARIA JESUS", "MERCEDES", "JULIA", "BEATRIZ", "NURIA", "SILVIA", "ROSARIO", "JUANA", "ALBA", "IRENE", "TERESA", "ENCARNACION", "PATRICIA", "MONTSERRAT", "ANDREA", "ROCIO", "MONICA", "ROSA", "ALICIA", "MARIA MAR", "SONIA", "SANDRA", "ANGELA", "MARINA", "SUSANA", "NATALIA", "YOLANDA", "MARGARITA", "MARIA JOSEFA", "CLAUDIA", "EVA", "MARIA ROSARIO", "INMACULADA", "SOFIA", "MARIA MERCEDES", "CARLA", "ANA ISABEL", "ESTHER", "NOELIA", "VERONICA", "ANGELES", "NEREA", "CAROLINA", "MARIA VICTORIA", "EVA MARIA", "INES", "MIRIAM", "MARIA ROSA", "DANIELA", "LORENA", "ANA BELEN", "MARIA ELENA", "MARIA CONCEPCION", "VICTORIA", "AMPARO", "MARIA ANTONIA", "CATALINA", "MARTINA", "LIDIA", "ALEJANDRA", "CELIA", "MARIA NIEVES", "CONSUELO", "OLGA", "AINHOA", "FATIMA", "GLORIA", "EMILIA", "MARIA SOLEDAD", "CLARA", "MARIA CRISTINA"`],
    ["Apellidos Hispanos", `"González", "Rodríguez", "Gómez", "Fernández", "López", "Díaz", "Martínez", "Pérez", "García", "Sánchez", "Romero", "Sosa", "Torres", "Álvarez", "Ruiz", "Ramírez", "Flores", "Benítez", "Acosta", "Medina", "Herrera", "Suárez", "Aguirre", "Giménez", "Gutiérrez", "Pereyra", "Rojas", "Molina", "Castro", "Ortiz", "Silva", "Núñez", "Luna", "Juárez", "Cabrera", "Ríos", "Morales", "Vega", "Moreno", "Ferreyra", "Domínguez", "Carrizo", "Peralta", "Castillo", "Ledesma", "Quiroga", "Vega", "Muñoz", "𝗚𝗼𝗱𝗼𝘆", "Ojeda", "Ponce", "Villalba", "Cardozo", "Navarro", "Coronel", "Vázquez", "Ramos", "Vargas", "Cáceres", "Arias", "Figueroa", "Córdoba", "Correa", "Maldonado", "Paz", "Rivero", "Miranda", "Mansilla", "Farias", "Roldán", "Méndez", "Guzmán", "Agüero", "Hernández", "Lucero", "Cruz", "Páez", "Escobar", "Mendoza", "Barrios", "Bustos", "Ávila", "Ayala", "Blanco", "Soria", "Maidana", "Acuña", "Leiva", "Duarte", "Moyano", "Campos", "Soto", "Martín", "Valdez", "Bravo", "Chávez", "Velázquez", "Olivera", "Toledo", "Franco"`],
    ["Marcas Mundiales", `"Apple", "Google", "Coca-Cola", "Microsoft", "IBM", "Toyota", "Samsung", "McDonald’s", "Amazon", "BMW", "Mercedes-Benz", "Disney", "Intel", "Cisco", "Oracle", "Nike", "HP", "Honda", "Louis Vuitton", "Gillette", "Facebook", "Pepsi", "American Express", "IKEA", "Pampers", "UPS", "Zara", "Budweiser", "eBay", "Kellogg’s", "Volkswagen", "Nescafé", "Ford", "Hyundai", "Canon", "L’Oréal", "Audi", "Philips", "Nissan", "Gucci", "Danone", "Nestlé", "Colgate", "Porsche", "Cartier", "Sony", "Adidas", "Panasonic", "Tiffany & Co.", "Starbucks", "Prada", "Santander", "Xerox", "Caterpillar", "Kia", "KFC", "MasterCard", "Johnson & Johnson", "Shell", "Harley-Davidson", "DHL", "Sprite", "Lego", "John Deere", "Jack Daniel’s", "Chevrolet", "Land Rover", "Huawei", "Heineken", "Ralph Lauren", "Johnnie Walker", "Corona", "Smirnoff", "Kleenex", "Hugo Boss", "Chandon", "Lenovo"`],
    ["Marcas de Autos", `"Alfa Romeo", "Audi", "Baic", "BMW", "Chery", "Chevrolet", "Chrysler", "Citroën", "Dodge", "DS", "Fiat", "Ford", "Geely", "Honda", "Hyundai", "Isuzu", "Iveco", "JAC", "Jeep", "Kia", "Land Rover", "Lifan", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Peugeot", "Porsche", "RAM", "Renault", "SEAT", "Shineray", "Smart", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"`],
    ["Objetos Cotidianos", `"Papel de baño", "Jabón", "Cepillo dental", "Zapatos", "Zapatillas", "Ojotas", "Cubiertos", "Cuchillo", "Tenedor", "Cuchara", "Peine", "Cepillo", "Ceular", "Tablet", "Notebook", "Televisión", "Lavadoras", "alacena", "almohada", "ambientador", "lámpara", "armario", "aspiradora", "bandeja", "banqueta", "bañera", "bolso", "bombilla", "botella", "butaca", "cama", "candelabro", "cazuela", "cesto", "champú", "cocina", "cojín", "colador", "colcha", "colchón", "colonia", "cómoda", "consola", "cortina", "cristalería", "cuadro", "cubertería", "cubo de la basura", "cucharón", "cuna", "delantal", "equipo de música", "escoba", "escobilla", "escultura", "espejo", "estropajo", "felpudo", "flor", "fregona", "frigorífico", "frutero", "herramienta", "jabón", "jarra", "jarrón", "lámpara", "lamparita", "lavabo", "lavadora", "lavavajillas", "librería", "libro", "manta", "mesa", "mesa de cocina", "mesilla", "mueble bar", "olla", "ordenador", "orejera", "paño", "papel higiénico", "papel", "paraguas", "paragüero", "peine", "perchero", "planta", "plato", "portallaves", "puerta", "rallador", "recogedor", "reloj", "reproductor DVD", "retrete", "revista", "sartén", "secador", "silla", "sillón", "sofá", "teléfono", "toalla", "vajilla", "vaso", "vela", "vitrina", "zapatero"`],
    ["Matriz Electronicos", `[["Electro"], ["Tv"], ["Accesorios tv","Antenas"]],[["Electro"], ["Informatica"], ["PC de Escritorio","All-In-One","Notebook","Tablet","Impresoras","Accesorios y cables","Auriculares pc","Parlantes Pc", "Almacenamiento", "Teclados", "Mouse", "Monitores", "Router", "Smartwatch", "Cámaras Ip", "Webcam", "Kit De Vigilancia","Power Bank"]],[["Electro"], ["Celulares y telefonia"], ["Telefonos inalambricos","Celulares","Telefonos fijos"]],[["Electro"], ["Audio"], ["Equipos de música","Auriculares","Audio para autos","Parlantes"]],[["Electro"], ["Heladeras y freezer"], ["Exhibidores","Cavas","Freezer","Heladeras"]],[["Electro"], ["Lavado"], ["Lavarropas","Lavavajillas","Secarropas","Lavasecarropas"]],[["Electro"], ["Climatización"], ["Ventiladores","Aires acondicionados","Calefacción"]],[["Electro"], ["Calefones y termotanques"], ["Calefones","Termotanques","Duchadores eléctricos"]],[["Electro"], ["Coccion"], ["Cocinas","Microondas","Hornos electricos","Anafes"]],[["Electro"], ["Ayudantes de cocina"], ["Batidoras","Procesadoras","Balanzas de cocina","Mixer"]],[["Electro"], ["Desayuno"], ["Cafeteras","Exprimidores y jugueras","Pavas electricas","Licuadoras"]],[["Electro"], ["Hogar"], ["Maquinas de coser","Toalleros eléctricos","Balanzas de equipaje","Planchas"]],[["Electro"], ["Salud"], ["Balanzas de baño","Tensiometros","Nebulizadores","Almohadillas y mantas térmicas"]],[["Electro"], ["Cuidado personal"],["Cortapelo","Cortabarba","Afeitado","Depiladoras"]],[["Electro"], ["Gaming"], ["Consolas","Juegos","Joysticks","Auriculares"]]`],
    ["Matriz Textiles", `[["Textil"], ["Dormitorio"], ["Almohadones", "Sábanas", "Acolchados", "Frazadas"]],[["Textil"], ["Cocina"], ["Caminos", "Delantales y manoplas", "Manteles", "Individuales"]],[["Textil"], ["Living"], ["Alfombras", "Felpudos", "Almohadones"]],[["Textil"], ["Baño"], ["Antideslizantes", "Toallas y toallones", "Alfombras", "Cortinas"]],[["Textil"], ["Calzado"], ["Pantuflas", "Ojotas", "Medias", "Zapatillas"]],[["Textil"], ["Ropa interior"], ["Dama", "Caballero"]],[["Textil"], ["Marroquineria"], ["Carteras", "Valijas", "Bolsos", "Paraguas"]],[["Textil"], ["Bebés"], ["Ropa para bebés", "Aspirador nasal", "Baberos", "Bañeras y pelelas"]],[["Textil"], ["Niños (+)"], ["Camisas", "Uniformes", "Calzas", "Minishort"]]`],
    ["Matriz Hogar", `[["Hogar"], ["Bazar"], ["Accesorios vajilla", "Carros y changos", "Cocción acero / antiadherente", "Cocción vidrio / ceramica"]],[["Hogar"], ["Decoración"], ["Adornos", "Bandejas y centros de mesa", "Baules", "Cajas"]],[["Hogar"], ["Uso diario"], ["Accesorios de baño", "Accesorios de lavadero", "Bolsas de compras", "Bolsas y fundas"]],[["Hogar"], ["Muebles de interior"], ["Sillas de interior", "Sillas de oficina", "Banquetas", "Modulos"]],[["Hogar"], ["Libreria"], ["Escritura", "Cuadernos, carpetas y repuestos", "Manualidades y artistica", "Accesorios de oficina"]],[["Hogar"], ["Libros"], ["Actividades", "Actualidad", "Autoayuda", "Biografia"]],[["Hogar"], ["Juguetería"], ["Radio control", "Juegos de mesa"]],[["Hogar"], ["Accesorios de iluminación y electricidad"], ["Lamparitas", "Artefactos de iluminación", "Estacas solares", "Iluminacion de emergencia"]],[["Hogar"], ["Ferreteria"], ["Pegamentos y afines", "Pintureria", "Herramientas", "Escaleras"]],[["Hogar"], ["Automotor"], ["Cubiertas", "Baterias", "Aceites y aditivos", "Accesorios"]],[["Hogar"], ["Mascotas"], ["Gatos", "Perros", "Peces"]]`],
    ["Matriz Super Almacen", `[["Almacén"], ["Golosinas"], ["Alfajores", "Bombones y bocaditos", "Caramelos y chupetines", "Chicles y pastillas"]],[["Almacén"], ["Endulzantes"], ["Azúcar", "Edulcorante"]],[["Almacén"], ["Aderezos y salsas"], ["Mayonesas", "Mostazas", "Ketchup", "Salsas golf"]],[["Almacén"], ["Infusiones"], ["Mate", "Té", "Café", "Mate cocido"]],[["Almacén"], ["Conservas"], ["Conservas vegetal", "Conservas de pescado", "Conservas de frutas", "Conservas de carne"]],[["Almacén"], ["Encurtidos"], ["Aceitunas", "Ají", "Alcaparras", "Berenjenas"]],[["Almacén"], ["Harinas"], ["Harina de trigo", "Harina de maíz", "Premezcla", "Sémola"]],[["Almacén"], ["Mermeladas y dulces"], ["Mermeladas", "Miel", "Jalea", "Dulce"]],[["Almacén"], ["Salsas y puré de tomate"], ["Extracto tomates", "Pulpa de tomate", "Puré de tomate", "Pesto"]],[["Almacén"], ["Aceites y condimentos"], ["Aceites", "Condimentos", "Vinagres"]],[["Almacén"], ["Alimento de bebés y niños"], ["Alimentos para bebé", "Infusiones infantiles"]],[["Almacén"], ["Arroz y legumbres"], ["Arroz", "Legumbres", "Comidas listas"]],[["Almacén"], ["Especias"], ["Especias", "Semillas"]],[["Almacén"], ["Pasta seca, lista y rellenas"], ["Pasta lista y rellena", "Pastas secas"]],[["Almacén"], ["Polvo para postres y reposteria"], ["Premezcla postres", "Repostería"]],[["Almacén"], ["Sopas, caldos, puré y saborizantes"], ["Mezcla lista", "Sopas y saborizantes"]],[["Almacén"], ["Panaderia"], ["Bizcochos", "Bizcochuelos y especialidades", "Galletas, tostadas y grisines", "Panificados"]],[["Almacén"], ["Snacks"], ["Bastones de maiz", "Galletitas copetin", "Maiz saborizado", "Mani"]],[["Almacén"], ["Leche en polvo"]],[["Almacén"], ["Rebozador y pan rallado"], ["Pan rallado", "Rebozador"]],[["Almacén"], ["Cereales"], ["Break saludables", "Avena presentación", "Barras", "Barras de arroz"]]`],
    ["Matriz Super Bebidas", `[["Bebidas"], ["Bebidas sin alcohol"], ["Gaseosas", "Jugos", "Amargos", "Energizantes"]],[["Bebidas"], ["Bebidas con alcohol"], ["Cerveza", "Vinos", "Aperitivos", "Champagne y espumantes"]]`],
    ["Matriz Super Frescos", `[["Frescos"], ["Lácteos"], ["Leches", "Yogures", "Dulce de leche", "Mantecas y margarinas"]],[["Frescos"], ["Fiambres"], ["Salchichas y pates", "Encurtidos a granel", "Fiambres"]],[["Frescos"], ["Quesos"], ["Queso rallado", "Queso crema y untables", "Quesos duros", "Dulces"]],[["Frescos"], ["Carniceria"], ["Carnes", "Aves", "Embutidos", "Carnes elaboradas"]],[["Frescos"], ["Pastas frescas y tapas"], ["Fideos y ñoquis", "Pastas rellenas", "Tapas para pascualina y empanadas", "Masas preparadas"]],[["Frescos"], ["Comidas elaboradas"], ["Pizzas, tartas y empanadas", "Platos y guarniciones", "X kg", "X unidad - porción"]],[["Frescos"], ["Frutas y verduras"], ["Frutas", "Verduras", "Frutas secas y desecadas", "Champignones"]],[["Frescos"], ["Pescaderia"], ["Entero eviscerado", "Semiconserva", "Filete"]],[["Frescos"], ["Huevos"], ["Huevos color", "Huevos blanco", "Huevos codorniz", "Huevos deshidratados"]]`],
    ["Matriz Super Congelados", `[["Congelados"], ["Helados y postres"], ["Postres helados", "Yogur helado", "Helados en pote", "Helados en palito"]],[["Congelados"], ["Comidas congeladas"], ["Pizzas y pizzetas", "Pastas congeladas", "Panificados", "Salchichas de soja"]],[["Congelados"], ["Hamburguesas y milanesas"], ["Hamburguesas y medallones", "Milanesas y supremas"]],[["Congelados"], ["Vegetales congelados"], ["Espinacas", "Acelga", "Arvejas", "Chauchas"]],[["Congelados"], ["Papas congeladas / fritas"], ["Papas bastón", "Papas noisettes", "Papas con formas", "Papas estilo casero"]],[["Congelados"], ["Frutas congeladas"], ["Frutillas", "Arándanos", "Frambuesas", "Mango", "Nuggets"]],[["Congelados"], ["patitas y bocaditos"], ["Nuggets", "Bocaditos y formitas", "Aros de cebolla", "Bastones de mozzarella"]],[["Congelados"], ["Pescaderia"], ["Mariscos", "Pescado de mar", "Rebozados", "Salmón y trucha"]]`],
    ["Matriz Super Limpieza", `[["Limpieza"], ["Lavado"], ["Jabón liquido y en polvo", "Enjuagues y suavizantes", "Quitamanchas", "Prelavado"]],[["Limpieza"], ["Papeles"], ["Papel higiénico", "Pañuelos", "Rollo de cocina", "Servilletas"]],[["Limpieza"], ["Lavandina"], ["En gel", "Líquida"]],[["Limpieza"], ["Insecticidas"], ["Cucarachas", "Hormigas", "Moscas y mosquitos", "Polillas"]],[["Limpieza"], ["Calzado"], ["Pomada para zapatos", "Cepillos de lustre", "Plantillas", "Cuidado del calzado"]],[["Limpieza"], ["Accesorios de limpieza"], ["Bolsas", "Esponjas y guantes", "Palas y cabos", "Escobas y escobillones"]],[["Limpieza"], ["Desodorantes de ambiente"], ["Antihumedad", "Desinfectantes de ambiente", "Aromatizantes de ambiente"]],[["Limpieza"], ["Limpieza de baño"], ["Desodorantes de inodoro", "Limpiadores de baño", "Sopapas, escobillas y destapa cañerias"]],[["Limpieza"], ["Limpieza de cocina"], ["Detergentes", "Productos para lavavajillas", "Fósforos", "Bolsas"]],[["Limpieza"], ["Limpieza de pisos y superficies"], ["Ceras y autobrillos", "Lustramuebles", "Limpiadores de pisos y superficiesCurador para pisos"]]`],
    ["Matriz Super Perfumería", `[["Perfumería"], ["Cuidado del cabello"], ["Coloración", "Acondicionador", "Shampoo", "Tratamientos"]],[["Perfumería"], ["Higiene personal"], ["Accesorios de ducha", "Jabones", "Sales y espumas de baño"]],[["Perfumería"], ["Desodorantes y antitranspirantes"], ["Desodorantes", "Antitranspirantes"]],[["Perfumería"], ["Pañales y productos para incontinencia"], ["Pañales para bebé", "Pañales para adultos", "Productos para incontinencia"]],[["Perfumería"], ["Cuidado personal"], ["Afeitado", "Depilación", "Recortadores", "Higiene y cuidado de la barba"]],[["Perfumería"], ["Cuidado bucal"], ["Accesorios de prótesis y ortodoncia", "Antiséptico bucal", "Cepillos dentales", "Cremas dentales"]],[["Perfumería"], ["Protección femenina"], ["Apositos post parto", "Protectores diarios", "Tampones", "Toallitas"]],[["Perfumería"], ["Cremas de belleza"], ["Cremas corporales", "Cremas de manos y pies", "Cuidado facial"]],[["Perfumería"], ["Cuidado de la piel"], ["Bronceador", "Locion", "Post solar", "Protector solar"]],[["Perfumería"], ["Accesorios"], ["Accesorios femeninos", "Accesorios para uñas y pies", "Elementos para el cabello"]],[["Perfumería"], ["Cuidado del bebé y la mamá"], ["Cuidado infantil", "Momentos del bebé", "Puerperio"]],[["Perfumería"], ["Farmacia"], ["Profilaxis", "Geles intimos", "Repelente", "Seca esmalte"]],[["Perfumería"], ["Colonias y perfumes"], ["Colonias femeninas", "Colonias masculinas"]],[["Perfumería"], ["Cosméticos"], ["Accesorios femeninos", "Desmaquilladores", "Esmalte de uñas", "Maquillaje"]]`],
    ["Provincias de Argentina", `"Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Isla del Atlántico Sur", "Tucumán"`],
    ["Provincias y Capitales de Argentina", `["Buenos Aires","La Plata"],["Catamarca","San Fernando del Valle de Catamarca"],["Chaco","Resistencia"],["Chubut","Rawson"],["Córdoba","Córdoba"],["Corrientes","Corrientes"],["Entre Ríos","Paraná"],["Formosa","Formosa"],["Jujuy","San Salvador de Jujuy"],["La Pampa","Santa Rosa"],["La Rioja","La Rioja"],["Mendoza","Mendoza"],["Misiones","Posadas"],["Neuquén","Neuquén"],["Río Negro","Viedma"],["Salta","Salta"],["San Juan","San Juan"],["San Luis","San Luis"],["Santa Cruz","Río Gallegos"],["Santa Fe","Santa Fe"],["Santiago del Estero","Santiago del Estero"],["Tierra del Fuego, Antártida e Isla del Atlántico Sur","Ushuaia"],["Tucumán","San Miguel de Tucumán"]`],
    ["Nombres de Calles", `"AV PTE QUINTANA", "BASAVILBASO", "AIME PAINE", "CALLE S N", "DEL CARMEN", "IGR ENRIQUE BUTTY", "LETONIA", "MOMPOX", "PABLO GIORELLO", "PARERA", "SGTO CABRAL", "USPALLATA", "VICTORIA OCAMPO", "VIEYRA", "AV ANTARTIDA ARGENTINA", "AV ELVIRA RAWSON DE DELLEPIANE", "ARTURO CAPDEVILLA", "AV GRL GELLY Y OBES", "AV TOMAS A EDISON", "BARRIENTOS", "JOSE LEON PAGANO", "SIN CORRESPONDENCIA", "SOLER", "CARLOS GARDEL", "MISIONES", "SANCHEZ DE BUSTAMANTE", "ASCASUBI", "AV BENITO PEREZ GALDOS", "AV DARACT", "AV ISIDRO LOREA", "CALLE S N", "CALLE S N", "CAYASTA", "DEKAY", "FRANCISCO CAFFERATA", "GUAL", "INDALECIO GOMEZ", "JOSE PAZOS", "JUAN M THOME", "LLORENTE", "LOS TELARES", "LUGO", "MARCOS SEGUIN", "MUTUALISMO", "PARACAS", "PILCOMAYO", "PJE S N", "ROCHDALE", "TIERRA DEL FUEGO", "WILLIAM C MORRIS", "ANGEL PELUFFO", "BATHURST", "BOGADO", "GALLEGOS", "INCA", "JOSE JULIAN PEREZ", "OBRERO ROBERTO NUNEZ", "SIN CORRESPONDENCIA", "ACHAVAL", "AV LILLO", "AV ROENTGEN", "BEADE", "BERNAL", "FEDERICO GARCIA LORCA", "MIRO", "REPUBLICA DE INDONESIA", "AV VERNET", "BELL VILLE", "CABALLITO", "CALCENA", "CALLE S N", "CALLE S N", "CAPERUCITA", "CARICANCHA", "CARLOS BERG", "CHARRUA", "CIPOLLETTI", "LA CAPITAL", "PERGAMINO", "PERRAULT", "RAMON Y CAJAL", "SOMELLERA", "TIMBO", "TTE GRL N LEVALLE", "UCACHA", "ZAPALA", "ALFARERO", "ASTURIAS", "AV EVA PERON", "Córdoba", "BARCELONA", "CALLE S N", "CHAJARI", "CURA BROCHERO", "GRL NAPOLEON URIBURU", "GUILLERMO HUDSON", "LOS CEDROS", "MALDONADO", "PAILEBOT DAVISON", "PJE S N", "RIO NEGRO", "SANTA CATALINA", "VERACRUZ", "VALMTE IRIZAR", "VICENTE DE SIMONE", "VILLA DE MASNOU", "AV 27 DE FEBRERO", "ASTURIAS", "CARLOS MOREL", "COTOCOLLAO", "CURITYBA", "EL CARDENAL", "EL CARPINTERO", "EL CERRO", "EL CHACHO", "FINLANDIA", "FRAGATA CEFIRO", "FRANCISCO J ORTIZ", "GERONIMO CORTES", "GRAHAM R CUNNINGHAME", "GRL CESAR DIAZ", "GUIPUZCOA", "JOSE R BALTORE", "JUAN B PRIMOLI", "JUAN LEON PALLIERE", "MARIA REMEDIOS DEL VALLE", "MOLINA", "ONESIMO LEGUIZAMON", "PASAJE PARTICULAR", "PASEO DE LOS ARTISTAS", "PJE LA MISERICORDIA", "PJE TOMAS VALENCIA", "POLONIA", "PRELADO D B RISSO PATRON", "TRENQUE LAUQUEN", "TTE CANDIDO DE LA SALA", "TUYU", "YERBAL", "ACONCAGUA", "ALICANTE", "AV LACARRA", "BEYROUTH", "COLIGUE", "COLIQUEO", "DOLORES"`],
    ["Nombres de Ciudades", `"Buenos Aires","Córdoba","Rosario","Mar del Plata","San Miguel de Tucumán","Salta","Santa Fe","Corrientes","Bahía Blanca","Resistencia","Posadas","Merlo","Quilmes","San Salvador de Jujuy","Guaymallén","Santiago del Estero","Gregorio de Laferrere","José C. Paz","Paraná","Banfield","González Catán","Neuquén","Formosa","Lanús","La Plata","Godoy Cruz","Isidro Casanova","Berazategui"`],
    ["Campo te Texto Lorem Impsum", `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laborum, neque voluptates ex est optio illum suscipit? Cum in ad voluptas itaque ea repudiandae beatae nobis praesentium, nostrum voluptate aliquid?`],
    ["Numeros 100..1000", `Work in progress. Ya va a llegar`],
    ["Numeros 1000..10.000", `Work in progress. Ya va a llegar`],
    ["Numeros 10.000..1.000.000", `Work in progress. Ya va a llegar`]
];
