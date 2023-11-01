const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item)=>{
    item.onclick=()=>{
        if(item.id=="clear"){
            display.innerText=""
        }else if(item.id=="backspace"){
            let string = display.innerText.toString();
            display.innerText=string.substr(0,string.lenght-1)
        }else if(display.innerText !=""&& item.id=="equal"){
            // eva= evalua si un valor es positivo, negativo, multiplicacion, division, etc..
            display.innerText=eval(display.innerText);
        }else if(display.innerText=="" && item.id=="equal"){
            display.innerText="No se encontro nada";
            // setTimeout= establecer tiempo de espera
            setTimeout(()=>(display.innerText=""), 2000);
        }else{
            display.innerText+=item.id;
            // todo lo que se escriba, se ira mostrando
        }
    };
});

const themetoggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
let isDark=true;
themetoggleBtn.onclick = () => {
    // toggle es palanca
    calculator.classList.toggle("dark")
    themetoggleBtn.classList.toggle("active")
    isDark=! isDark
}