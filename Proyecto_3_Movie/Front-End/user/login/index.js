require("/components/Barra/index.js")
require("/components/Footer/index.js")
require("/Action/index.js")
class index extends scomponent {
    constructor(props) {
        super(props);
        this.Barra = new Barra({});
        this.Footer = new Footer({});

        if (Action.__TOKEN) {
            window.location.href = "/index.html";
        }
    }
    login() {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let error = document.getElementById('error');
        error.style.color = '#ce1212';
        if (email.value === null || email.value === '') {
            error.innerHTML = 'Ingresa un email';
            return;
        }
        if (password.value === null || password.value === '') {
            error.innerHTML = 'Ingresa una contraseña';
            return;
        }
        Action.token({
            username: email.value,
            password: password.value,
        }).then(data => {
            window.location.reload();
        }).catch(err => {
            error.innerHTML = err.message;
        })
        error.innerHTML = null;
    }

    onLoad() {
        this.loginBtnSend = document.getElementById("loginBtnSend");
        this.loginBtnSend.addEventListener("click", this.login.bind(this));
    }
    render() {
        return `
                ${this.Barra}
                <form>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="correo" />
                    </div>
                    <div>
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div id="error"></div>
                    <button id="loginBtnSend" type="button" style="cursor:pointer;">Ingresar</button>
                    <a href="../singup/sing-up.html">Registrarse<a>
                </form>
                ${this.Footer}
                
        `
    }
}
smodule.connect(index);