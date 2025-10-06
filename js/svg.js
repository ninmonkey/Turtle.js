const svgNS = 'http://www.w3.org/2000/svg'

export class SvgPathBuilder {
    /**
     * @description Builds path strings for SVG <path> `d` attributes
     * @link https://svgwg.org/specs/paths/#PathDataGeneralInformation
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths
     */
    #steps = []
    #pathAttrs = { // for the `<oath>` element
        // stroke: "black",
        // fill: "green",
        // 'stroke-width': `2.5%`,
        // 'fill-opacity': `0.5`,
    }
    #config = {
        AppendNewline: true, // path[d] includes whitespace. Easier for humans to read.
    }
    #suffix = `\n`
    static RegisteredFunctions = {}

    constructor() {
        this.#suffix = this.#config.AppendNewline ? `\n` : ``
        this.clear()
    }

    addPathString ( pathString ) {
        /**
         * @description Adds a raw path string to the steps
         * @param {string} pathString Raw SVG path string, e.g. "M 10 10 L 20 20"
         * @example
         * const path = new SvgPathBuilder().addPathString("M 10 10 L 20 20")
         * @returns {SvgPathBuilder} this
         */
        this.#steps.push( pathString )
        return this
    }

    clear () {
        this.#steps = Array.from( [] )
        this.move( 0, 0 ) // relative move prevents errors when missing the M/m prefix
    }

    buildPathString () {
        /**
         * @description Builds and returns the SVG pathdata string
         * @returns {string} SVG path data string
         * @example
         * path.buildPathString() // "M 10 10 L 20 20"
         */
        return this.#steps.join( ' ' )
    }

    createPathElement ( attributes = {} ) {
        /**
         * @description Creates an SVG <path> element with the built path data and given attributes
         * @param {Object} attributes Attributes to apply to the path element
         * @returns {SVGPathElement} New SVG Path Element
         * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/path
         * @example
         * const pathElem = path.createPathElement({ stroke: 'red', 'stroke-width': 2 })
         */
        const pathElem = CreateElement_Path( {
            // id: 'turtle-path-n',
            // class: 'svg-path',
            /* moved default styles to style elem */
            // fill          : 'hsl( 200 50% 50% / .5)',
            // stroke        : 'hsl( 180 70% 50% / .75)', // currentColor
            // 'stroke-width': '2.5%',
            ...attributes,
            ...this.#pathAttrs,
            d: this.buildPathString(),

        } )
        return pathElem
    }

    stroke( color ) {
        this.#pathAttrs.stroke = color
        return this
    }
    fill( color ) {
        this.#pathAttrs.fill = color
        return this
    }
    get pathAttrs() { return this.#pathAttrs }


    moveAbsolute ( x, y ) {
        this.#steps.push( `M ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    move ( x, y ) {
        this.#steps.push( `m ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    M ( x, y ) { return this.moveAbsolute( x, y ) }
    m ( x, y ) { return this.move( x, y ) }

    lineAbsolute ( x, y ) {
        this.#steps.push( `L ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    line ( x, y ) {
        this.#steps.push( `l ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    L ( x, y ) { return this.lineAbsolute( x, y ) }
    l ( x, y ) { return this.line( x, y ) }

    horizontalAbsolute ( x ) {
        this.#steps.push( `H ${ x }${ this.#suffix }` )
        return this
    }
    horizontal ( x ) {
        this.#steps.push( `h ${ x }${ this.#suffix }` )
        return this
    }
    verticalAbsolute ( y ) {
        this.#steps.push( `V ${ y }${ this.#suffix }` )
        return this
    }
    vertical ( y ) {
        this.#steps.push( `v ${ y }${ this.#suffix }` )
        return this
    }
    H ( x ) { return this.horizontalAbsolute( x ) }
    h ( x ) { return this.horizontal( x ) }
    V ( y ) { return this.verticalAbsolute( y ) }
    v ( y ) { return this.vertical( y ) }

    quadraticCurveTo ( cx, cy, x, y ) {
        this.#steps.push( `q ${ cx } ${ cy } ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    quadraticCurveToGlobal ( cx, cy, x, y ) {
        this.#steps.push( `Q ${ cx } ${ cy } ${ x } ${ y }${ this.#suffix }` )
        return this
    }

    cubicCurveTo ( cx1, cy1, cx2, cy2, x, y ) {
        this.#steps.push( `c ${ cx1 } ${ cy1 } ${ cx2 } ${ cy2 } ${ x } ${ y }${ this.#suffix }` )
        return this
    }
    cubicCurveToGlobal ( cx1, cy1, cx2, cy2, x, y ) {
        this.#steps.push( `C ${ cx1 } ${ cy1 } ${ cx2 } ${ cy2 } ${ x } ${ y }${ this.#suffix }` )
        return this
    }

    closePath () {
        this.#steps.push( 'Z' )
        return this
    }

    applyFunc ( fn, ...fnArgs ) {
        /**
         * @description Calls the provided function with the current SvgPathBuilder instance
         * @param {Function} fn Function to call with this SvgPathBuilder instance
         * @returns {SvgPathBuilder} this
         */

        let result
        if( typeof fn === 'string' ) {
            result = SvgPathBuilder.RegisteredFunctions[ fn.toLowerCase() ].call(this, ...fnArgs)
        }
        else {
            result = fn.call(this, fnArgs)
        }

        if ( result instanceof SvgPathBuilder === false ) {
            // console.warn( { result, fn, this } )
            throw new TypeError( `'.applyFunc()' did not return an instance of SvgPathBuilder!` )
        }
        // console.info('🦍 applyFunc() result', result )
        return result
    }

    static registerFunc ( name, fn ) {
        /**
         * @description Registers a function with the SvgPathBuilder class
         * @param {string} name Name of the function
         * @param {Function} fn Function to register
         */
        SvgPathBuilder.RegisteredFunctions[ name.toLowerCase() ] = fn
    }
}

export function CreateElement_Path ( attributes = {} ) { // , children = []) {
    /**
     * @description create a single SVG <path> element with styles and attributes
     * @param {Object} attributes Attributes to apply to the path element
     * @returns {SVGPathElement} New SVG Path Element
     * @link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/path
     * @summary
     * valid content:
     * - BasicShapes: <circle>, <ellipse>, <line>, <polygon>, <polyline>, <rect>
     * - Descriptive Elements: <desc>, <metadata>, <title>
     */
    const attr = {
        // id           : 'path-n',
        class: 'svg-path',
        fill: 'hsl( 200 50% 50% / .5)', // currentColor/transparent
        stroke: 'currentColor',
        'stroke-width': '1.5%',
        'stroke-linecap': 'round',
        ...attributes,
    }

    const pathElem = document.createElementNS( svgNS, 'path' ) // must this be created on parent of svg type ?

    Object.entries( attr ).forEach( ( [ key, value ] ) => {
        pathElem.setAttributeNS( null, key, value )
    } )
    return pathElem
}

export function CreateElement_Svg ( tag = 'svg', attributes = {}, children = [] ) {
    /**
     * @description Creates an `<svg>` element with specified Namespace, attributes and children. top level has namespace.
     * @param {string} tag Tag name, default 'svg'
     * @returns {SVGElement} New SVG Element
     */
    const attr = {
        viewBox: "0 0 100 100",
        // xmlns: "http://www.w3.org/2000/svg",
        ...attributes,
    }
    const rootElem = document.createElementNS( svgNS, tag );

    Object.entries( attr ).forEach( ( [ key, value ] ) => {
        rootElem.setAttributeNS( null, key, value );
    } );
    // console.trace( 'Create_SvgElement', { rootElem, tag, attributes, children })
    for ( const child of children ) {
        rootElem.appendChild( child )
    }
    return rootElem;
}

export function CreateSvgContainerWithTooltip ( options = {}, svgPathAttributes = {}, svgRootAttributes = {} ) {
    /**
     * @description Wraps an SVG in a grid cell with shadows and tooltips that view the svg's sourcecode
     * @param {Object} options Configuration options
     * @param {string} options.title Title text for the tooltip
     * @param {SvgPathBuilder} options.path A single `SvgPathBuilder` instance, or as an array
     * @param {HTMLElement} options.parentElement The parent element to append the SVG container to
     * @param {Object} svgPathAttributes Attributes to apply to the SVG <path> element
     * @param {Object} svgRootAttributes Attributes to apply to the SVG <svg> root element
     * @returns {HTMLElement} The root div containing the SVG and tooltip
     */
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
        viewBox: '0 0 10 10',
        // width: '200px',
        // height: '200px',
        ...svgRootAttributes,
    }

    config.parentElement = document.querySelector( ".parent-context" )

    const elem_root = document.createElement( 'div' )

    if ( config.path == null ) {
        throw new Error( 'no path provided!' )
    }
    if( Array.isArray( config.path ) ) {
        // if( config.path.length === 0 ) {
        throw new Error( 'WIP: Handle array of <path>' )
        // }
    }
    if ( config.path instanceof SvgPathBuilder === false ) {
        throw new TypeError( 'path must be an instance of SvgPathBuilder' )
    }
    const renderSvg = CreateElement_Svg_WithStyle( {
        path: config.path, title: config.title,
    }, path_attr, svgRoot_attr )

    config.parentElement.appendChild( renderSvg )
    return elem_root
}

export function CreateElement_Svg_WithStyle ( options = {}, svgPathAttributes = {}, svgRootAttributes = {} ) {
    /**
     * @description used by `CreateSvgContainerWithTooltip` to create a top level container <svg> element
     * @param {Object} options Configuration options
     * @param {SvgPathBuilder} options.path An instance of SvgPathBuilder
     * @param {string} options.title Title text for the tooltip
     * @param {Object} svgPathAttributes Attributes to apply to the <path> element
     * @param {Object} svgRootAttributes Attributes to apply to the <svg> root element
     * @param {string} options.stroke `stroke` for the root level `<style>` element
     * @param {string} options.fill `fill` for the root level `<style>` element
     * @param {string} svgRootAttributes.viewBox The `viewBox` attribute for the `<svg>` root element
     * @param {string} svgRootAttributes.width The `width` attribute for the `<svg>` root element
     * @param {string} svgRootAttributes.height The `height` attribute for the `<svg>` root element
     * @param {string} svgRootAttributes.class The `class` attribute for the `<svg>` root element
     * @returns {HTMLElement} The root div containing the SVG and tooltip
     */
    const config = {
        title: '',
        path: null,
        // 'stroke-width': `1.5%`,
        // fill: 'hsl( 200 50% 50% / .75)',
        ...options,
    }
    const path_attr = {
        // stroke: 'red',
        ...svgPathAttributes,
    }
    const svgRoot_attr = {
        ...svgRootAttributes,
    }

    if ( config.path == null ) {
        throw new Error( 'no path provided!' )
    }
    if( Array.isArray( config.path ) ) {
        // if( config.path.length === 0 ) {
        throw new Error( 'WIP: Handle array of <path>' )
        // }
    }

    if ( config.path === null ) {
        throw new Error( 'no path provided!', { cause: { options, svgPathAttributes, svgRootAttributes } } )
    }

    const section_div = document.createElement( 'section' )
    section_div.classList.add( 'svg-wrapper' )

    const svgElem = CreateElement_Svg(
        'svg', {
        // id: 'turtle-svg-n',
        class: 'svg-root',
        viewBox: '0 0 100 100',
        // viewBox: '-10 -10 50 50',
        // width  : '100px',
        // height : '100px',
        ...svgRoot_attr,
    } )

    const rootStyleElem = document.createElement( 'style' )
    // miter | miter-clip | round | bevel | arcs // stroke-linecap: 'arcs';

    /*
    warning: styles for <path> will have higher cascade than attributes for fill on <path> itself.

    declare top level style if defined, else omit fields
    */
    const rootCssTemplate = `
    path {
        ${ config.fill ? `fill: ${ config.fill };` : `` }
        ${ config.stroke ? `stroke: ${ config.stroke };` : `` }
        ${ config[ 'stroke-width' ] ? `stroke-width: ${ config[ 'stroke-width' ] };` : `` }
    }
    `
    rootStyleElem.textContent = rootCssTemplate
    const pathParams = {
            // fill          : 'hsl( 200 50% 50% / .5)',
            // id: 'turtle-path-n',
            // d: config.path.buildPathString(),
            'class': 'svg-path',
            ...path_attr,
            ...config.path.pathAttrs,

    }
    const pathElem = config.path.createPathElement( pathParams)

    const titleElem = document.createElement( 'div' )

    titleElem.classList.add( 'svg-title' )
    titleElem.textContent = config.title

    section_div.appendChild( titleElem )

    svgElem.appendChild( rootStyleElem )
    svgElem.appendChild( pathElem )

    section_div.appendChild( svgElem )


    return section_div
}

// register shared handlers
SvgPathBuilder.registerFunc( 'rect', function (width, height) {
    this
        .l( width, 0 )
        .l( 0, height )
        .l( -width, 0 )
        .l( 0, -height )
    return this
} )

SvgPathBuilder.registerFunc( 'square', function (size) {
    this.applyFunc( 'rect', size, size )
    return this
} )

 SvgPathBuilder.registerFunc( 'grid', function (rows, cols, size, paddingSize) {
    const padding = (paddingSize ?? 0) * .7
    let cur_padX = 0
    for( let y = 0; y < rows; y++ ) {
        if(cur_padX > 0 ) {
            this.m( -cur_padX, 0 )
            this.m( 0,  size + padding )
            cur_padX = 0
        }
        for( let x = 0; x < cols; x++ ) {
            this.applyFunc( 'square', size )
            this.m( size + padding, 0 )
            cur_padX += size + padding
        }
    }
    return this
} )