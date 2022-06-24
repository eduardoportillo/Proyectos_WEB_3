require("/Action/index.js")
class GenderSelect extends scomponent {
    constructor(props) {
        super(props);
    }
    onLoad() {
        this.loadList();
    }

    test() {
        alert("sisds")
    }

    getIds() {
        var elmts = [];
        var items = document.querySelectorAll('[data-gender-lcb]');
        items.forEach(obj => {
            var data = JSON.parse(obj.getAttribute("data-gender-lcb"));
            if (obj.checked) {
                elmts.push(data.id);
            }
        })
        return elmts;
    }
    getValues() {
        var elmts = [];
        var items = document.querySelectorAll('[data-gender-lcb]');
        items.forEach(obj => {
            var data = JSON.parse(obj.getAttribute("data-gender-lcb"));
            if (obj.checked) {
                elmts.push(data);
            }
        })
        return elmts;
    }
    loadList() {
        Action.getGender().then(data => {
            var genders = this.props.data?.genders;

            let listaItems = document.getElementById("listGender");
            for (let i = 0; i < data.length; i++) {
                var obj = data[i];
                var exist = false;
                if (genders) {
                    exist = genders.find(o => o.id == obj.id)
                }

                listaItems.innerHTML += `
                <div style="
                    width: 100px;
                    height: 30px;
                    background-color: #f5f5f5;
                    margin: 4px;
                    border-radius: 5px;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    cursor: pointer;
                " >
                    <input id="${i + "-idcb"}" data-gender-lcb='${JSON.stringify(obj)}' type="checkbox" ${exist ? "checked" : ""}/>
                    <label style="
                        text-align: center;
                        font-weight: 600;
                        color: #666;
                    ">${obj.name}</label>
                </div>`;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return `
                <div id="listGender"
                style="
                    padding: 10px;
                    display: flex;
                ">
                </div>
        `
    }
}