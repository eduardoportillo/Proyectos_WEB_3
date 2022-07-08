import jwt_decode from "jwt-decode";
const Env = require("../env.json")

export default class Usuario {

    static signout() {
        sessionStorage.removeItem("token");
        window.location.href = "/";
    }
    static getToken() {
        return sessionStorage.getItem("token")
    }
    static getUser() {
        const token = sessionStorage.getItem("token");
        const usuario = jwt_decode(token);
        return usuario;
    }

    static async login(obj) {
        const resp = await fetch(`${Env.url_auth}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        sessionStorage.setItem("token", json.token);
        return json
    }
    static async getById(id) {
        var resp = await fetch(`${Env.url_auth}/api/user/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Usuario.getToken()
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
        var resp = await fetch(`${Env.url_auth}/api/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + Usuario.getToken()
            },
        })

        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        return json;
    }
    static async signup(obj) {
        const resp = await fetch(`${Env.url_auth}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const json = await resp.json();
        if (resp.status != 200) {
            json.status = resp.status;
            throw json;
        }
        // sessionStorage.setItem("token", json.token);
        return json
    }
    static async editar(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_auth}/api/user/update/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(obj)
        })
        const json = {}
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
    static async editarRol(id, obj) {
        var token = sessionStorage.getItem("token");
        var resp = await fetch(`${Env.url_auth}/api/user/rol/update/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(obj)
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
        var resp = await fetch(`${Env.url_auth}/api/user/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        })
        const json = {}
        if (resp.status != 200 && resp.status != 201) {
            json.status = resp.status;
            throw json;
        }
        return json
    }
}
