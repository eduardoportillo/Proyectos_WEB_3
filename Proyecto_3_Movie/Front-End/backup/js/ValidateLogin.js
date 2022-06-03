function validate() {
	var JWT = {};
	var usr = localStorage.getItem('JWT');
	if (usr) {
		JWT = JSON.parse(JWT);
	}
	if (JWT.access) {
		window.location.href = '/html/market-plis.html';
	}
	return JWT;
}
validate();

function send() {

	const url_login = 'http://localhost:8000/api/token/';

	let email = document.getElementById('email');
	let password = document.getElementById('password');
	let error = document.getElementById('error');

	error.style.color = '#ce1212';

	// let button_login = document.getElementById('button-login');
	// let mensajeError = [];

	if (email.value === null || email.value === '') {
		error.innerHTML = 'Ingresa un email';
		return;
	}

	if (password.value === null || password.value === '') {
		error.innerHTML = 'Ingresa una contraseña';
		return;
	}

	fetch(url_login, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({
			username: email.value,
			password: password.value,
		}),
	})
		.then(res => res.json())
		.then(data => {
			if (data.detail) {
				error.innerHTML = data.detail;
				return;
			} else {
				localStorage.setItem('JWT', JSON.stringify(data));
				window.location.href = './market-plis.html';
			}

			error.innerHTML = 'error desconocido';
		});

	error.innerHTML = null;
}
