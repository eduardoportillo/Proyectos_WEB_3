require("/Action/index.js")
class GenderBar extends scomponent {
    constructor(props) {
        super(props);
    }
    onLoad() {
        this.loadList();
    }

    loadList() {
        Action.getGender().then(data => {
            let listaItems = document.getElementById("listGender");
            for (let i = 0; i < data.length; i++) {
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
                " onClick="window.location.href = '/gender/?id=${data[i].id}&name=${data[i].name}'">
                    <label style="
                        text-align: center;
                        font-weight: 600;
                        color: #666;
                    ">${data[i].name}</label>
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