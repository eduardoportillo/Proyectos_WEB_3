function validate() {
	// var usrjson = {};
	var JWT = localStorage.getItem('JWT');
	// let tusAnuncios = document.getElementById("tu-anuncio");
	// let vender = document.getElementById("vender");
	let cerrar = document.getElementById('cerrar');
	let ul_market_place = document.getElementById('ul-market-plis');

	if (!JWT) {
		tusAnuncios.style.display = 'none';
		vender.style.display = 'none';
		cerrar.style.display = 'none';

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

cerrar.addEventListener('click', () => {
	localStorage.removeItem('JWT');
	window.location.href = '/index.html';
});

function getGenders() {
	get_movie_url = 'http://localhost:8000/entidades/gender/';
	fetch(get_movie_url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(data => {
			dataGender = data;
			let ulGenero = document.getElementById('ul-genero');

			for (let i = 0; i < dataGender.length; i++) {
				ulGenero.innerHTML +=
					`<li><a  onClick="genderMovieOnclik(` +
					data[i].id +
					`)">` +
					dataGender[i].name +
					`</a></li>`;
			}
		});
}
getGenders();

function genderMovieOnclik(pk){
  var JWT = localStorage.getItem('JWT');
  if(JWT){
    JWT = JSON.parse(JWT);
  }
  get_movie_gender_url = `http://localhost:8000/entidades/movie-gender/${pk}/list/`
  fetch(get_movie_gender_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT.access}`
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dataMovie = data;
      console.log(dataMovie)
      let divAnuncios = document.getElementById("market-plis-div");
      // divAnuncios.innerHTML = "";
      for (let i = 0; i < dataMovie.length; i++) {
        divAnuncios.innerHTML +=
            `<div class="divAnuncios">
          <p>` +
            dataMovie[i].movie.name +
            `</p>
            <div class="img-anuncio">
          <img src=`+dataMovie[i].movie.image+` alt="movie.img" >
          </div>
          <div>
            <p> Descripción: </p>
            <p style="color: black; font-size: 14px;">` +
            dataMovie[i].movie.description + `</p>
            <p> Codigo: </p>
            <p style="color: black; font-size: 14px;">` +
            dataMovie[i].movie.code + 
            `</p>
            <br>
            <a href="#" class="button">Editar</a>
            <a href="#" class="button">Eliminar</a>
          </div>
        </div>`;
      }
    });
}

function getMovie() {
	get_movie_url = 'http://localhost:8000/entidades/movie/';
	fetch(get_movie_url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(data => {
			dataMovie = data;
			let divAnuncios = document.getElementById('market-plis-div');
			for (let i = 0; i < dataMovie.length; i++) {
				divAnuncios.innerHTML +=
					`<div class="divAnuncios">
          <p>` +
					dataMovie[i].name +
					`</p>
            <div class="img-anuncio">
          <img src=` +
					dataMovie[i].image +
					` alt="movie.img" >
          </div>
          <div>
            <p> Descripción: </p>
            <p style="color: black; font-size: 14px;">` +
					dataMovie[i].description +
					`</p>
            <p> Codigo: </p>
            <p style="color: black; font-size: 14px;">` +
					dataMovie[i].code +
					`</p>
            <br>
            <a href="#" class="button">Editar</a>
            <a href="#" class="button">Eliminar</a>
          </div>
        </div>`;
			}
		});
}
getMovie();
