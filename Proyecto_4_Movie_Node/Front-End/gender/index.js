require('/components/Barra/index.js');
require('/components/Footer/index.js');
require('/Action/index.js');
require('/components/MovieItem');

class index extends scomponent {
    constructor(props) {
        super(props);

        this.idGender = getParam('id');
        parseInt(this.idGender);
        this.name = getParam('name');

        this.Barra = new Barra({title: 'Gender ' + this.name});
        this.Footer = new Footer({});
    }

    onLoad() {
        this.loadMovies();
    }
    
    loadMovies() {
        
        Action.getGenderById(this.idGender)
            .then(data => {
                let listaItems = document.getElementById('listaItems');

                listaItems.innerHTML += `
               

                <Button 
                id="DeleteGender" 
                style="color: white;
                    background-color: red;"
                onClick="deleteGender(${this.idGender})"  
                >Eliminar Genero</Button>`
            })
            .catch(err => {
                console.log(err);
            });
        Action.getMoviesGender(this.idGender)
            .then(data => {
                let listaItems = document.getElementById('listaItems');
                let listaGender = document.getElementById('listaGender');

                for (const element of data) {
                    var movies = element.movies;
                    for (const movie of movies) {
                        movies.image = HTTP.__URL_API + movie.image;
                        listaItems.innerHTML += new MovieItem({data: movie});
                    }
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
                ${this.Footer}
                
        `;
    }
}
function redirectUpdateGender(idGender){
    window.location.href =`/gender/create/index.html?idGender=${idGender}`;
}

function deleteGender(idGender){
    Action.deleteGender({idGender})
}
smodule.connect(index);
