
const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content")
const tabContentWrapper = document.querySelector(".tab-content-wrapper");

const shiftTabs = (linkId) => {
  allTabs.forEach((tab, i) => {
      
    if (tab.id.includes(linkId)) {
      allTabs.forEach((tabItem) => { 
        tabItem.style = `transform: translateY(-${i*300}px);`;
      });
    }
  });
}

allLinks.forEach((elem) => {
  elem.addEventListener('click', function() {
    const linkId = elem.id;
    const hrefLinkClick = elem.href;

    allLinks.forEach((link, i) => {
      if (link.href == hrefLinkClick){
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
const acciones = [];
let banderin = false;
// BOTONES
const btnAgregar = document.getElementById("btnAgregar");
const btnAbonar = document.getElementById("btnAbonar");
const btnRetirar = document.getElementById("btnRetirar");
const btnCredito = document.getElementById("btnCredito");
// INPUTS INGRESAR
const nombreInput = document.getElementById("nombre");
const CURPInput = document.getElementById("CURP");
const AbonoInput = document.getElementById("abono");
// INPUTS ABONAR
const AbonarCuentaInput = document.getElementById("AbonarCuenta");
const Curp_AbonarInput = document.getElementById("CURP_Abonar");
// INPUTS RETIRAR
const RetirarCuentaInput = document.getElementById("RetirarCuenta");
const CURP_RetirarInput = document.getElementById("CURP_Retirar");
// INPUTS CREDITO
const CURP_CreditoInput = document.getElementById("CreditoCURP");
const Monto_CreditoInput = document.getElementById("Credito");

// **********LOGICA**********
// Seccion Agregar
btnAgregar.addEventListener("click", function () {
  const nombre = nombreInput.value; // Obtener el valor del input
  const CURP = CURPInput.value;
  const abono = parseFloat(AbonoInput.value); // Convertir el abono a número
  
  if (abono >= 5000) {
    CURPs.push(CURP); // Agregar el valor a la matriz
    nombres.push(nombre);
    abonos.push(abono);
    nombreInput.value = "";
    CURPInput.value = ""; // limpiar
    AbonoInput.value = "";
  }
else {
  alert("El abono debe ser mayor o igual a 5000");
}
  console.log(nombres);
  console.log(CURPs);
  console.log(abonos);
});

// Seccion Abonar

btnAbonar.addEventListener("click", function() {
  // Obtener el valor del input
  const AbonarCuenta = parseFloat(AbonarCuentaInput.value);
  const Curp_Abonar = Curp_AbonarInput.value;

 for (let i = 0; i <CURPs.length; i++) {
  if (Curp_Abonar === CURPs[i]) {
    abonos[i] += AbonarCuenta; // Agregar el monto al abono existente
    banderin = true;
    break;
  }
  
  if (banderin) {
    AbonarCuentaInput.value = "";
    Curp_AbonarInput.value = "";
  } else {
    alert("El usuario con la CURP: " + AbonarCuenta + " no está en el sistema.");
  }
  
 }
 console.log(nombres);
 console.log(CURPs);
 console.log(abonos);
});
// Seccion Retirar
btnRetirar.addEventListener("click", function () {
    // Obtener el valor del input
    const RetirarCuenta = parseFloat(RetirarCuentaInput.value);
    const CURP_Retirar = CURP_RetirarInput.value;
    for (let i = 0; i < CURPs.length; i++) {
      if (CURP_Retirar === CURPs[i]) {
        abonos[i] -= RetirarCuenta;
        break;
        banderin = true;
      }

      if (banderin) {
        RetirarCuentaInput.value = "";
        CURP_RetirarInput.value = "";

      } else {
        alert("El usuario con la CURP: " + CURP_Retirar + " no está en el sistema.");

        
      }
      
    }
    console.log(nombres);
    console.log(CURPs);
    console.log(abonos);
});

btnCredito.addEventListener("click", function() {
  const CURP_Credito = CURP_CreditoInput.value;
  const Monto_Credito = parseFloat(Monto_CreditoInput.value);
  for (let i = 0; i < CURPs.length; i++) {
      if (CURP_Credito === CURPs[i] && Monto_Credito <= abonos[i]*2) {
        banderin = true;
        break;
      }
  }
  if (banderin) {
    alert("Crédito aprobado para el usuario con CURP: " + CURP_Credito);
  } else {
    alert("Crédito rechazado para el usuario con CURP: " + CURP_Credito);
  }
  CURP_CreditoInput.value = "";
  Monto_CreditoInput.value = "";
});



