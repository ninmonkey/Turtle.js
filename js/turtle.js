import { ElementFromIdOrValue } from './utils.js'

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

    #context = null // SVG element context

    #fpsFrameCount = 0
    #fpsPrevTime = new Date()

    constructor() {
        this.heading = 0.0;
        this.steps = [];
        this.penDown = true;
        this.x = 0.0;
        this.y = 0.0;
        this.width = 0.0;
        this.height = 0.0;
        this.min = { x: 0.0, y: 0.0 };
        this.max = { x: 0.0, y: 0.0 };
    }

    rotate ( angle ) {
        this.heading += Number( angle );
        return this;
    }

    step ( dx, dy ) {
        if ( this.penDown ) {
            this.steps.push( ` l${ dx } ${ dy } ` );
        } else {
            this.steps.push( ` m${ dx } ${ dy } ` );
        }
        this.x += dx;
        this.y += dy;
        this.resize();
        return this;
    }

    forward ( distance ) {
        return this.step(
            distance * Math.cos( ( this.heading * Math.PI ) / 180 ),
            distance * Math.sin( ( this.heading * Math.PI ) / 180 )
        );
    }

    goto ( x, y ) {
        return this.step( x - this.x, y - this.y );
    }

    teleport ( x, y ) {
        var penState = this.penDown; // gasp, verify it's not meant ot be module scope
        this.penDown = false;
        this.step( x - this.x, y - this.y );
        this.penDown = penState;
        return this;
    }

    resize () {
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
        return this;
    }

    path () {
        return `m ${ this.min.x * -1 } ${ this.min.y * -1 } ${ this.steps.join( ' ' ) } `;
    }

    polygon ( size, sides = 6 ) {
        for ( let side = 0; side < sides; side++ ) {
            this.forward( size ).rotate( 360 / sides );
        }
    }

    updateSvg ( context ) {
        /**
         * @description Apply animations, Write to <svg> and calc fps
         */
        // animate frame, update svg, and calc fps
        // note: warning: polygon already writes to element
        const svg = context ?? this.#context
        if ( context === null ) { console.error( "Turtle context is null" ) }

        const path = svg.getElementById( "turtle-path" )
        const turtle = state.turtle;

        svg.setAttribute( "viewBox", `0 0 ${ turtle.width } ${ turtle.height }` );
        path.setAttribute( "d", turtle.path() );

        const curTime = new Date()
        const deltaTime = curTime - this.#fpsPrevTime
        this.#fpsFrameCount++
        this.#fpsPrevTime = curTime
        // this.#fpsPrevTime = new Date()
    }
}
