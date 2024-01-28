import { Transazione } from "./transazione.js"

// Append the radio button and its label as children of the form
function add_radio(parent, tag_name) {
	let radio = document.createElement("input")
	radio.type = "radio"
	radio.id = tag_name
	radio.name = "tag"
	radio.value = tag_name

	let label = document.createElement("label")
	label.htmlFor = tag_name
	label.textContent = tag_name

	parent.appendChild(radio)
	parent.appendChild(label)
}

// Add the radio buttons for each tag
let tags = Transazione.get().map((t) => t.tag)
tags = [...new Set(tags)]

let form = document.getElementById("tag_sidebar")

tags.forEach((tag) => add_radio(form, tag))


// Add the event listener to the form
let prev = null
form.addEventListener("click", (event) => {
	if (event.target.type != "radio") return
	else if (prev == null) {
		prev = event.target
		Transazione.setTag(event.target.value)
	} else if (prev == event.target) {
		Transazione.setTag(null)
		prev = null
		event.target.checked = false
	} else {
		Transazione.setTag(event.target.value)
		prev = event.target
		return
	}
})
