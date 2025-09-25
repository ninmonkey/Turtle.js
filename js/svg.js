const svgNS = 'http://www.w3.org/2000/svg'

export class SvgPathBuilder {
    /**
     * @description Builds path strings for SVG <path> `d` attributes
     * @link https://svgwg.org/specs/paths/#PathDataGeneralInformation
     * @LINK https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths
     */
    #steps = []

    constructor() {
        // future: toggle can future minify or expand the path data for human readability
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

export function Create_SvgPathElement(d = '', attributes = {} )  { // , children = []) {
    // const template = `
    // <path
    // fill="none"
    // stroke="pink"
    // d="M 6,10
    //        A 6 4 10 0 0 14,10" />
    // `

    const attr = {
        id           : 'path-n',
        class        : 'svg-path',
        fill         : 'transparent',
        stroke       : 'currentColor',
        strokeWidth  : '1.5%',
        strokeLinecap: 'round',

        d: 'M 6,10 A 6 4 10 0 0 14,10',
        ...attributes
    }
    const pathElem = document.createElementNS(svgNS, 'path')

    Object.entries(attr).forEach( ([key, value]) => {
        pathElem.setAttributeNS(null, key, value)
    })
    /* disabled attrs
        id             = "${ attr.id }"
    */
    const template_path = `
    <path
        class          = "${ attr.class }"
        fill           = "${ attr.fill }"
        stroke         = "${ attr.stroke }"
        stroke-width   = "${ attr.strokeWidth }"
        stroke-linecap = "${ attr.strokeLinecap }"
        d              = "${ attr.d }"
    ></path>
    `

    console.info( 'Create_SvgPathElement', { attr, pathElem  } ) // children })
    return pathElem
    //    ex: <path
    //         id             = 'turtle-path'
    //         class          = 'svg-path'
    //         fill           = 'transparent'
    //         stroke         = 'currentColor'
    //         stroke-width   = '1.5%'
    //         stroke-linecap = 'round'
    //     ></path>

}

export function Create_SvgElement(tag = 'svg', attributes = {}, children = []) {
    /**
     * @description Creates an SVG element with specified attributes and children
     * @returns {SVGElement} New SVG element
     */
    const config = {
        viewBox: "0 0 200 100"
    }
    const rootElem = document.createElementNS(svgNS, tag);

    Object.entries(attributes).forEach(([key, value]) => {
        rootElem.setAttributeNS( null, key, value);
    });

    console.trace( 'exit: Create_SvgElement', { rootElem, tag, attributes, children })

    // children.forEach(child => {
    //     if (typeof child === 'string') {
    //         rootElem.appendChild(document.createTextNode(child));
    //     } else {
    //         rootElem.appendChild(child);
    //     }
    // });

    return rootElem;
}