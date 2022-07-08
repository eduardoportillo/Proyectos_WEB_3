const Env = require("../env.json")

export default class Categoria {
    static async getByEmpresa(id) {
        var resp = await fetch(`${Env.url_mercado}/mercado/producto/${id}/getbyempresa/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        var resp = await fetch(`${Env.url_mercado}/mercado/producto/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        return json;
    }
    static async registro(obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_mercado}/mercado/producto/`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: obj
        })
        const json = await resp.json();
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
    static async editar(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_mercado}/mercado/producto/${id}/`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: obj
        })
        const json = await resp.json();
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
}
