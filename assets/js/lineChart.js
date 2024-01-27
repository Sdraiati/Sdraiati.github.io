import { Chart } from './chart.js'
import { Transazione } from './transazione.js'
import { getTransazioni } from './transazioni_list.js'

const ms_per_day = 1000 * 60 * 60 * 24

function defaultColor() {
	let newParagraph = document.createElement("p");
	newParagraph.textContent = "This is a new paragraph.";
	document.body.appendChild(newParagraph);
	let computedStyle = window.getComputedStyle(newParagraph);
	return computedStyle.color;
}

/** Restituisce un array di oggetti Transazione
* @returns {Transazione[]} Array di oggetti Transazione
*/
function spese() {
	// Supponiamo che tu abbia un array di oggetti che rappresentano le transazioni
	var transazioni = JSON.parse(sessionStorage.getItem("transazioni"));

	if (transazioni == null) {
		transazioni = getTransazioni();
		sessionStorage.setItem("transazioni", JSON.stringify(transazioni));
	}

	// Convert the parsed data back into an array of Transazione objects
	return transazioni.map((obj) =>
		new Transazione(
			new Date(obj.data),
			obj.importo,
			obj.tag,
			obj.descrizione)
	)
}

let days = 30;

let chart = new Chart('line-chart')
chart.setAxis(0.1, 0.1)
let color = defaultColor()
chart.setLine(color, 1)
chart.setDecorations('grey', 1)

draw_chart(new Date(), new Date(new Date().getTime() - days * ms_per_day))

/** Disegna il grafico
* @param {Date} end - Data di fine
* @param {Date} begin - Data di inizio
*/
function draw_chart(end, begin) {
	let transactions = spese().filter((transazione) => {
		return begin <= transazione.data &&
			transazione.data <= end
	})

	let saldo_attuale = spese().filter((transazione) => {
		return transazione.data < begin
	}).map((transazione) => transazione.importo
	).reduce((acc, importo) => {
		return acc + importo
	}, 0)

	let saldi = []
	saldi.push({ importo: saldo_attuale, data: new Date(begin.getTime() - ms_per_day) })

	// Iterate from the starting date until today
	for (; begin <= end; begin = new Date(begin.getTime() + ms_per_day)) {
		saldo_attuale = saldo_attuale + transactions
			.filter((actual_transaction) => actual_transaction.data.getDate() === begin.getDate())
			.map((actual_transaction) => actual_transaction.importo)
			.reduce((acc, importo) => acc + importo, 0)

		saldi.push({ importo: saldo_attuale, data: begin })

		transactions = transactions.filter((actual_transaction) => actual_transaction.data.getDate() !== begin.getDate())
	}

	let max = saldi.map((saldo) => saldo.importo).reduce((acc, saldo) => {
		return Math.max(acc, saldo)
	}, 0)

	let min = saldi.map((saldo) => saldo.importo).reduce((acc, saldo) => {
		return Math.min(acc, saldo)
	}, 0)

	chart.setMax(max)
	chart.setMin(min)

	drawLineChart(chart, saldi)
	chart.canvas.addEventListener('mousemove', (event) => {
		drawLineChart(chart, saldi)
		chart.hover(saldi, event.clientX)
	})
}

/** Disegna il grafico
	* @param {Chart} chart - Oggetto Chart
	* @param {{importo: number, data: Date}[]} saldi - Array di oggetti che rappresentano i saldi
	*/
function drawLineChart(chart, saldi) {
	let lc_points = saldi.map((saldo, index) => {
		return [index / (saldi.length - 1), (saldo.importo - chart.min) / (chart.max - chart.min)]
	})

	chart.clear()
	chart.drawAxis()
	chart.drawDecorations()
	chart.lines(lc_points)
	saldi.slice(1)
		.map((saldo, index) => saldo.importo - saldi[index].importo)
		.map((importo) => importo / (Math.max(chart.max, -chart.min)))
		.forEach((importo, index) => {
			if (importo < 0) {
				chart.drawRect(lc_points[index + 1][0], -importo, 1 / (saldi.length - 1), 1 / 10, 'red')
			} else {
				chart.drawRect(lc_points[index + 1][0], importo, 1 / (saldi.length - 1), 1 / 10, 'green')
			}
		})
}
