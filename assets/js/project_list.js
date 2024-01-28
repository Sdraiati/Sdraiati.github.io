function add_progetto(parent, name, id) {
	let progetto = document.createElement("a")
	progetto.textContent = name
	progetto.href = "project/" + id

	progetto.addEventListener("click", (event) => {
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
