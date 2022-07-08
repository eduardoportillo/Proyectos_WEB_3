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
}
