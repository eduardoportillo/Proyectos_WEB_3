import jwt_decode from "jwt-decode";
import Usuario from "./Usuario";
const Env = require("../env.json")

export default class Rol {


    static async getAll() {
        var resp = await fetch(`${Env.url_auth}/api/role/`, {
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
    static async getByUser(id) {
        var resp = await fetch(`${Env.url_auth}/api/role/user/${id}/`, {
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
