import { Transazione } from "./transazione.js"

function create_cell(text) {
	let cell = document.createElement("td")
	cell.textContent = text
	return cell
}

function create_button(index) {
	let button = document.createElement("button")
	button.textContent = "Modifica"
	button.setAttribute("data-button-kind", "editTag")
	button.setAttribute("data-tag-index", index)
	return button
}

function add_tag_table(parent, name, description, index) {
	let row = document.createElement("tr")
	row.appendChild(create_cell(name))
	row.appendChild(create_cell(description))
	row.appendChild(create_button(index))
	parent.appendChild(row)
}

function get_tags() {
	let tags = Transazione.get()
		.map(t => {
			return {
				name: t.tag,
				descrizione: "una descrizione",
			}
		})
	let unique_tags = []
	tags.forEach(t => {
		if (!unique_tags.find(u => u.name == t.name)) {
			unique_tags.push(t)
		}
	})
	return unique_tags
}

get_tags().forEach((tag, index) => {
	add_tag_table(document.querySelector("#tag-table tbody"), tag.name, tag.descrizione, index)
})
