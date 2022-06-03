require("/components/Barra/index.js")
require("/components/Footer/index.js")
require("/Action/index.js")
require("/components/GenderBar/index.js")
require("/components/MovieItem/")
class index extends scomponent {
    constructor(props) {
        super(props);
        this.Barra = new Barra({ title: "Home" });
        this.Footer = new Footer({});
        if (!Action.__TOKEN) {
            window.location.href = "/user/login";
        }
        this.GenderBar = new GenderBar({});
    }
    onLoad() {
        this.loadMovies();
    }

    loadMovies() {
        Action.getMovies().then(data => {
            let listaItems = document.getElementById("listaItems");
            for (let i = 0; i < data.length; i++) {
                listaItems.innerHTML += new MovieItem({ data: data[i] });
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return `
                ${this.Barra}
                ${this.GenderBar}
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