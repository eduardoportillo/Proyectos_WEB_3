const Env = require("../env.json")

export default class Pedido {
    static async registro(obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/pedido/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(obj)
        })
        const json = await resp.json();
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
    static async getByIdUsuario(id) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/pedido/${id}/pedidobyuser/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        })

        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        return json;
    }
    static async getAll() {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/pedido/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        })

        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        return json;
    }
    static async getById(id) {
        // var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/pedido/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer " + token
            },
        })

        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        return json;
    }
}
