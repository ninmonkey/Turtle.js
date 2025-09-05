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

    constructor() {
        super();
        this.#shadow = this.attachShadow( { mode: 'open' } );
        const template = document.getElementById( template_id ).content.cloneNode( true );
        this.#shadow.appendChild( template );

        this.#turtle = new Turtle()
        this.#turtle.forward( 4 ).rotate( 45 ).forward( 4 ).rotate( 20 ).forward( 2 )
        this.#turtle.updateSvg( this.#shadow.querySelector( 'svg' ) )
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

    get Turtle () {
        /**
         * @description returns `Turtle` instance
         */
        return this.#turtle
    }
}
customElements.define( 'turtle-svg', TurtleSvgElement );