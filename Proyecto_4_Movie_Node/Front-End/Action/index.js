class Action {

    static __TOKEN = localStorage.getItem("JWT") ? JSON.parse(localStorage.getItem("JWT")) : "";
    static async logout() {
        localStorage.removeItem("JWT");
        window.location.href = "/index.html";
    }

    // -----> TOKEN
    static async token({ username, password }) {
        return new Promise((resolve, reject) => {
            HTTP.POST("/api/token/", {
                username: username,
                password: password,
            }).then(data => {
                if (data.detail) {
                    this.__TOKEN = "";
                    reject({ message: data.detail });
                } else {
                    this.__TOKEN = data;
                    localStorage.setItem("JWT", JSON.stringify(data));
                    resolve(data);
                    return;
                }
                reject({ message: "error desconocido" });

            })
        });
    }
    // -----> MOVIE
    static async getMovies() {
        return new Promise((resolve, reject) => {
            HTTP.GET("/entidades/movie/").then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }
    static async createMovie({ name, description, image }) {
        return new Promise((resolve, reject) => {
            if (!this.__TOKEN) {
                reject({ message: "no token" });
                return;
            }
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("genders", JSON.stringify({ "k1": 1, "K2": 2,  "K3": 3}));

            HTTP.MULTIPART(`/entidades/movie/`, formData, this.__TOKEN.access).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }
    // -----> GENDER
    static async getGender() {
        return new Promise((resolve, reject) => {
            HTTP.GET("/entidades/gender/").then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    static async createGender({ name }) {
        return new Promise((resolve, reject) => {
            if (!this.__TOKEN) {
                reject({ message: "no token" });
                return;
            }
            const formData = new FormData();
            formData.append("name", name);

            HTTP.MULTIPART(`/entidades/gender/`, formData, this.__TOKEN.access).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }
    // -----> MOVIE_GENDER
    static async getMoviesGender(id) {
        return new Promise((resolve, reject) => {
            if (!this.__TOKEN) {
                reject({ message: "no token" });
                return;
            }
            HTTP.GET(`/entidades/movie-gender/${id}/list/`, this.__TOKEN.access).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    // Delete Movie
    static async deleteMovie(id) {
        return new Promise((resolve, reject) => {
            if (!this.__TOKEN) {
                reject({ message: "no token" });
                return;
            }
            HTTP.DELETE(`/entidades/movie/${id}/`, this.__TOKEN.access).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }



}


class HTTP {
    static __URL_API = 'http://127.0.0.1:8000';

    static async POST(url, data, bearer) {
        return new Promise((resolve, reject) => {
            var headers = {
                'Content-Type': 'application/json'
            }
            if (bearer) {
                headers['Authorization'] = `Bearer ${bearer}`;
            }
            fetch(this.__URL_API + url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            }).then(res => res.json()).then(data => {
                console.log(data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }
    static async MULTIPART(url, formData, bearer) {
        return new Promise((resolve, reject) => {
            var headers = {
            }
            if (bearer) {
                headers['Authorization'] = `Bearer ${bearer}`;
            }
            fetch(this.__URL_API + url, {
                method: 'POST',
                headers,
                body: formData,
            }).then(res => res.json()).then(data => {
                console.log(data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }
    static async GET(url, bearer) {
        return new Promise((resolve, reject) => {
            var headers = {
                'Content-Type': 'application/json'
            }
            if (bearer) {
                headers['Authorization'] = `Bearer ${bearer}`;
            }
            fetch(this.__URL_API + url, {
                method: 'GET',
                headers,
            }).then(res => res.json()).then(data => {
                console.log(data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    static async DELETE(url, bearer) {
        return new Promise((resolve, reject) => {
            var headers = {
                'Content-Type': 'application/json'
            }
            if (bearer) {
                headers['Authorization'] = `Bearer ${bearer}`;
            }
            fetch(this.__URL_API + url, {
                method: 'DELETE',
                headers,
            }).then(res => res.json()).then(data => {
                window.location.href="/index.html"
                // console.log(data);
                // resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }
}