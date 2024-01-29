import { Transazione } from './transazione.js'
import { draw_chart } from './lineChart.js'
import { update_transazioni_table } from './transazioni_list.js'

Transazione.addObserver(draw_chart)
Transazione.addObserver(update_transazioni_table)

Transazione.update()
