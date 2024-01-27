import { Transazione } from './transazione.js'

/** Restituisce un array di transazioni
* @returns {Transazione[]} Array di transazioni
*/
function getTransazioni() {
	return [
		new Transazione(new Date(2023, 0, 1), 2000, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 1), 20, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 2), 200, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 3), 200, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 4), 200, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 5), -2000, "Alimentari", "Spesa generica 1"),
		new Transazione(new Date(2024, 0, 6), 15.5, "Trasporti", "Spesa generica 2")
	]
}

// Supponiamo che tu abbia un array di oggetti che rappresentano le transazioni
var transazioni = JSON.parse(sessionStorage.getItem("transazioni"));

if (transazioni == null) {
	transazioni = getTransazioni();
	sessionStorage.setItem("transazioni", JSON.stringify(transazioni));
}

// Convert the parsed data back into an array of Transazione objects
transazioni = transazioni.map((obj) =>
	new Transazione(
		new Date(obj.data),
		obj.importo,
		obj.tag,
		obj.descrizione)
)

// Seleziona l'elemento tbody della tua tabella
var tbody = document.querySelector("#transazioniTable tbody")

// Cancella tutte le righe esistenti in tbody
tbody.innerHTML = ''


transazioni.forEach((transazione, index) =>
	tbody.appendChild(transazione.toRow(index))
)

export { getTransazioni }
