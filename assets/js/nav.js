let user = JSON.parse(sessionStorage.getItem('user'));

if (user != null) {
	let accediLi = document.querySelector('.login-list li:nth-child(1)');
	let registratiLi = document.querySelector('.login-list li:nth-child(2)');
	let utenteLi = document.querySelector('.login-list li.hidden');

	accediLi.classList.add('hidden');
	registratiLi.classList.add('hidden');
	utenteLi.classList.remove('hidden');
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
	event.preventDefault();

	let email = document.getElementById("loginEmail").value;
	let password = document.getElementById("loginPassword").value;
	console.log("Email:", email);
	console.log("Password:", password);

	/*
	* .then((response) => {
	*	if (response.ok) {
	*		// save user in session storage
			sessionStorage.setItem('user', JSON.parse(response.body).user);
	*		// redirect to home page
			window.location.href = "account_home.html";
	*	}
	*	else {
	*		alert("email già registrata")
	*	}
	*	})
	* .catch((error) => {
	* console.log(error)
	* })
	*/
	sessionStorage.setItem('user', JSON.stringify({ email: email }));
	window.location.href = "account_home.html";
});

// Event listener per il form di registrazione
document.getElementById("registratiForm").addEventListener("submit", function(event) {
	event.preventDefault();

	let username = document.getElementById("signupUsername").value;
	let email = document.getElementById("signupEmail").value;
	let password = document.getElementById("signupPassword").value;
	let confirmPassword = document.getElementById("signupConfirmPassword").value;

	if (password !== confirmPassword) {
		document.getElementById("signupConfirmPassword")
			.setCustomValidity("Le password non coincidono")
		return
	}

	/* post request */
	console.log("Username:", username);
	console.log("Email:", email);
	console.log("Password:", password);
	console.log("Conferma Password:", confirmPassword);

	/*
	* .then((response) => {
	*	if (response.ok) {
	*		// save user in session storage
			sessionStorage.setItem('user', JSON.parse(response.body).user);
	*		// redirect to home page
			window.location.href = "account_home.html";
	*	}
	*	else {
	*		alert("email già registrata")
	*	}
	*	})
	* .catch((error) => {
	* console.log(error)
	* })
	*/
})

document.getElementById("signupConfirmPassword").addEventListener("input", function(_) {
	let password = document.getElementById("signupPassword").value;
	let confirmPassword = document.getElementById("signupConfirmPassword").value;

	if (password !== confirmPassword) {
		document.getElementById("signupConfirmPassword")
			.setCustomValidity("Le password non coincidono")
	}
})
