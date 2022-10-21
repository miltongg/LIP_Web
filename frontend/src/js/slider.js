//imagenes.
let images = ['../img/slide/slide1.jpg', "../img/slide/slide2.jpg", "../img/slide/slide3.jpg"];

//elemento para cargar el slide.
let slider = document.getElementById("slider-js");

//elemento general del slider.
let sliderContainer = document.getElementById("slider-container");

//ancho del contenedor en funcion de las imagenes.
slider.style.width = images.length * 100 + "%";

//elemento para cargar la navegacion.
let sliderNav = document.getElementById("slider-navigation");

//variable para saber si el slide esta activo.
let active = true;

//evemtos para saber si el raton esta sobre el slide.

sliderContainer.addEventListener("mouseover", () => {
    if (active) active = false;
});

//eventos para saber si el raton no esta sobre el slide.
sliderContainer.addEventListener("mouseout", () => {
    if (active === false) active = true;
});

//evento al pulsar en la navegaciion
sliderNav.addEventListener("click", (e) => slideImage(e.target.id.slice(-1)));

//dibujar slide y navegacion.
for (let img in images) {

    //cargar imagenes.
    slider.innerHTML += `<img src="${images[img]}" className="slider__img" alt="" style="width: ${100 / images.length}%"/>`;

    //cargar navegacion.
    sliderNav.innerHTML += `<span class="${img === 0 ? 'slider-nav slider-nav--active' : 'slider-nav'}" id="slider-nav-${img}"/>`;
}

//variable contador de imagenes.
let cont = 0;

//intervalos de tiempo para el contador.
const startInterval = () => setInterval(counter, 4000);

//iniciar el contador.
startInterval();

//funcion que cambia la imagen.
function counter() {
    if (active) {
        cont++;
        if (cont >= images.length) cont = 0;
        setInterval(slideImage(cont), 2000);
        setInterval(setActive(cont), 2000);
    }
}

function slideImage(id) {
    if (!active && !isNaN(id)) {
        cont = id;
        setActive(id);
    }

    slider.style.left = "-" + id + "00%";
}

let navIcons = [...document.getElementsByClassName("slider-nav")];

function setActive(id) {

    navIcons.map(idValue => idValue.attributes.id.nodeValue.slice(-1) === id ?
        idValue.classList.add("slider-nav--active") :
        idValue.classList.remove("slider-nav--active")
    )

}