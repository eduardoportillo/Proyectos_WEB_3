require("/components/Barra/index.js")
require("/components/Footer/index.js")
require("/Action/index.js")
class index extends scomponent {
    constructor(props) {
        super(props);
        this.Barra = new Barra({ title: "Create gender" });
        this.Footer = new Footer({});
    }


    create() {

        let error = document.getElementById('error');
        error.style.color = '#ce1212';

        let name = document.getElementById('name');
        if (!name.value) {
            error.innerHTML = 'Name is required';
            return;
        }
        error.innerHTML = '';
        Action.createGender({ name: name.value, }).then(data => {
            window.history.back();
        })

    }
    onLoad() {
        var btn_create = document.getElementById("btn_create");
        btn_create.addEventListener("click", this.create.bind(this));
    }

    getInput({ id, label, type = "text", placeholder = "", value = "" }) {
        return `
        <div>
            <label for="${id}">${label ?? id}:</label>
            <input type="${type}" id="${id}" name="${id}" placeholder="${placeholder}"/>
        </div>
        `
    }

    render() {
        return `
                ${this.Barra}
                 <form>
                    ${this.getInput({ id: "name" })}
                    <div id="error"></div>
                    <button id="btn_create" type="button" style="cursor:pointer;">Create</button>
                </form>
                ${this.Footer}
                
        `
    }
}
smodule.connect(index);