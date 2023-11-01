// const es una variable llamada navMenu y lo capturaremos en el documento (document.) y el punto por que es una ID y getElementById y la id seleccionada("nav-menu") 
const navMenu = document.getElementById("nav-menu"),
navToggle= document.getElementById('nav-toggle'),
navClose= document.getElementById('nav-close')
// si (navToggle)...cuando vamos a navToggle (que es el icono del menu en modo celular), y damos un click, vamos a listar todos los eventos (addEventListener) y en este caso necesitamos el vento de "click" ahora cuando yo ocupe click (,) quisiera que haga la siguiente operacion ()=>{
//Yo quisiera que seleccione de nuestro navMenu.classList y le vamos agregar (.add) la ("show-menu") que este se hizo en css con top:0 en donde practicamente le decimos que se muestre de arriba hacia abajo: que cambie la horientacion
if(navToggle){
    navToggle.addEventListener("click",()=>{
        navMenu.classList.add("show-menu")
    })
}
if(navClose){
    navClose.addEventListener("click",()=>{
        navMenu.classList.remove("show-menu")
    })
}
const navLink =document.querySelectorAll(".nav__link")
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove("show-menu")
}
navLink.forEach(n=>n.addEventListener("click",linkAction))
// SCROLL REVEAL
// Hicimos una variable const llamada sr que es igual a ScrollReveal en donde la animación vendra (origin) de arriba (top), la distancia que tendra la animación es de 60px, duracion de 2500 osea (2.5s), con un delay(retraso) con tan solo 400 para que no parezca que esta lenta y reset true es para que cuando bajes y vuelvas a subir y bajar: este se vuelva a visualizar la animación.
// LLAMAR AL METODO: llamamos al sr que representa a ScrollReveal, solo que segun la documentacion se llamará (.reveal) y a quien quiero que le de esa animación (`.home-swiper`) en este caso empezaamos con la clase padre de (`.home-swiper`)en donde llevará comillas hacia la izquierda y punto dentro de y obvio la clase a afectar.
//SWIPER
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: "true",
    spaceBetween: 16,
  });
  
  //Scroll up
  function scrollUp() {
    const scrollup = document.getElementById("scroll-up");
    if (this.scrollY >= 460) scrollup.classList.add("show-scroll");
    else scrollup.classList.remove("show-scroll");
  }
  window.addEventListener("scroll", scrollUp);
  
  //Sections active
  const sections = document.querySelectorAll("section[id]");
  function scrollActive(){
      const scrollY = window.pageYOffset
  
      sections.forEach(current =>{
          const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id')
  
          if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
          }else{
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
          }
      })
  }
  window.addEventListener("scroll",scrollActive)
  //Scroll reveal
const sr = ScrollReveal({
    origin:"top",
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})
sr.reveal(`.home-swiper,.new-swiper,.newsletter__container`)
// Aqui lo que se hizo fue agregarle intervalos a las clases que se mencionan aqui, en donde le dimos intervalo (interval) de 100 para que se vayan apareciendo uno en uno
sr.reveal(`.category__data,.trick__content,.footer__content`,{interval:100})
sr.reveal(`.about__data,.discount__img`,{origin:"left"})
sr.reveal(`.about__img,.discount__data`,{origin:"right"})

