// import { ElementFromIdOrValue } from './utils.js'

export class Turtle {
    heading = 0.0
    steps = []
    penDown = true
    x = 0.0
    y = 0.0
    width = 0.0
    height = 0.0
    min = { x: 0.0, y: 0.0 }
    max = { x: 0.0, y: 0.0 }

    #stroke = 'currentColor'

    #context = null // SVG element context

    #fpsFrameCount = 0
    #fpsPrevTime = new Date()
    #fpsFirstFrameTime = null
    #config = {}

    constructor( config = {} ) {
        /**
         * @description Create Turtle instance
         * @param {Object} config settings
         * @param {SVGElement} config.context SVG element to write to
         */

        const defaults = {
            context: null,
            autoResize: true,
        }
        const settings = { ...defaults, ...config }
        this.heading = 0.0;
        this.steps = [];
        this.penDown = true;
        this.x = 0.0;
        this.y = 0.0;
        this.width = 0.0;
        this.height = 0.0;
        this.min = { x: 0.0, y: 0.0 };
        this.max = { x: 0.0, y: 0.0 };
        this.#context = settings?.context
        this.#config.autoResize = settings?.autoResize
    }

    rotate ( angle ) {
        /**
         * @description Rotate heading by angle in degrees
         * @returns {Turtle} instance for chaining
         * */
        this.heading += Number( angle );
        return this;
    }

    step ( dx, dy ) {
        /**
         * @description Move by dx, dy while drawing (if pen is down, else without)
         * @returns {Turtle} instance for chaining
         */
        if ( this.penDown ) {
            this.steps.push( ` l${ dx } ${ dy } ` );
        } else {
            this.steps.push( ` m${ dx } ${ dy } ` );
        }
        this.x += dx;
        this.y += dy;
        if( this.#config.autoResize ) { this.resize() }
        return this;
    }

    forward ( distance ) {
        /**
         * @description Move forward by distance in current heading with drawing (pen down)
         * @returns {Turtle} instance for chaining
         * */
        return this.step(
            distance * Math.cos( ( this.heading * Math.PI ) / 180 ),
            distance * Math.sin( ( this.heading * Math.PI ) / 180 )
        )
    }

    goto ( x, y ) {
        /**
         * @description Move to x,y with drawing (pen down)
         * @returns {Turtle} instance for chaining
         * */
        return this.step( x - this.x, y - this.y );
    }

    teleport ( x, y ) {
        /**
         * @description Move to x,y without drawing (pen up)
         * @returns {Turtle} instance for chaining
         */
        const penStartState = this.penDown
        this.penDown = false;
        this.step( x - this.x, y - this.y );
        this.penDown = penStartState;
        return this;
    }

    resize () {
        /**
         * @description Recalculate bounding box
         * @returns {Turtle} instance for chaining
         */
        if ( this.x > this.max.x ) {
            this.max.x = this.x;
        }
        if ( this.y > this.max.y ) {
            this.max.y = this.y;
        }
        if ( this.x < this.min.x ) {
            this.min.x = this.x;
        }
        if ( this.y < this.min.y ) {
            this.min.y = this.y;
        }
        this.width = this.max.x - this.min.x;
        this.height = this.max.y - this.min.y;
        if( this.#config.autoResize ) { this.updateSvg() }
        return this;
    }

    path () {
        return `m ${ this.min.x * -1 } ${ this.min.y * -1 } ${ this.steps.join( ' ' ) } `;
    }

    polygon ( size, sides = 6 ) {
        /**
         * @description Draw a polygon with N sides
         * @param {number} size Length of each side
         * @param {number} sides Number of sides, default 6 (hexagon)
         * @returns {Turtle} instance for chaining
         */
        for ( let side = 0; side < sides; side++ ) {
            this.forward( size ).rotate( 360 / sides );
            if( this.#config.autoResize ) { this.resize() }
        }
        return this
    }

    waitForMs( milliseconds ) {
        /**
         * @description Wait for a number of milliseconds (sync?) to continue chaining calls or thenable?
         */
        throw "NotImplementedError"
        return this
    }

    stroke( color ) {
        /**
         * @description currently sets the top-level global color for the full image
         */
        this.#stroke = color
        this.updateSvg()
        return this
    }

    updateSvg ( context ) {
        /**
         * @description Apply animations, Write to <svg> and calc fps
         * @returns {Turtle} instance for chaining
         */
        const svg = context ?? this.#context
        if ( svg === null ) { console.error( "Turtle context is null" ) }

        const path = svg.getElementById( "turtle-path" )
        const turtle = this

        svg.setAttribute( "viewBox", `0 0 ${ turtle.width } ${ turtle.height }` );
        path.setAttribute( "d", turtle.path() );
        path.setAttribute( 'stroke', this.#stroke )

        const curTime = new Date()
        const deltaTime = curTime - this.#fpsPrevTime
        this.#fpsFrameCount++
        this.#fpsPrevTime = curTime
        this.#fpsFirstFrameTime ??= curTime
        return this
    }
}
