import { Transazione } from './transazione.js'

function update_transazioni_table(transazioni) {
	// Seleziona l'elemento tbody della tua tabella
	let tbody = document.querySelector("#transazioniTable tbody")

	// Cancella tutte le righe esistenti in tbody
	tbody.innerHTML = ''

	transazioni.forEach((transazione) =>
		tbody.appendChild(transazione.toRow())
	)
}

let dataList = document.getElementById("tags-datalist")
// Append options to dataList
Transazione.get()
let tags = JSON.parse(sessionStorage.getItem("transazioni")).map(t => t.tag)
tags = tags.filter((value, index, self) => self.indexOf(value) === index)
	.forEach(tag => {
		let option = document.createElement('option')
		option.value = tag;
		dataList.appendChild(option);
	})

export { update_transazioni_table }

let selected_transaction = null

// update selected_transaction when a button is clicked
document.body.addEventListener("click", function(event) {
	// Check if the clicked element is a button
	if (event.target.tagName === "BUTTON" && event.target.dataset.transazioneIndex != null) {
		selected_transaction = event.target.dataset.transazioneIndex

		let transazione = JSON.parse(sessionStorage.getItem("transazioni"))
			.map(t => new Transazione(t.id, new Date(t.data), t.importo, t.tag, t.descrizione))
			.filter(t => t.id == selected_transaction)[0]

		document.getElementById('editData').value = dateToString(transazione.data)
		document.getElementById('editCosto').value = transazione.importo
		document.getElementById('editTag').value = transazione.tag
		document.getElementById('editDescrizione').value = transazione.descrizione
	}
});

document.getElementById('newTransactionForm').addEventListener('submit', function(event) {
	event.preventDefault(); // Previeni il comportamento predefinito del form (inviare i dati)

	// Ottieni i valori dai campi del form
	let data = document.getElementById('newData').value;
	let importo = parseFloat(document.getElementById('newImporto').value);
	let tag = document.getElementById('newTag').value;
	let descrizione = document.getElementById('newDescrizione').value;

	// post('/api/newTransaction', { data, importo, tag, descrizione
	// }).then((response) => {
	// Transazione.fetch();
	// Transazione.update();
	// }).catch((error) => { console.log(error) })

	// {
	let transazioni = JSON.parse(sessionStorage.getItem("transazioni")).map(t =>
		new Transazione(
			t.id,
			new Date(t.data),
			t.importo,
			t.tag,
			t.descrizione)
	)

	let index = transazioni.map(t => t.id).reduce((a, b) => Math.max(a, b)) + 1
	let transazione = new Transazione(index, new Date(data), importo, tag, descrizione)

	transazioni.push(transazione)
	sessionStorage.setItem("transazioni", JSON.stringify(transazioni))
	Transazione.update();
	// }
	Transazione.fetch();

	this.reset();

	document.getElementById('newTransaction').classList.remove('allert');
	document.getElementById('newTransaction').classList.add('hidden');
});

// Event handler per il form di Modifica Transazione
document.getElementById('editTransactionForm').addEventListener('submit', function(event) {
	event.preventDefault(); // Previeni il comportamento predefinito del form (inviare i dati)

	// Ottieni i valori dai campi del form
	let data = document.getElementById('editData').value;
	let costo = document.getElementById('editCosto').value;
	let tag = document.getElementById('editTag').value;
	let descrizione = document.getElementById('editDescrizione').value;

	let body = {}
	if (data !== null) {
		body.data = data
	}
	if (costo !== null) {
		body.costo = costo
	}
	if (tag !== null) {
		body.tag = tag
	}
	if (descrizione !== null) {
		body.descrizione = descrizione
	}

	// post('/api/editTransaction', { id: selected_transaction, data, costo, tag, descrizione })
	// .then((response) => {
	// Transazione.fetch();
	// Transazione.update();
	// }).catch((error) => { console.log(error) })

	// {
	console.log(body)
	let transazioni = JSON.parse(sessionStorage.getItem("transazioni")).map(t =>
		new Transazione(
			t.id,
			new Date(t.data),
			t.importo,
			t.tag,
			t.descrizione)
	)

	transazioni[selected_transaction - 1].data = new Date(body.data)
	transazioni[selected_transaction - 1].importo = parseFloat(body.costo)
	transazioni[selected_transaction - 1].tag = body.tag
	transazioni[selected_transaction - 1].descrizione = body.descrizione

	console.log(transazioni[selected_transaction - 1])
	sessionStorage.setItem("transazioni", JSON.stringify(transazioni))
	Transazione.update();
	// }
	Transazione.fetch();

	// Resetta il form
	this.reset();

	// Nascondi il form
	document.getElementById('editTransaction').classList.remove('allert');
	document.getElementById('editTransaction').classList.add('hidden');
});

// Event handler per il pulsante "Elimina Transazione" del form di Modifica Transazione
document.getElementById('deleteTransazioneButton').addEventListener('click', function() {
	// post('/api/deleteTransazione', { id: selected_transaction })
	Transazione.fetch();

	// Nascondi il form
	document.getElementById('editTransaction').classList.remove('allert');
	document.getElementById('editTransaction').classList.add('hidden');
});

function dateToString(date) {
	let giorno = date.getDate()
	let mese = date.getMonth() + 1 // Mese inizia da 0, quindi aggiungiamo 1
	let anno = date.getFullYear()

	// Formatta la data nel formato "GG/MM/YYYY"
	let dataFormattata = anno + '-' + (mese < 10 ? '0' : '') + mese + '-' + (giorno < 10 ? '0' : '') + giorno
	return dataFormattata
}
