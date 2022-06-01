function validate() {
  var usrjson = {};
  var usr = localStorage.getItem("usuario_log");
  let tusAnuncios = document.getElementById("tu-anuncio");
  let vender = document.getElementById("vender");
  let cerrar = document.getElementById("cerrar");
  let ul_market_place = document.getElementById("ul-market-plis");

  if (!usr) {
    tusAnuncios.style.display = "none";
    vender.style.display = "none";
    cerrar.style.display = "none";

    ul_market_place.innerHTML += `<li>
        <a href="./sing-up.html"> sign up </a>
      </li>`;

    ul_market_place.innerHTML += `<li>
        <a href="./login.html"> LogIn </a>
      </li>`;
  }
  return usrjson;
}
validate();

let dataAnuncios;

cerrar.addEventListener("click", () => {
  localStorage.removeItem("usuario_log");
  window.location.href = "./index.html";
});

function getAnunciosActivos() {
  fetch("http://localhost:3000/anunciosActivos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dataAnuncios = data;
      let divAnuncios = document.getElementById("market-plis-div");
      for (let i = 0; i < dataAnuncios.length; i++) {
        divAnuncios.innerHTML +=
            `<div class="divAnuncios">
          <p>` +
            dataAnuncios[i].titulo +
            `</p>
            <div class="img-anuncio">
          <img src="http://localhost:3000`+dataAnuncios[i].url_fotografia+`" alt="productsvg" >
          </div>
          <div>
            <p> Descripción: </p>
            <p style="color: black; font-size: 14px;">` +
            dataAnuncios[i].descripcion + `</p>
            <a href="#" class="button">comprar</a>
            <a href="#" class="button">$` +
            dataAnuncios[i].precio + 
            `</a>
            <p>Usuario:</p>
            <p style="color: black; ">`+dataAnuncios[i].correo+`</p>
          </div>
        </div>`;
      }
    });
}

getAnunciosActivos();
