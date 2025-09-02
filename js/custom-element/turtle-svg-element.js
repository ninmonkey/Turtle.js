import { AnimateFrame, InitTurtle, Turtle } from '../turtle.js'
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
        border: 1px dotted black;
        padding: 10px;
        margin: 10px;
        outline: 3px solid green;
    }
    text#fps-counter {
        fill: green;
        stroke: red;
        font-size: 30px;
    }
</style>
<section class="turtle-svg-wrapper">
    <slot name="title">
        <span>Nameless</span>
    </slot>
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
            stroke-width   = '1%'
            stroke-linecap = 'round'
        ></path>
        <text
            id                = 'fps-counter'
            class             = 'fps-counter'
            font-size         = '12px'
            x                 = '50%'
            y                 = '50%'
            text-anchor       = 'middle'
            dominant-baseline = 'middle'
        ></text>
    </svg>
    <text class="fps-counter" id='counter' font-size='12px' x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'></text>

</section>
`
document.querySelector( 'body' ).appendChild( template_turtle_svg )

export class TurtleSvgElement extends HTMLElement {
    // static observedAttributes = ["color", "size"];

    #shadow = null
    constructor() {
        super();
        this.#shadow = this.attachShadow( { mode: 'open' } );
        const template = document.getElementById( template_id ).content.cloneNode( true );
        this.#shadow.appendChild( template );
    }
    connectedCallback () {
        // template.
        // this.#shadow.appendChild( template );
        // const template = template_commitMessage.content.cloneNode( true );
        // this.#shadow.appendChild( template );
    }
}
customElements.define( 'turtle-svg', TurtleSvgElement );