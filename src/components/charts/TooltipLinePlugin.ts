import { Plugin } from 'chart.js'

export const TooltipLine: Plugin = {
	id: 'tooltipLine',
	beforeDraw: (chart: any) => {
		if (chart.tooltip._active && chart.tooltip._active.length) {
			const ctx = chart.ctx
			ctx.save()
			const activePoint = chart.tooltip._active[0]
			ctx.beginPath()
			ctx.setLineDash([5, 7])
			ctx.moveTo(activePoint.element.x, chart.chartArea.bottom)
			ctx.lineTo(activePoint.element.x, activePoint.element.y - 60)
			ctx.lineWidth = 1
			ctx.strokeStyle = '#F13ABC'
			ctx.stroke()
			ctx.restore()
		}
	}
}
