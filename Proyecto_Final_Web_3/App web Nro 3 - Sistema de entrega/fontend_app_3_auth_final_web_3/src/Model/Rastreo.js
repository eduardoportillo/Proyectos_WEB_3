const Env = require("../env.json")

export default class Rastreo {
    static async registro(obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/`, {
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

    static async getAll() {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/`, {
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
    static async getByEntrega(id) {
        // var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/${id}/rastreo/`, {
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
    static async eliminar(id) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/rastreo/${id}/`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            },
        })

        const json = {};
        // if (resp.status != 200 || resp.status != 204) {
            // json.status = resp.status;
            // throw json;
        // }
        return json;
    }
}
