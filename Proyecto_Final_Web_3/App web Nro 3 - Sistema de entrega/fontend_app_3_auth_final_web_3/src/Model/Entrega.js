const Env = require("../env.json")

export default class Entrega {
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
    static async pedidoPendiente(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/${id}/pedidopendiente/`, {
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
    static async entregado(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/${id}/entregado/`, {
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
    static async encamino(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/${id}/encamino/`, {
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
    static async getById(id) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/entrega/${id}/`, {
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
    static async getByIdPedido(id) {
        // var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_entrega}/entrega/pedido/${id}/entrega/`, {
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
