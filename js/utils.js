export function elementFromIdOrValue ( idOrElement, rootElement = document ) {
    /**
     * @description Resolves name or elements, or css selector query to element[s]
     */

    if ( typeof idOrElement === "string" ) {
        let found = rootElement.getElementById( idOrElement );
        if ( found !== null ) { return found }

        found = rootElement.querySelectorAll( idOrElement )
        if ( found !== null ) { return found }
    }

    if ( idOrElement instanceof Element || idOrElement instanceof SVGElement || typeof idOrElement === "object" ) {
        return idOrElement;
    }
    throw new Error( "Invalid Element or Id", { cause: idOrElement } )
}

export function randomInt ( min, max ) {
    /**
     * @description Returns a random integer between min (inclusive) and max (exclusive)
     * @param {number} min Minimum integer value (inclusive)
     * @param {number} max Maximum integer value (exclusive)
     * @returns {number} Random integer between min and max
     */
    const minCeiled  = Math.ceil( min );
    const maxFloored = Math.floor( max );
    return Math.floor( Math.random() * ( maxFloored - minCeiled ) + minCeiled ); // The maximum is exclusive and the minimum is inclusive
}

export function simpleEscapeHtml ( str ) {
    /**
     * @description Simple escape HTML special characters in a string
     * @param {string} str Input string
     * @returns {string} Escaped string
     */
    return str.replace( /&/g, '&amp;' )
              .replace( /</g, '&lt;' )
              .replace( />/g, '&gt;' )
              .replace( /"/g, '&quot;' )
              .replace( /'/g, '&#39;' )
              .replace( /^[\n\s]+/, '' ) // strip blank prefix
            //   .replaceAll( /[ ]{2,}/g, ' ')
            //   .replaceAll( /\n{2,}/g, '\n') // collapse newlines
}

export function simpleFormatHtmlWhitespace( text ) {
    /**
     * @description naive formatting of whitespace to make it more readable as source code
     */
            // \\x26lt\\x3bs'
    return text
        // .replace( /^[\n\s]+/, '')
        .replaceAll( /[<]/g, '\n<' )
        .replaceAll( /\\x26lt\\x3b/g, '\n&lt;' )
        .replaceAll( /[>]/g, '>\n' )
        .replaceAll( /["]\s+/g, `"\n  `)
        .replaceAll( /\n{2,}/g, '\n') // collapse newlines
        // .replaceAll( /\w"\s+/g, '\n'  )
}

export class ColorGenerator {
    /**
     * @description Every call returns the next color in the defined sequence
     * @example
     * new ColorGenerator()
     * @example
     * new ColorGenerator({ stepSize: 20, stepInitial: -180 })
     * new ColorGenerator({ stepSize: 10, mode: 'grayscale' })
     * new ColorGenerator({ stepSize: 10, mode: 'grayscale', stepInitial: 40 })
     */
    #curValue = 0.0 // current color
    #stepSize = 10 // amount to vary by each step
    #mode = 'rotateHue'
    #lastColor = `` // string
    #stepInitial  = 0.0

    modeNames = [ 'rotateHue', 'grayscale' ] // 'grayscale', 'list'

    constructor( config = {} ) {
        /**
         * @description Create ColorGenerator instance
         * @param {Object} config Configuration options
         * @param {number} config.stepSize Step size for the unit. Ex: `<angle>` for hue, 256 for RGB color values
         * @param {number} config.stepInitial resetting will revert to the value
         * @param {string} config.mode Color generation mode. One of: [ 'rotateHue', 'grayscale' ]
         */
        const settings = {
            mode: 'rotateHue',
            stepInitial: 0.0,
            stepSize: 20,
            ...config,
        }
        this.#stepInitial  = settings.stepInitial
        this.#curValue = settings.stepInitial
        this.#stepSize = settings.stepSize
        this.#mode = settings.mode

        if( ! this.modeNames.includes( this.#mode ) ) {
            throw new Error( `Unknown color mode: ${this.#mode}` )
        }
    }

    #next () {
        /**
         * @description calculates and stores next color to `#lastColor`
         */
        let color
        switch  ( this.#mode ) {
            case 'rotateHue':
                this.#curValue += this.#stepSize
                while( this.#curValue >= 360 ) { this.#curValue -= 360 }
                color = `hsl(${this.#curValue}, 50%, 60%)`;
                this.#lastColor = color
                return color;
            case 'grayscale':
                this.#curValue += this.#stepSize
                while( this.#curValue >= 256 ) { this.#curValue -= 256 }
                color = `rgb( ${this.#curValue}, ${this.#curValue}, ${this.#curValue} )`;
                this.#lastColor = color
                return color;
            default:
                throw `Unknown color mode: ${this.#mode}`
        }
    }
    get Current() {
        return this.#lastColor
    }

    get Reset() {
        this.#curValue = this.#stepInitial
        return this
    }
    get Next() {
        return this.#next();
    }
}
