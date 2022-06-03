function validate() {
  // var usrjson = {};
  var JWT = localStorage.getItem("JWT");
  // let tusAnuncios = document.getElementById("tu-anuncio");
  // let vender = document.getElementById("vender");
  let cerrar = document.getElementById("cerrar");
  let ul_market_place = document.getElementById("ul-market-plis");

  if (!JWT) {
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
  return JWT;
  // return usrjson;
}
validate();

let dataMovie;

cerrar.addEventListener("click", () => {
  localStorage.removeItem("JWT");
  window.location.href = "/index.html";
});

function getMovie() {
  get_movie_url = "http://localhost:8000/entidades/movie/"
  fetch(get_movie_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dataMovie = data;
      let divAnuncios = document.getElementById("market-plis-div");
      for (let i = 0; i < dataMovie.length; i++) {
        divAnuncios.innerHTML +=
            `<div class="divAnuncios">
          <p>` +
            dataMovie[i].name +
            `</p>
            <div class="img-anuncio">
          <img src=`+dataMovie[i].image+` alt="movie.img" >
          </div>
          <div>
            <p> Descripción: </p>
            <p style="color: black; font-size: 14px;">` +
            dataMovie[i].description + `</p>
            <a href="#" class="button">comprar</a>
            <a href="#" class="button">$` +
            dataMovie[i].code + 
            `</a>
          </div>
        </div>`;
      }
    });
}

getMovie();
