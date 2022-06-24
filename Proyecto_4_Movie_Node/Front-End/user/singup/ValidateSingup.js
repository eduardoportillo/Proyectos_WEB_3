function validate() {
	var JWT = localStorage.getItem('JWT');
	if (JWT) {
		window.location.href = '../html/market-plis.html';
	}
}
validate();

function sendUser() {
	const url_sing_up = 'http://127.0.0.1:3000/entidades/signup/';

	let nombre = document.getElementById('name');
	let email = document.getElementById('email');
	let password = document.getElementById('password');
	let passwordRep = document.getElementById('repit-password');
	let error = document.getElementById('error');
	error.style.color = '#ce1212';

	if (nombre.value === null || nombre.value === '') {
		error.innerHTML = 'Ingresa un nombre';
		return;
	}

	if (email.value === null || email.value === '') {
		error.innerHTML = 'Ingresa un email';
		return;
	}

	emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	if (!emailRegex.test(email.value)) {
		error.innerHTML = 'correo no cumple el formato';
		return;
	}

	if (password.value === null || password.value === '') {
		error.innerHTML = 'Ingresa un password';
		return;
	}

	if (password.value !== passwordRep.value) {
		error.innerHTML = 'la contraseña no son iguales';
		return;
	}

  if (password.value.length < 8) {
		error.innerHTML = 'la contraseña debe tener al menos 8 caracteres';
		return;
	}

	fetch(url_sing_up, { // TODO cambiar a http servi
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email.value,
			username: nombre.value,
			password: password.value,
		}),
	})
		.then(res => res.json())
		.then(data => {
			if (data.token) {
				window.location.href = '../login/index.html';
			} else {
				error.innerHTML = data.msg;
			}
		});
}
