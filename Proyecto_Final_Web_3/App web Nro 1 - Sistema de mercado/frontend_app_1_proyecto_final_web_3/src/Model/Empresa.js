const Env = require("../env.json")

export default class Empresa {
    static async getAll() {
        var resp = await fetch(`${Env.url_mercado}/mercado/empresa/`, {
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
        var resp = await fetch(`${Env.url_mercado}/mercado/empresa/${id}/`, {
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
        var resp = await fetch(`${Env.url_mercado}/mercado/empresa/`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
            body: obj
        })
        const json = {}
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
    static async editar(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_mercado}/mercado/empresa/${id}/`, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + token
            },
            body: obj
        })
        const json = {}
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
    static async delete(id) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_mercado}/mercado/empresa/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        })
        const json = {};
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
}
