require('/components/Barra/index.js');
require('/components/Footer/index.js');
require('/Action/index.js');
require('/components/MovieItem');

class index extends scomponent {
    // idMovie;
    constructor(props) {
        super(props);
        this.Barra = new Barra({title: ''});
        this.Footer = new Footer({});
        this.idMovie = getParam('id');
        parseInt(this.idMovie);
    }

    onLoad() {
        this.loadMovies();
    }

    loadMovies() {
        Action.getMoviesById(this.idMovie)
            .then(data => {
                console.log(data);
                let listaItems = document.getElementById('listaItems');
                let listaGender = document.getElementById('listaGender');
                var data = data.filter(item => item.id == this.idMovie);
                for (const movie of data) {
                    movie.image = movie.image;
                    movie.genders.forEach(gender => {
                        listaGender.innerHTML += `<li">${gender.name}</li>  .`;
                    });

                    listaItems.innerHTML += `
                ${new MovieItem({data: movie})}
                <div style="">
                    <p style="color: #000; font-size: 12px;">${
                        movie.description
                    }</p>
                    <a style="color: BLUE;" onClick="redirectUpdateMovie(${movie.id})">Actualizar<a>
                    <br>
                   
                    <br>
                    <a style="color: RED;" onClick="Action.deleteMovie(${
                        this.idMovie
                    })">Eliminar<a>
                </div>
                `;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return `
                ${this.Barra}
                
                 <div id="listaItems" style="
                 justify-content: center;
                 align-items: center;
                 text-align: center;
             "></div>

             <div style="
             text-align: center;"> 
                 <ol id="listaGender">
                 </ol>
            </div>
                ${this.Footer}
                
        `;
    }
}

function redirectUpdateMovie(idMovie){
    window.location.href =`/movie/create/index.html?idMovie=${idMovie}`;
}
smodule.connect(index);
