export class SvgPathBuilder {
    #steps = []

    constructor() {
        this.clear()
    }

    clear() {
        this.#steps = Array.from( [] )
    }

    build() {
        return this.#steps.join(' ')
    }

    moveTo(x, y) {
        this.#steps.push(`M ${x} ${y}`)
        return this
    }

    lineTo(x, y) {
        this.#steps.push(`L ${x} ${y}`)
        return this
    }

    quadraticCurveTo(cx, cy, x, y) {
        this.#steps.push(`Q ${cx} ${cy} ${x} ${y}`)
        return this
    }

    cubicCurveTo(cx1, cy1, cx2, cy2, x, y) {
        this.#steps.push(`C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`)
        return this
    }

    closePath() {
        this.#steps.push('Z')
        return this
    }
}