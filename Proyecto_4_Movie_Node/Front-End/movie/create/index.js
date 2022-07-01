require('/components/Barra/index.js');
require('/components/Footer/index.js');
require('/components/GenderSelect/index.js');
require('/Action/index.js');
class index extends scomponent {
    constructor(props) {
        super(props);
        this.Barra = new Barra({ title: /* "Create movie" */ '' });
        this.Footer = new Footer({});
        this.idMovie = getParam('idMovie');


    }
    onLoad() {
        var btn_create = document.getElementById('btn_create');
        btn_create.addEventListener('click', this.formMovie.bind(this));
        if (!this.idMovie) {
            this.loadForm(null)
            let error = document.getElementById('error');
            error.style.color = '#ce1212';

            let name = document.getElementById('name');
            if (!name.value) {
                error.innerHTML = 'Name is required';
                return;
            }
            let description = document.getElementById('description');
            if (!description.value) {
                error.innerHTML = 'Description is required';
                return;
            }
            let image = document.getElementById('image');
            if (!image.files[0]) {
                error.innerHTML = 'Image is required';
                return;
            }
            error.innerHTML = '';
            Action.createMovie({
                name: name.value,
                description: description.value,
                image: image.files[0],
            }).then(data => {
                window.location.href = '/index.html';
            });
        } else { // Update
            Action.getMoviesById(this.idMovie).then(data => {
                this.dataMovie = data[0];
                this.loadForm(data[0])
            });
            // Action.updateMovie().then();
        }
    }
    formMovie() {
        var listGenderSelect = this.GenderSelect.getValues();
        var formatGenders = {};
        listGenderSelect.map(obj => {
            formatGenders[obj.id] = obj.id
        })
        let error = document.getElementById('error');
        error.style.color = '#ce1212';

        let name = document.getElementById('name');
        if (!name.value) {
            error.innerHTML = 'Name is required';
            return;
        }
        let description = document.getElementById('description');
        if (!description.value) {
            error.innerHTML = 'Description is required';
            return;
        }
        let image = document.getElementById('image');
        // if (!image.files[0]) {
        //     error.innerHTML = 'Image is required';
        //     return;
        // }
        // Create
        if (!this.idMovie) {

            error.innerHTML = '';
            Action.createMovie({
                name: name.value,
                description: description.value,
                image: image.files[0],
                genders: formatGenders,
            }).then(data => {
                window.location.href = '/index.html';
            });
        } else { // Update
            Action.updateMovie({
                id:  this.idMovie,
                name: name.value,
                description: description.value,
                image: image.files[0],
                genders: formatGenders,
            }).then(data => {
                window.location.href = '/index.html';
            });
        }
    }
    loadForm(data) {
        this.GenderSelect = new GenderSelect({
            data: data
        });
        this.GenderSelect.onLoad();
        console.log(data);
        let item = document.getElementById('cargargaraqui');
        item.innerHTML = `<form>
        ${this.getInput({ id: 'name', value: data?.name })}
        ${this.getInput({ id: 'description', value: data?.description })}
        ${this.getInput({ id: 'image', type: 'file' })}
        ${this.GenderSelect}
        <div id="error"></div>
      
    </form>`
    }

    getInput({ id, label, type = 'text', placeholder = '', value = '' }) {
        return `
        <div>
            <label for="${id}">${label ?? id}:</label>
            <input type="${type}" id="${id}" name="${id}" placeholder="${placeholder}" value="${value}"/>
        </div>
        `;
    }

    render() {
        return `
                ${this.Barra}
               <div id="cargargaraqui"></div>
               <button id="btn_create" type="button" style="cursor:pointer;">Create</button>
                ${this.Footer}
                
        `;
    }
}
smodule.connect(index);
