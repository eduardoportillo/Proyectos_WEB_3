require("/components/Barra/index.js")
require("/components/Footer/index.js")
require("/Action/index.js")
require("/components/MovieItem")

class index extends scomponent {
    constructor(props) {
        super(props);

        this.id = getParam("id");
        this.name = getParam("name")

        this.Barra = new Barra({ title: "Gender " + this.name });
        this.Footer = new Footer({});
    }

    onLoad() {
        this.loadMovies();
    }

    loadMovies() {
        Action.getMoviesGender(this.id).then(data => {
            console.log(data);
            let listaItems = document.getElementById("listaItems");
            for (let i = 0; i < data.length; i++) {
                var obj = data[i];
                var movie = obj.movie;
                movie.image = HTTP.__URL_API + movie.image;
                listaItems.innerHTML += new MovieItem({ data: movie });
            }
        }).catch(err => {
            console.log(err);
        })
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
                
        `
    }
}
smodule.connect(index);