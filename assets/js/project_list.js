function add_progetto(parent, name, id) {
	let progetto = document.createElement("a")
	progetto.textContent = name
	progetto.href = "project/" + id

	progetto.addEventListener("click", (event) => {
		// should be a post with the id of the user in the body
		fetch(event.target.href)
			.then(response => response.text()) // Convert the response to text
			.then(html => {
				// Replace the current document with the received HTML
				document.open();
				document.write(html);
				document.close();
			})
			.catch(error => console.error('Error:', error));
	})



	let li = document.createElement("li")
	li.appendChild(progetto)
	parent.appendChild(li)
}

let progetti = document.getElementById("project-list")

async function get_progetti() {
	return [{
		name: "personale",
		id: 1
	},
	{
		name: "start_up1",
		id: 2
	},
	{
		name: "start_up2",
		id: 3
	}]
}

let projs = document.getElementById("project-list")
get_progetti()
	.then((value) =>
		value.forEach(proj => add_progetto(projs, proj.name, proj.id)))
	.catch(error => console.error(error))

form.addEventListener('submit', function(event) {
	event.preventDefault();

	let inputNomeProgetto = document.getElementById('inputNomeProgetto').value;
	let inputDescrizioneProgetto = document.getElementById('inputDescrizioneProgetto').value;

	let projectData = {
		id: sessionStorage.getItem("user"),
		nomeProgetto: inputNomeProgetto,
		descrizioneProgetto: inputDescrizioneProgetto
	};

	console.log(JSON.stringify(projectData));
	// TODO: send request to server
});
