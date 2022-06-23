require("/components/Barra/index.js")
require("/components/Footer/index.js")
require("/Action/index.js")
require("/components/MovieItem")

class index extends scomponent {
    constructor(props) {
        super(props);
        this.Barra = new Barra({ title: "" });
        this.Footer = new Footer({});
        this.id = getParam("id");
    }

    onLoad() {
        this.loadMovies();
    }


    loadMovies() {
        Action.getMovies().then(data => {
            console.log(data);
            let listaItems = document.getElementById("listaItems");
            var data = data.filter(item => item.id == this.id);
            for (let i = 0; i < data.length; i++) {
                var obj = data[i];
                var movie = obj;
                movie.image = movie.image;
                listaItems.innerHTML += `
                ${new MovieItem({ data: movie })}
                <div style="">
                    <p style="color: #000; font-size: 12px;">${movie.description}</p>
                    <a style="color: RED;" onClick="Action.deleteMovie(${this.id})">Eliminar<a>
                </div>
                `;
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