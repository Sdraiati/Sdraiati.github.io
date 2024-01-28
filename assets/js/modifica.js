// Add a click event listener to the document body
document.body.addEventListener("click", function(event) {
	// Check if the clicked element is a button
	if (event.target.tagName === "BUTTON") {
		// Show an alert with the ID of the clicked button
		let id = event.target.dataset.buttonKind
		if (id == null) {
			return
		} else if (id.endsWith("Hide")) {
			id = id.replace("Hide", "")
			var section = document.getElementById(id)
			section.classList.remove("allert")
			section.classList.add("hidden")
		} else {
			var section = document.getElementById(id)
			section.classList.remove("hidden")
			section.classList.add("allert")
		}
	}
});
