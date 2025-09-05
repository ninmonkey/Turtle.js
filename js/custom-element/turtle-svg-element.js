import { Turtle } from '../turtle.js'
import { ElementFromIdOrValue } from '../utils.js'

const template_id = 'template-turtle-svg'
/* create <template id="template-turtle-svg"> */
const template_turtle_svg = document.createElement( 'template' )
template_turtle_svg.setAttribute( 'id', template_id )
template_turtle_svg.innerHTML = `
<style>
    :root {
        --color-fg: blue;
    }
    :host {
        display: block;
        padding: 10px;
        margin: 10px;
    }
</style>
<section class="turtle-svg-wrapper">
    <slot name="title">
        <span class='turtle-title'>Turtle.js</span>
    </slot>t1.rotate(30).forward(4).rotate(66).forward(7)
    <svg
        width  = '100%'
        height = '100%'
        class  = 'svg-root'
    >
        <path
            id             = 'turtle-path'
            class          = 'svg-path'
            fill           = 'transparent'
            stroke         = 'currentColor'
            stroke-width   = '2%'
            stroke-linecap = 'round'
        ></path>
    </svg>
    <span class="fps-counter"></span>

</section>
`

document.querySelector( 'body' ).appendChild( template_turtle_svg )

export class TurtleSvgElement extends HTMLElement {
    // static observedAttributes = ["color", "size"];
    #shadow = null
    #turtle = null
    #svgContext = null

    constructor() {
        super();
        this.#shadow = this.attachShadow( { mode: 'open' } );
        const template = document.getElementById( template_id ).content.cloneNode( true );
        this.#shadow.appendChild( template );
        this.#svgContext = this.#shadow.querySelector( 'svg' )

        this.#turtle = new Turtle( { context: this.#svgContext } )
        this.#turtle
            .forward( 4 )
            .rotate( Math.random() * 30 )
            .forward( 4 ).rotate( 20 )
            .rotate( Math.random() * 30 )
            .forward( 2 )

        let curTurtle = this.#turtle


        for ( let i = 0; i < 20; i++ ) {
            this.#turtle.rotate( ( Math.random() * 90 ) - 45 )
            curTurtle.forward( Math.random() * 7 - 2 )
        }
        curTurtle.resize()

        this.updateSvg()


        // render  ?
    }
    connectedCallback () {
        // template.
        // this.#shadow.appendChild( template );
        // const template = template_commitMessage.content.cloneNode( true );
        // this.#shadow.appendChild( template );
    }

    getNamedElements () {
        const elems = {
            turtle: this.#turtle,
            root: this.#shadow,
            svgWrapper: this.#shadow.querySelector( '.turtle-svg-wrapper' ),
            svg: this.#shadow.querySelector( 'svg' ),
            path: this.#shadow.querySelector( '#turtle-path' ),
            fpsCounter: this.#shadow.querySelector( '.fps-counter' ),
        }
        return elems
    }

    updateSvg () {
        /**
         * @description Update svg DOM in sync with the turtle
         */
        this.#turtle.updateSvg()
        // this.#turtle.updateSvg( this.#svgContext )
    }

    get Turtle () {
        /**
         * @description returns `Turtle` instance
         */
        return this.#turtle
    }
}
customElements.define( 'turtle-svg', TurtleSvgElement );