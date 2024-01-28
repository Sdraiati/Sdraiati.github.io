function add_partecipante(parent, username) {
	let partecipante = document.createElement("li")
	partecipante.textContent = username
	parent.appendChild(partecipante)
}

/*
fetch("/api/partecipanti")
	.then(response => response.json())
	.then(data => {
		data.forEach(username => {
			add_partecipante(partecipanti, username)
		})
	})
	.catch(error => console.error(error))
*/
async function get_partecipanti() {
	return ["pippo", "pluto", "paperino"]
}

let partecipanti = document.getElementById("partecipanti-list")
get_partecipanti()
	.then((value) =>
		value.forEach(username => add_partecipante(partecipanti, username)))
	.catch(error => console.error(error))
