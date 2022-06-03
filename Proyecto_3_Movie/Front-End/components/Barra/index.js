require('/Action/index.js');
class Barra extends scomponent {
	constructor(props) {
		super(props);
		this.height = 60;
	}
	back() {
		window.history.back();
	}
	getBackButton() {
		if (
			window.location.pathname == '/' ||
			window.location.pathname == '/index.html'
		) {
			return '';
		}
		return `
        <div id="btn_back_barra" style="cursor:pointer;">
            Back
        </div>
        `;
	}
	onLoad() {
		var btn_back_barra = document.getElementById('btn_back_barra');
		if (btn_back_barra) {
			btn_back_barra.addEventListener('click', this.back.bind(this));
		}
	}
	render() {
		return `
            <div 
            style="
                display: flex;
                position: fixed;
                background-color: #f5f5f5;
                height: ${this.height}px;
                width: 100%;
                text-align: center;
                justify-content: center;
                align-items: center;
            ">  
                <div style="flex:0; ">
                    ${this.getBackButton()}
                </div>
                <div style="flex:4;">
                    ${this.props.title ?? ''}
                </div>
                <div style="flex:4;" onClick="redirectCreteMovie()" >
                ${Action.__TOKEN ? 'Crear Pelicula' : ''}
                </div>
                
                <div style="flex:4;" onClick="redirectCreteGender()" >
                ${Action.__TOKEN ? 'Crear Genero' : ''}
                </div>
                
                <div style="flex:4;" onClick="Action.logout()" >
                ${Action.__TOKEN ? 'logout' : ''}
                </div>
            </div>
            <div style="height:${this.height}px;"></div>
        `;
	}
}

function redirectCreteMovie(){
    window.location.href ="/movie/create/index.html";
}

function redirectCreteGender(){
    window.location.href ="/gender/create/index.html";
}
