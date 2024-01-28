import { Transazione } from './transazione.js'

class Chart {
	constructor(id) {
		this.canvas = document.getElementById(id)
		this.ctx = this.canvas.getContext('2d')
		this.setup()

	}

	setup() {
		console.log(this.canvas)
		// Get the CSS-computed width and height of the canvas
		this.devicePixelRatio = window.devicePixelRatio || 1
		const computedStyle = getComputedStyle(this.canvas);
		const cssWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
		const cssHeight = parseInt(computedStyle.getPropertyValue('height'), 10);
		this.axis = {
			x: parseFloat(computedStyle.getPropertyValue('--axisX')),
			y: parseFloat(computedStyle.getPropertyValue('--axisY')),
		}

		this.line = {
			color: computedStyle.getPropertyValue('--lineColor'),
			width: computedStyle.getPropertyValue('--lineWidth'),
		}

		this.decorations = {
			color: computedStyle.getPropertyValue('--decorationColor'),
			width: computedStyle.getPropertyValue('--decorationWidth'),
		}

		this.fontSize = computedStyle.getPropertyValue('--fontSize') * this.canvas.width / (100 * this.devicePixelRatio)



		// improve the pixel ratio
		this.canvas.width = Math.floor(cssWidth * this.devicePixelRatio)
		this.canvas.height = Math.floor(cssHeight * this.devicePixelRatio)
	}

	/** Set the color and width of the line
	* @param {string} color - color of the line
	* @param {number} width - width of the line
	*/
	setLine(color, width) {
		this.line.color = color
		this.line.width = width
	}

	/** Set the color and width of the decorations
	* @param {string} color - color of the decorations
	* @param {number} width - width of the decorations
	*/
	setDecorations(color, width) {
		this.decorations.color = color
		this.decorations.width = width
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	setAxis(x, y) {
		this.axis = {
			x: x,
			y: y
		}
	}

	x(x) {
		return (this.canvas.width - 2 * this.axis.x * this.canvas.width) * x + this.axis.x * this.canvas.width
	}

	y(y) {
		return (this.canvas.height - 2 * this.axis.y * this.canvas.height) * (1 - y) + this.axis.y * this.canvas.height
	}

	/**
	* # draw the lines between the points
	* @param {array} points - array of points [[x, y], [x, y], ...]
	* @param {array} dash - array of dash [5, 5] for dashed lines
	* @param {string} color - color of the line
	* @param {number} width - width of the line
	*/
	lines(points, dash = [], color = this.line.color, width = 1) {
		console.log(points)
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width

		points = points.map((point) => {
			return [this.x(point[0]), this.y(point[1])]
		})

		this.ctx.setLineDash(dash)
		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])

		points.forEach((point) => {
			this.ctx.lineTo(point[0], point[1])
		})
		this.ctx.stroke()
		this.ctx.setLineDash([])
	}

	// write text
	text(text, x, y, color = 'black', padding = 5, font = 'Arial') {
		this.ctx.fillStyle = color
		this.ctx.font = `${this.fontSize}em ${font}`

		if (typeof text === 'number') {
			// bug fix
			text = Math.round(text * 100) / 100
		}

		this.ctx.fillText(text, this.x(x) + padding, this.y(y) - padding)
	}

	// draw grid
	drawAxis(xLegend = '', yLegend = '') {
		let x = [[0, 0], [1, 0]]
		let y = [[0, 0], [0, 1]]

		this.lines(x, [], this.line.color, this.line.color)
		this.lines(y, [], this.line.color, this.line.width)

		this.text(xLegend, 1, 0, this.line.color, 12)
		this.text(yLegend, 0, 1, this.line.color, 12)
	}

	setMax(max) {
		this.max = max
	}

	setMin(min) {
		this.min = min
	}

	// LineChart

	/**
		* # draw the decorations
		* @param {array number} yHeights - array of y heights
		*/
	drawDecorations() {
		let yHeights = [1, 2 / 3, 1 / 3]

		yHeights.forEach((height) => {
			let y = [[0, height], [1, height]]
			this.lines(y, [], this.decorations.color, this.decorations.width)
		});

		if (this.min >= 0) {
			yHeights.forEach((height) => {
				this.text(Math.floor(this.max * height), 0, height, this.decorations.color)
			})
		} else {
			yHeights.forEach((height) => {
				this.text(Math.floor((this.max - this.min) * height + this.min), 0, height, this.decorations.color)
			})

			const zero = -this.min / (this.max - this.min)
			this.lines([[0, zero], [1, zero]], [], this.decorations.color, this.decorations.width)
			this.text(0, 0, zero, 'red')

			this.text(this.min, 0, 0, this.decorations.color)
		}
	}

	/**
		* # draw the mouse hover
		* @param {Transazione[]} points - array of Transazione
		* @param {number} mouseX - x coordinate of the mouse
	*/
	hover(transazioni, mouseX) {
		const rect = this.canvas.getBoundingClientRect()
		mouseX = (mouseX - rect.left) - this.axis.x * this.canvas.width / this.devicePixelRatio
		mouseX /= (1 - 2 * this.axis.x) * this.canvas.width / this.devicePixelRatio

		// if the mouse is outside the canvas, do nothing
		if (mouseX < 0 || mouseX > 1) {
			return
		}

		let points = transazioni.map((_, index) => index / (transazioni.length - 1))
		let index = nearestPoint(points, mouseX)
		let x = index / (transazioni.length - 1)
		let y = (transazioni[index].importo - this.min) / (this.max - this.min)
		let dashedPoints =
			[
				[x, 0],
				[x, y],
				[0, y]
			]

		this.lines(dashedPoints, [5, 5], this.decorations.color, this.decorations.width)
		let y_text = transazioni[index].importo.toFixed(0)
		let date = transazioni[index].data.toLocaleDateString()


		this.text(`${y_text}`, 0 - this.axis.x, y, this.decorations.color)
		this.text(`${date}`, x, 0 - this.axis.y, this.decorations.color)
	}

	// BarChart

	drawRect(x, y, width, height, color) {
		y = y * height
		// Y = (1 - y + 2 * this.axis.y * y - this.axis.y) * this.canvas.height
		// Y / this.canvas.height = (1 - y + 2 * this.axis.y * y - this.axis.y)
		height = y * (1 - 2 * this.axis.y) * this.canvas.height
		x -= 2 / 5 * width
		width *= 4 / 5
		width = width * (1 - 2 * this.axis.x) * this.canvas.width

		this.ctx.fillStyle = color
		this.ctx.fillRect(this.x(x), this.y(y), width, height)
	}
}

/**
	* # find the nearest point to the mouse
	* @param {array} points - array of points [x_1, x_2, ...]
	* @param {number} mouseX - x in [0,1], coordinate of the mouse
*/
function nearestPoint(points, mouseX) {
	let distances = points.map((point) => {
		return Math.abs(point - mouseX)
	})
	let index = distances.findIndex((element) => element === Math.min(...distances))
	return index
}

export { Chart }
