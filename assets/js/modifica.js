// Add a click event listener to the document body
document.body.addEventListener("click", function(event) {
	// Check if the clicked element is a button
	if (event.target.tagName === "BUTTON") {
		// Show an alert with the ID of the clicked button
		let id = event.target.dataset.buttonKind
		console.log(id)
		if (id == null) {
			return
		} else if (id.endsWith("Hide")) {
			id = id.replace("Hide", "")
			var section = document.getElementById(id)
			section.classList.remove("mostra")
			section.classList.add("nascondi")
		} else {
			var section = document.getElementById(id)
			section.classList.remove("nascondi")
			section.classList.add("mostra")
		}
	}
});
