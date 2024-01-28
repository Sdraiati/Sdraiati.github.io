function update_transazioni_table(transazioni) {
	// Seleziona l'elemento tbody della tua tabella
	var tbody = document.querySelector("#transazioniTable tbody")

	// Cancella tutte le righe esistenti in tbody
	tbody.innerHTML = ''


	transazioni.forEach((transazione, index) =>
		tbody.appendChild(transazione.toRow(index))
	)
}

export { update_transazioni_table }
