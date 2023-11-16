
const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content")
const tabContentWrapper = document.querySelector(".tab-content-wrapper");

const shiftTabs = (linkId) => {
  allTabs.forEach((tab, i) => {

    if (tab.id.includes(linkId)) {
      allTabs.forEach((tabItem) => {
        tabItem.style = `transform: translateY(-${i * 300}px);`;
      });
    }
  });
}

allLinks.forEach((elem) => {
  elem.addEventListener('click', function () {
    const linkId = elem.id;
    const hrefLinkClick = elem.href;

    allLinks.forEach((link, i) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove('active');
      }
    });

    shiftTabs(linkId);
  });
});

//? handle proper selection for initial load
const currentHash = window.location.hash;

let activeLink = document.querySelector(`.tabs a`);

if (currentHash) {
  const visibleHash = document.getElementById(
    `${currentHash.replace('#', '')}`
  );

  if (visibleHash) {
    activeLink = visibleHash;
  }
}

activeLink.classList.toggle('active');

shiftTabs(activeLink.id);

//***************** * LOGICA DE LA APP*************
const nombres = [];
const CURPs = [];
const abonos = [];
const AccionesHistorial = [];
let banderin = false;
let usuarioIndex = -1;

// BOTONES
const btnAgregar = document.getElementById("btnAgregar");
const btnAbonar = document.getElementById("btnAbonar");
const btnRetirar = document.getElementById("btnRetirar");
const btnCredito = document.getElementById("btnCredito");
const btnAcciones = document.getElementById("btnAcciones");
const btnAbonarCredito = document.getElementById("btnAbonarCredito");

// INPUTS INGRESAR
const nombreInput = document.getElementById("nombre");
const CURPInput = document.getElementById("CURP");
const AbonoInput = document.getElementById("abono");
// INPUTS ABONAR
const AbonarCuentaInput = document.getElementById("AbonarCuenta");
const Curp_AbonarInput = document.getElementById("CURP_Abonar");
//INPUTS ABONAR CREDITO
const AbonarCreditoInput = document.getElementById("AbonarCredito");
const AbonarCreditoCURPInput = document.getElementById("AbonarCreditoCURP");

// INPUTS RETIRAR
const RetirarCuentaInput = document.getElementById("RetirarCuenta");
const CURP_RetirarInput = document.getElementById("CURP_Retirar");
// INPUTS CREDITO
const CURP_CreditoInput = document.getElementById("CreditoCURP");
const Monto_CreditoInput = document.getElementById("Credito");
const CreditoTasaInput = document.getElementById("CreditoTasa");
// INPUTS ACCIONES
const AccionesCURPInput = document.getElementById("AccionesCURP");
// FUNCIONES
function agregarRegistroHistorial(CURP, tipoAccion, monto) {
  const fecha = new Date(); // Obtener la fecha actual
  const dia = fecha.getDate(); // Obtener el día
  const mes = fecha.getMonth() + 1; // Obtener el mes (se suma 1 porque los meses van de 0 a 11)
  const anio = fecha.getFullYear(); // Obtener el año

  // Formatear la fecha en el formato deseado (por ejemplo, DD/MM/YYYY)
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  AccionesHistorial.push({
    CURP,
    tipoAccion,
    monto,
    fecha: fechaFormateada
  });
}

//funcion de longitud CURP
function verificarLongitudCadena(cadena, longitudMinima) {
  return cadena.length >= longitudMinima;
}


//TABLAS IDs
//analizar si es este para tablas

// **********LOGICA**********
// Seccion Agregar
btnAgregar.addEventListener("click", function () {
  // Obtener valores de los inputs
  const nombre = nombreInput.value;
  const CURP = CURPInput.value.toUpperCase();
  const abono = parseFloat(AbonoInput.value);

  // Validar inputs nulos
  if (!nombre && !CURP && isNaN(abono) && (abono <0 )) {
    alert("ERROR: Todos los campos deben ser completados o datos no validos");
    return;
  }

  // Verificar la longitud de la CURP
  if (!verificarLongitudCadena(CURP, 8)) {
    alert("ERROR: La CURP debe tener al menos 8 caracteres");
    return;
  }

  // Verificar el monto del abono
  if (abono < 5000) {
    alert("ERROR: El abono debe ser mayor o igual a 5000");
    return;
  }

  // Verificar si la CURP ya existe en el array
  if (CURPs.includes(CURP)) {
    alert("ERROR: El usuario con la CURP ya existe, ingrese otra CURP nueva");
    return;
  }

  // Agregar los valores a los arrays
  CURPs.push(CURP);
  nombres.push(nombre);
  abonos.push(abono);

  // Limpiar los campos de entrada
  nombreInput.value = "";
  CURPInput.value = "";
  AbonoInput.value = "";
  alert("FELICIDADES: Te has Unido satisfactoriamente");

  // Mostrar los arrays en la consola
  console.log(nombres);
  console.log(CURPs);
  console.log(abonos);
});

// Obtener referencias a los elementos del DOM
  const btnBuscar_Abonar = document.getElementById("btnBuscar_Abonar");

  // Ocultar elementos al inicio
  AbonarCuentaInput.style.display = "none";
  btnAbonar.style.display = "none";

  btnBuscar_Abonar.addEventListener("click", function () {
    const Curp_Abonar = Curp_AbonarInput.value.toUpperCase();

    // Buscar la CURP en el array
    for (let i = 0; i < CURPs.length; i++) {
      if (Curp_Abonar === CURPs[i]) {
        banderin = true;
        usuarioIndex = i;
        break;
      }
    }

    if (banderin) {
      alert("Estás en el sistema, puedes continuar...");
      AbonarCuentaInput.style.display = "block";
      btnAbonar.style.display = "block";

      // Agregar evento para realizar el abono
      btnAbonar.addEventListener("click", function () {
        const AbonarCuenta = parseFloat(AbonarCuentaInput.value);

        // Verificar que el usuarioIndex sea válido antes de actualizar abonos
        if (usuarioIndex !== -1 && AbonarCuenta >1) {
          abonos[usuarioIndex] += AbonarCuenta;
          agregarRegistroHistorial(Curp_Abonar, "Abono", AbonarCuenta);
          alert("Abono realizado. Nuevo saldo: " + abonos[usuarioIndex]);
        } else {
          alert("Error: No se encontró el usuario en el sistema o datos no validos");
        }
      });
    } else {
      alert("No estás en el sistema.");
      AbonarCuentaInput.style.display = "none";
      btnAbonar.style.display = "none";
    }
  });


  // Agrega evento para mostrar el input de abono al validar la CURP
  Curp_AbonarInput.addEventListener("change", function () {
    const Curp_Abonar = Curp_AbonarInput.value.toUpperCase();

    for (let i = 0; i < CURPs.length; i++) {
      if (Curp_Abonar === CURPs[i]) {
        // Si la CURP es válida, muestra el input de abono
        AbonarCuentaInput.style.display = "block";
        banderin = true;
        break;
      }
    }

    if (!banderin) {
      alert("El usuario con la CURP: " + Curp_Abonar + " no está en el sistema.");
      AbonarCuentaInput.style.display = "none"; // Oculta el input si la CURP no es válida
    }
  });

// Seccion Retirar
const btnBuscar_Retirar = document.getElementById("btnBuscar_Retirar");

// Ocultar elementos al inicio
RetirarCuentaInput.style.display = "none";
btnRetirar.style.display = "none";


btnBuscar_Retirar.addEventListener("click", function () {
  const CURP_Retirar = CURP_RetirarInput.value.toUpperCase();
  let banderin = false;

  // Buscar la CURP en el array
  for (let i = 0; i < CURPs.length; i++) {
    if (CURP_Retirar === CURPs[i]) {
      banderin = true;
      usuarioIndex = i;
      break;
    }
  }

  if (banderin) {
    alert("Estás en el sistema, puedes continuar...");
    RetirarCuentaInput.style.display = "block";
    btnRetirar.style.display = "block";
    
    // Agregar evento para realizar el retiro
    btnRetirar.addEventListener("click", function () {
      const RetirarCuenta = parseFloat(RetirarCuentaInput.value);

      // Verificar que el usuarioIndex sea válido antes de actualizar abonos
      if (usuarioIndex !== -1) {
        abonos[usuarioIndex] -= RetirarCuenta;
        agregarRegistroHistorial(CURP_Retirar, "Retiro", RetirarCuenta);

        alert("Retiro realizado. Nuevo saldo: " + abonos[usuarioIndex]);

        CURP_RetirarInput.value = "";
        RetirarCuentaInput.value = "";
      } else {
        alert("Error: No se encontró el usuario en el sistema.");
      }
    });
  } else {
    alert("No estás en el sistema.");
    RetirarCuentaInput.style.display = "none";
    btnRetirar.style.display = "none";
  }
});

// Variables globales para almacenar la información del crédito
let montoCreditoSolicitado = 0;
let saldoCredito = 0;

btnCredito.addEventListener("click", function() {
  const CreditoTabla = document.getElementById("CreditoTabla");

  const CURP_Credito = CURP_CreditoInput.value.toUpperCase();
  const CreditoTasa = parseFloat(CreditoTasaInput.value) / 100;
  const Monto_Credito = parseFloat(Monto_CreditoInput.value);

  const Plazo_Credito = 12;

  const r = CreditoTasa / 12;
  const Cuota = (Monto_Credito * r * (Math.pow(1 + r, Plazo_Credito))) / (Math.pow(1 + r, Plazo_Credito) - 1);
  saldoCredito = Monto_Credito;


  for (let i = 0; i < CURPs.length; i++) {
    if (CURP_Credito === CURPs[i] ) {
      banderin = true;
      usuarioIndex = i;
      break;
    }
  }

switch (banderin) {
  case CreditoTasa <= 0:
    
    alert('ERROR: El credito esta negativo');
    
    break;
    case  isNaN(CreditoTasa):
      alert('ERROR: El credito esta vacio');
      break;
  case Monto_Credito <= 0:
    
  alert('ERROR: El Credito esta negativo');
    
    break;
    case  isNaN(Monto_Credito):
      alert('ERROR: El Credito esta vacio');
      break;

  default:
    alert("Usuario encontrado, a continuación se mostrarán los datos...");

  // Guardar la información del crédito en las variables globales
  montoCreditoSolicitado = Monto_Credito;

  agregarRegistroHistorial(CURP_Credito, "Préstamo", Monto_Credito);

  const newRow = CreditoTabla.insertRow(-1);

  const cell1 = newRow.insertCell(0); // Nombre
  cell1.innerHTML = nombreInput.value;

  const cell2 = newRow.insertCell(1); // CURP 
  cell2.innerHTML = CURP_Credito;

  const cell3 = newRow.insertCell(2); // Crédito Solicitado
  cell3.innerHTML = Monto_Credito;

  const cell4 = newRow.insertCell(3); // Tasa de interés
  cell4.innerHTML = (CreditoTasa * 100).toFixed(2);

  const cell5 = newRow.insertCell(4); // Plazo de crédito  
  cell5.innerHTML = Plazo_Credito;

  const cell6 = newRow.insertCell(5); // Pago mensual
  cell6.innerHTML = Cuota.toFixed(2);

  const cell7 = newRow.insertCell(6);
  cell7.innerHTML = saldoCredito.toFixed(2);

  CURP_CreditoInput.value = "";
  Monto_CreditoInput.value = "";
    break;
}
// if (banderin) {

//   if (isNaN(Monto_Credito) || Monto_Credito <= 0 ) {
//    alert('Monto inválido');
//    return;
//  }
//    if (isNaN(CreditoTasa) || CreditoTasa <= 0) {
//     alert('Tasa inválida');
//     return; 
//   }


//   alert("Usuario encontrado, a continuación se mostrarán los datos...");

//   // Guardar la información del crédito en las variables globales
//   montoCreditoSolicitado = Monto_Credito;

//   agregarRegistroHistorial(CURP_Credito, "Préstamo", Monto_Credito);

//   const newRow = CreditoTabla.insertRow(-1);

//   const cell1 = newRow.insertCell(0); // Nombre
//   cell1.innerHTML = nombreInput.value;

//   const cell2 = newRow.insertCell(1); // CURP 
//   cell2.innerHTML = CURP_Credito;

//   const cell3 = newRow.insertCell(2); // Crédito Solicitado
//   cell3.innerHTML = Monto_Credito;

//   const cell4 = newRow.insertCell(3); // Tasa de interés
//   cell4.innerHTML = (CreditoTasa * 100).toFixed(2);

//   const cell5 = newRow.insertCell(4); // Plazo de crédito  
//   cell5.innerHTML = Plazo_Credito;

//   const cell6 = newRow.insertCell(5); // Pago mensual
//   cell6.innerHTML = Cuota.toFixed(2);

//   const cell7 = newRow.insertCell(6);
//   cell7.innerHTML = saldoCredito.toFixed(2);

//   CURP_CreditoInput.value = "";
//   Monto_CreditoInput.value = "";

// }else {
//   alert("Formulario vacío o CURP: " + CURP_Credito + " no existe, vuelva a intentarlo");
// }
   
});

btnAbonarCredito.addEventListener("click", function () {
  const AbonarCredito = parseFloat(AbonarCreditoInput.value);
  const AbonarCreditoCURP = AbonarCreditoCURPInput.value.toUpperCase();
  const AbonarCreditoTabla = document.getElementById("AbonarCreditoTabla");

  let banderin = false;

  for (let i = 0; i < CURPs.length; i++) {
    if (AbonarCreditoCURP === CURPs[i]) {
      // Realizar el abono y actualizar el saldo
      saldoCredito -= AbonarCredito;
      agregarRegistroHistorial(AbonarCreditoCURP, "Abonar a Credito", AbonarCredito);

      // Calcular el nuevo PagoTotal
      const r = CreditoTasa / 12;
      const Plazo_Credito = 12;
      const Cuota = (saldoCredito * r * (Math.pow(1 + r, Plazo_Credito))) / (Math.pow(1 + r, Plazo_Credito) - 1);
      const PagoTotal = Cuota * Plazo_Credito;

      // Calcular los detalles del abono
      const PagoInteres = saldoCredito * r; // Se corrige aquí
      const PagoCapital = AbonarCredito;

      // Eliminar la última fila si existe
      const rowCount = AbonarCreditoTabla.rows.length;
      if (rowCount > 1) {
        AbonarCreditoTabla.deleteRow(rowCount - 1);
      }

      // Mostrar el abono en la tabla
      const newRow = AbonarCreditoTabla.insertRow();
      const cell1 = newRow.insertCell(0); // ID
      const cell2 = newRow.insertCell(1); // Nombre
      const cell3 = newRow.insertCell(2); // CURP
      const cell4 = newRow.insertCell(3); // Monto abonado
      const cell5 = newRow.insertCell(4); // Pago capital
      const cell7 = newRow.insertCell(5); // Saldo adeudo

      cell1.innerHTML = AbonarCreditoTabla.rows.length - 1; // ID
      cell2.innerHTML = nombres[i]; // Nombre
      cell3.innerHTML = CURPs[i]; // CURP
      cell4.innerHTML = AbonarCredito.toFixed(2); // Monto abonado con dos decimales
      cell5.innerHTML = PagoCapital.toFixed(2); // Pago capital con dos decimales
      cell7.innerHTML = saldoCredito.toFixed(2); // Saldo adeudo con dos decimales

      banderin = true;
      break;
    }
  }

  if (banderin) {
    alert("Se realizó el abono al crédito del usuario con CURP: " + AbonarCreditoCURP);
  } else {
    alert("El usuario con la CURP: " + AbonarCreditoCURP + " no está en el sistema.");
  }

  // Limpiar los campos después de realizar el abono
  AbonarCreditoInput.value = "";
  AbonarCreditoCURPInput.value = "";
});



btnAcciones.addEventListener("click", function () {
  const AccionesCURP = AccionesCURPInput.value;
  const historialTabla = document.getElementById("historialTabla");

  // Limpiamos la tabla antes de actualizarla
  historialTabla.innerHTML = "";

  AccionesHistorial.forEach((registro, index) => {
    if (registro.CURP === AccionesCURP) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${registro.CURP}</td>
        <td>${registro.tipoAccion}</td>
        <td>${registro.monto}</td>
        <td>${registro.fecha}</td>
      `;
      historialTabla.appendChild(row);
    }
  });
});
// Obtén una referencia al botón de descarga

// Obtén una referencia al botón de descarga
const btnDescargarPDF = document.getElementById("btnDescargarPDF");
const historialTabla = document.getElementById("historialTabla");

// Manejar el evento click del botón de descarga
btnDescargarPDF.addEventListener("click", () => {
  if (historialTabla) {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Obtén la tabla como una tabla HTML
    const table = historialTabla;

    // Configurar la tabla de jsPDF
    doc.autoTable({ html: table });

    // Guardar el PDF con un nombre de archivo
    doc.save("Historial.pdf");
  } else {
    alert("Por favor, asegúrate de tener datos en la tabla antes de descargar el historial en PDF.");
  }
});

