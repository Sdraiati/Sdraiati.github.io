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
