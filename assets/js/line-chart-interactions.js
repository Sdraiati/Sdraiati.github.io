import { setPeriod, nextPeriod, getPeriod } from './lineChart.js';
import { Transazione } from './transazione.js';

document.getElementById("transazioni-successive").disabled = true
document.getElementById("transazioni-periodo-1-mese").disabled = true

function update_period(int) {
	setPeriod(int)
	document.getElementById("transazioni-precedenti").disabled = false
	document.getElementById("transazioni-periodo-1-mese").disabled = false
	document.getElementById("transazioni-periodo-6-mesi").disabled = false
	document.getElementById("transazioni-periodo-1-anno").disabled = false
}

document.getElementById("transazioni-precedenti").addEventListener("click", function() {
	nextPeriod(false)
	if (Transazione.get().filter((transazione) => transazione.data < getPeriod().begin).length == 0)
		document.getElementById("transazioni-precedenti").disabled = true
	document.getElementById("transazioni-successive").disabled = false
})

document.getElementById("transazioni-periodo-1-mese").addEventListener("click", function() {
	update_period(30)
	document.getElementById("transazioni-periodo-1-mese").disabled = true
})

document.getElementById("transazioni-periodo-6-mesi").addEventListener("click", function() {
	update_period(180)
	document.getElementById("transazioni-periodo-6-mesi").disabled = true
})

document.getElementById("transazioni-periodo-1-anno").addEventListener("click", function() {
	update_period(365)
	document.getElementById("transazioni-periodo-1-anno").disabled = true
})

document.getElementById("transazioni-successive").addEventListener("click", function() {
	nextPeriod(true)
	if (new Date() <= getPeriod().end) {
		document.getElementById("transazioni-successive").disabled = true
	}
	document.getElementById("transazioni-precedenti").disabled = false
})
