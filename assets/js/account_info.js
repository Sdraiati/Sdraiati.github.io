async function get_account_info() {
	return {
		username: "danesinoo",
		email: "carlo.rosso.1@studenti.unipd.it",
	}
}

get_account_info().then((account_info) => {
	document.getElementById("username").textContent = account_info.username
	document.getElementById("email").textContent = account_info.email
}).catch((error) => {
	console.log(error)
})

document.getElementById('modificaCredenzialiForm')
	.addEventListener('submit', function(event) {
		event.preventDefault();

		let newEmail = document.getElementById('newEmail').value;
		let newUsername = document.getElementById('newUsername').value;
		let newPassword = document.getElementById('newPassword').value;
		let confirmNewPassword = document.getElementById('confirmNewPassword').value;

		if (newPassword !== confirmNewPassword) {
			document.getElementById("confirmNewPassword")
				.setCustomValidity("Le password non coincidono")
			return
		}

		let userData;
		if (newPassword !== "") {
			userData = {
				password: newPassword,
			}
		}
		if (newEmail !== "") {
			userData = {
				email: newEmail,
			}
		}
		if (newUsername !== "") {
			userData = {
				username: newUsername,
			}
		}
		console.log(JSON.stringify(userData));
		// TODO: send request to server
	});
