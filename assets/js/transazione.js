var transazioni_observers_fn = []

class Transazione {
	/** Crea un oggetto Transazione
	* @param {Date} data - Oggetto Date che rappresenta la data
	* @param {number} importo - Importo della transazione
	* @param {string} tag - Tag della transazione
	* @param {string} descrizione - Descrizione della transazione
	*/
	constructor(data, importo, tag, descrizione) {
		this.data = data
		this.importo = importo
		this.tag = tag
		this.descrizione = descrizione
	}

	/** Restituisce una riga di una tabella
	* @param {number} index - Indice della transazione
	* @returns {HTMLTableRowElement} Riga della tabella
	*/
	toRow(index) {
		var newRow = document.createElement("tr")
		createCell(newRow, dateToString(this.data))
		createCell(newRow, this.importo.toFixed(2))
		createCell(newRow, this.tag)
		createCell(newRow, this.descrizione)
		createButtonCell(newRow, index)
		return newRow
	}

	/** Restituisce un array di oggetti Transazione
	* @returns {Transazione[]} Array di oggetti Transazione dal server
	*/
	static fetch() {
		return [
			new Transazione(new Date(2023, 0, 1), 200, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 1), 20, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 2), 200, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 3), 200, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 4), 200, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 5), -200, "Alimentari", "Spesa generica 1"),
			new Transazione(new Date(2024, 0, 6), 15.5, "Trasporti", "Spesa generica 2")
		]

		// bisogna riordinare le transazioni per data!!
	}

	/** Restituisce un array di oggetti Transazione
	* @returns {Transazione[]} Array di oggetti Transazione dal server e setta
		* transazioni in sessionStorage
	*/
	static get() {
		// Supponiamo che tu abbia un array di oggetti che rappresentano le transazioni
		let transazioni = JSON.parse(sessionStorage.getItem("transazioni"))

		if (transazioni == null) {
			transazioni = Transazione.fetch()
			sessionStorage.setItem("transazioni", JSON.stringify(transazioni))
			return transazioni
		}

		// Convert the parsed data back into an array of Transazione objects
		let res = transazioni.map((obj) =>
			new Transazione(
				new Date(obj.data),
				obj.importo,
				obj.tag,
				obj.descrizione)
		)

		if (Transazione.tag != null) {
			res = res.filter((transazione) => transazione.tag == Transazione.tag)
		}

		return res
	}

	static setTag(tag) {
		this.tag = tag
		Transazione.update();
	}

	/** Aggiunge un observer alla lista degli observer
	* @param {function} fn - Funzione da aggiungere alla lista degli observer
	*/
	static addObserver(fn) {
		transazioni_observers_fn.push(fn);
	}

	/** Update the observers
	* @param {Transazione[]} transazioni - Array di oggetti Transazione
	*/
	static update() {
		transazioni_observers_fn.forEach((observer_fn) => observer_fn(Transazione.get()));
	}
}

/** Crea una cella di una tabella
* @param {HTMLTableRowElement} row - Riga della tabella
* @param {string} text - Testo della cella
*/
function createCell(row, text) {
	var td = document.createElement("td")
	td.textContent = text
	row.appendChild(td)
}

/** Crea una cella di una tabella con un bottone
* @param {HTMLTableRowElement} row - Riga della tabella
* @param {number} index - Indice della transazione
*/
function createButtonCell(row, index) {
	var td = document.createElement("td")
	var button = document.createElement("button")
	button.textContent = "Modifica"
	button.setAttribute("data-button-kind", "editTransaction")
	button.setAttribute("data-transazione-index", index)
	td.appendChild(button)
	row.appendChild(td)
}

/** Restituisce una stringa che rappresenta la data
* @param {Date} date - Oggetto Date che rappresenta la data
* @returns {string} Stringa che rappresenta la data in formato "GG/MM/YYYY"
*/
function dateToString(date) {
	var giorno = date.getDate()
	var mese = date.getMonth() + 1 // Mese inizia da 0, quindi aggiungiamo 1
	var anno = date.getFullYear()

	// Formatta la data nel formato "GG/MM/YYYY"
	var dataFormattata = (giorno < 10 ? '0' : '') + giorno + '/' + (mese < 10 ? '0' : '') + mese + '/' + anno
	return dataFormattata
}

export { Transazione }
