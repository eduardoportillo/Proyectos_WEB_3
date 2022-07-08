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
        if(!token) return
        const usuario = jwt_decode(token);
        return usuario;
    }
    static isRol(arr) {
        const usuario = this.getUser();
        if (!usuario) return false;
        if (arr.indexOf(usuario.roles) > -1) return true;
        return false;
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
        sessionStorage.setItem("token", json.token);
        return json
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
}
