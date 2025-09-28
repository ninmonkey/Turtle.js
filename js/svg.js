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
        this.#steps.push(`m ${x} ${y}`)
        return this
    }
    moveToGlobal(x, y) {
        this.#steps.push(`M ${x} ${y}`)
        return this
    }

    lineTo(x, y) {
        this.#steps.push(`l ${x} ${y}`)
        return this
    }
    lineToGlobal(x, y) {
        this.#steps.push(`L ${x} ${y}`)
        return this
    }

    quadraticCurveTo(cx, cy, x, y) {
        this.#steps.push(`q ${cx} ${cy} ${x} ${y}`)
        return this
    }
    quadraticCurveToGlobal(cx, cy, x, y) {
        this.#steps.push(`Q ${cx} ${cy} ${x} ${y}`)
        return this
    }

    cubicCurveTo(cx1, cy1, cx2, cy2, x, y) {
        this.#steps.push(`c ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`)
        return this
    }
    cubicCurveToGlobal(cx1, cy1, cx2, cy2, x, y) {
        this.#steps.push(`C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`)
        return this
    }

    closePath() {
        this.#steps.push('Z')
        return this
    }
}

export function Create_SvgPathElement(attributes = {} )  { // , children = []) {
    const attr = {
        // id           : 'path-n',
        class        : 'svg-path',
        fill         : 'hsl( 200 50% 50% / .5)', // currentColor/transparent
        stroke       : 'currentColor',
        'stroke-width'  : '1.5%',
        'stroke-Linecap': 'round',
        ...attributes,
    }

    const pathElem = document.createElementNS(svgNS, 'path') // must this be created on parent of svg type ?

    Object.entries(attr).forEach( ([key, value]) => {
        pathElem.setAttributeNS(null, key, value)
    })
    return pathElem
}

export function Create_SvgElement(tag = 'svg', attributes = {}, children = []) {
    /**
     * @description Creates an `<svg>` element with specified attributes and children
     * @param {string} tag Tag name, default 'svg'
     * @returns {SVGElement} New SVG Element
     */
    const attr = {
        viewBox: "0 0 100 100",
        ...attributes,
    }
    const rootElem = document.createElementNS(svgNS, tag);

    Object.entries(attr).forEach(([key, value]) => {
        rootElem.setAttributeNS( null, key, value);
    });
    // console.trace( 'Create_SvgElement', { rootElem, tag, attributes, children })
    for (const child of children ) {
        rootElem.appendChild( child )
    }
    return rootElem;
}

export function CreateSvgContainerWithTooltip( options = {}, svgPathAttributes = {}, svgRootAttributes = {}  ) {
    const config = {
        title: 'no title',
        id: 'svg-container-with-tooltip',
        path: null,
        // parentElement: document.querySelector( ".parent-context" ),
        ...options,
    }
    const path_attr = {
        // stroke: 'blue',
        ...svgPathAttributes,
    }
    const svgRoot_attr = {
        ...svgRootAttributes,
    }

    config.parentElement = document.querySelector( ".parent-context" )

    const elem_root = document.createElement( 'div' )

    if( config.path == null ) {
        throw new Error('no path provided!')
        console.warn('no path provided, creating a default')
        const defaultPath = new SvgPathBuilder()
            .moveTo( 0, 0 ).lineTo( 10, 0 )
        config.path = defaultPath
    }

    if( config.path instanceof SvgPathBuilder === false ) {
        throw new TypeError( 'path must be an instance of SvgPathBuilder' )
    }
    const renderSvg = newSvgElement({
        path: config.path, title: '🦍 ' +  config.title,
    }, path_attr, svgRoot_attr )

    config.parentElement.appendChild( renderSvg )
    return elem_root
}

export function newSvgElement( options  = {}, svgPathAttributes = {}, svgRootAttributes = {} ) {
    const config = {
        title: '',
        path: null, // new SvgPathBuilder(),
        stroke: null,
        ...options,
    }
    const path_attr = {
        // stroke: 'red',
        ...svgPathAttributes,
    }
    const svgRoot_attr = {
        ...svgRootAttributes,
    }

    const wrapper_div = document.createElement( 'section' )
    wrapper_div.classList.add('svg-wrapper')

    const svgElem = Create_SvgElement(
        'svg',  {
        id     : 'turtle-svg-n',
        class  : 'svg-root',
        viewBox: '-10 -10 50 50',
        ...svgRoot_attr,
        // width  : '200px',
        // height : '200px',
    })

    const pathElem = Create_SvgPathElement({
        id            : 'turtle-path-n',
        class         : 'svg-path',
        d             : config.path.build(),
        fill          : 'hsl( 200 50% 50% / .5)',
        stroke        : 'hsl( 180 70% 50% / .75)', // currentColor
        'stroke-width': '2.5%',
        ...path_attr,

    })

    const titleElem = document.createElement('div')

    titleElem.classList.add('svg-title')
    titleElem.textContent = config.title

    wrapper_div.appendChild( titleElem )

    svgElem.appendChild( pathElem )
    wrapper_div.appendChild( svgElem )

    return wrapper_div
}