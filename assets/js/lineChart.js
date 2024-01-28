import { Chart } from './chart.js'
import { Transazione } from './transazione.js'

const ms_per_day = 1000 * 60 * 60 * 24
var END = new Date()
var BEGIN = new Date(END.getTime() - 30 * ms_per_day)

let chart = new Chart('line-chart')

/** Cambia il periodo di visualizzazione
* @param {number} days - Numero di giorni da visualizzare
*/
function setPeriod(days) {
	BEGIN = new Date(END.getTime() - days * ms_per_day)
	Transazione.update()
}

/** Cambia la data di fine
* @param {Date} end - Data di fine
*/
function setEnd(end) {
	END = end
	Transazione.update()
}

/** Disegna il grafico
* @param {Transazione[]} transazioni - Array di transazioni
*/
function draw_chart(transazioni) {
	let transactions = transazioni.filter((transazione) => {
		return BEGIN <= transazione.data &&
			transazione.data <= END
	})

	let saldo_attuale = transazioni.filter((transazione) => {
		return transazione.data < BEGIN
	}).map((transazione) => transazione.importo
	).reduce((acc, importo) => {
		return acc + importo
	}, 0)

	let saldi = []
	saldi.push({ importo: saldo_attuale, data: new Date(BEGIN.getTime() - ms_per_day) })

	// Iterate from the starting date until today
	for (let begin = new Date(BEGIN); begin <= END; begin = new Date(begin.getTime() + ms_per_day)) {
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

	chart.setMaxMin(max, min)

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

	let importi = saldi.slice(1).map((saldo) => saldo.importo)
		.map((importo, index) => importo - saldi[index].importo)

	let max_importo = importi.reduce((acc, importo) => Math.max(acc, Math.abs(importo)), 0)

	chart.clear()
	chart.drawAxis()
	chart.drawDecorations()
	chart.lines(lc_points, [], chart.line.color, chart.line.width)
	importi
		.map((importo) => importo / max_importo)
		.forEach((importo, index) => {
			if (importo < 0) {
				chart.drawRect(lc_points[index + 1][0], -importo, 1 / (saldi.length - 1), 1 / 10, 'red')
			} else {
				chart.drawRect(lc_points[index + 1][0], importo, 1 / (saldi.length - 1), 1 / 10, 'green')
			}
		})
}

export { setPeriod, setEnd, draw_chart }
