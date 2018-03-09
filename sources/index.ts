// consultas funciones

function _delete(_data) {
	DbRef.doc(_data.id).delete().then(function () {
		console.log("Document successfully deleted!");
	}).catch(function (error) {
		console.error("Error removing document: ", error);
	});
}

function _update(_data) { // var washingtonRef = db.collection(_data.coleccion).doc(_data.id);
	return DbRef.doc(_data.id).update(_data.info)
		.then(function () {
			console.log("Document successfully updated!");
		})
		.catch(function (error) {
			console.error("Error updating document: ", error);
		});
}

function _insert(_data) {
	var result = false;
	DbRef.add(_data.info)
		.then(function (docRef) {
			console.log("Document written with ID: ", docRef.id);
			result = true;
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
	return result;
}

function _get() {
	data.rows = [];
	DbRef.get().then(function (result) {
		result.forEach(function (doc) {
			data.rows.push({
				id: doc.id,
				data: [doc.data().cedula, doc.data().nombres, doc.data().apellidos, doc.data().correo]
			});
		})
		_LlenarGrid();
	}).catch(function (error) {
		console.log("Error getting documents: ", error);
	});
}
function _LlenarGrid() {
	grid.clearAll();
	grid.parse(data, "json");
}
function _selector(_data) {
	// var Ref = null;
	switch (_data) {
		case 'clientes':
		DbRef = db.collection("contactos/clientes/users");
			break;
		case 'proveedores':
		DbRef = db.collection("contactos/proveedores/users");
			break;
	}
	// return Ref;
}

firebase.initializeApp({
	apiKey: "AIzaSyB2c7WDvITXBjQD5sW6Zh5cxm8uxCZFh0s",
	authDomain: "proyectosanfransisco-e998b.firebaseapp.com",
	projectId: "proyectosanfransisco-e998b"
});

// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();
var DbRef =db.collection("contactos/clientes/users");
var data = {
	rows: []
};
_selector('clientes');

// Agregar Usuarios
function guardar(datos) {
	var _data = {
		info: datos
	};
	_insert(_data);
	consultar();
}

//Editar Usuarios
function editar() {
	var _data = {
		id: 2,
		info: {
			apellidos: 'XXXXXX',
			cedula: 'zzzzzz',
			nombres: 'yyyyyyy',
			correo: 'shshshs@gmail.com'
		}
	};
	_update(_data);
}

//Consultar Usuarios
function consultar() {
	_get();
}


//Eliminar Usuarios
function eliminar(info) {
	var _data = {
		id: info
	};
	_delete(_data);
	_get();
}

// .............




// typescript con dhtmlx
//Crear dieño en el body y le das la estructura. Ejeml "2U"
const layout = new dhtmlXLayoutObject({
	parent: document.body,
	pattern: "2U"
});

// var menu = new dhtmlXMenuObject();
// Adjuntar el menu al diseño general ya que no se especifico con cells.....
var menu = layout.attachMenu();
menu.loadStruct("data/menu.json");

menu.attachEvent("onClick", function (id) {
	_selector(id);
	consultar();
});


// Diseño de la parte izquierda de la pantalla cells("a")
layout.cells("a").setText("Section A");

// Adjuntar la grid a la parte izquierda de la pantalla cells("a")
var grid = layout.cells("a").attachGrid();

// grid.setHeader("Cedula,Nombres,Apellidos",",",[]);

// Cofigurar y adjuntar en la grid la cabecera
grid.setHeader("Cedula,Nombres,Apellidos,Correo");
// grid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter");

// Configurar el ancho de las columnas de la grid
// Cofigurar la posicion de laa columnas izq, der, centrado
// Configurar el tipo de columna, estaica, editable ...
// Configurar el tipo de datos: entero, string ....
grid.setInitWidths("100,120,150,300");
grid.setColAlign("left,left,left,left");
grid.setColTypes("ro,ed,ed,ed");
grid.setColSorting("int,str,str,str");

// Inicializar la grid
grid.init();
consultar();
// _LlenarGrid();
console.log(data);
//Borar un registro local
function removeRow() {
	var selId = grid.getSelectedId();
	//gets the Id of the selected row
	grid.deleteRow(selId);
	//deletes the row with the specified id}
}
// comentario
// Datos y eventos de Formulario ......
var contactForm = layout.cells("b").attachForm();
contactForm.loadStruct("data/form.json");
// aaaaaaaaa

contactForm.attachEvent("onButtonClick", function (id) {

	var info = {
		apellidos: contactForm.getItemValue("name3"),
		cedula: contactForm.getItemValue("name"),
		nombres: contactForm.getItemValue("name2"),
		correo: contactForm.getItemValue("name4")
	}

	if (id == "name5") // define la accion del boton
		guardar(info);
})

// Diseño de la parte derecha de la pantalla .....
layout.cells("b").setHeight(50);
layout.cells("b").setText("Section B");
