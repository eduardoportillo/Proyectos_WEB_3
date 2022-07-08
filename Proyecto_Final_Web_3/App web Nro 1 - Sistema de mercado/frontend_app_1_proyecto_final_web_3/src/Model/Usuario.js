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
        if (!token) return;
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
}
