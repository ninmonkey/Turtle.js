import { Turtle } from '../turtle.js'
import { elementFromIdOrValue, randomInt } from '../utils.js'

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
    .turtle-title, svg {
        margin: 1rem;
    }
    .hidden { display: none; }
    svg {
        // padding: 1rem;
    }
</style>
<section class="turtle-svg-wrapper">
    <slot name="title">
        <span class='turtle-title'>js</span>
    </slot>
    <!-- was
        width  = '100%'
        height = '100%' -->
    <svg
        class  = 'svg-root'
    >
        <path
            id             = 'turtle-path'
            class          = 'svg-path'
            fill           = 'transparent'
            stroke         = 'currentColor'
            stroke-width   = '1.5%'
            stroke-linecap = 'round'
        ></path>
    </svg>
    <span class="fps-counter"></span>

</section>
`
export class TurtleSvgElement extends HTMLElement {
    // static observedAttributes = ["color", "size"];
    #shadow = null
    #turtle = null
    #svgContext = null

    constructor() {
        super();
        console.trace('note: correct behavior move DOM manip outside of ctor')
        this.#shadow = this.attachShadow( { mode: 'open' } );
        this.#rebuildDOM()
        this.clear()
        this.Title = this.dataset.title ?? ''
    }
    connectedCallback () {
        // template.
        // this.#rebuildDOM()
        // this.clear()
        // this.#shadow.appendChild( template );
        // const template = template_commitMessage.content.cloneNode( true );
        // this.#shadow.appendChild( template );
    }

    #rebuildDOM() {
        // [re]build DOM
        // const template = document.getElementById( template_id ).content.cloneNode( true );
        const template = template_turtle_svg.content.cloneNode( true );
        this.#shadow.replaceChildren()
        this.#shadow.appendChild( template );
        this.#svgContext = this.#shadow.querySelector( 'svg' )

    }

    clear() {
        /**
         * @description clears/resets as a new turtle instance
         */
        // this.#turtle = new Turtle( { context: this.#svgContext } )
        this.#turtle = new Turtle( { context: this.#svgContext } )
        this.#turtle.resize()
        this.updateSvg()
    }

    getNamedElements () {
        const elems = {
            turtle: this.#turtle,
            root: this.#shadow,
            svgWrapper: this.#shadow.querySelector( '.turtle-svg-wrapper' ),
            // title: this.#shadow.querySelector( 'svg' ).querySelector('span.turtle-title'),
            title: this.#shadow.querySelector('span.turtle-title'),
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

    set Title( text ) {
        // this.#svgContext.querySelector('span.turtle-title').textContent = value
        const elem = this.#shadow?.querySelector('span.turtle-title')
        if( ! elem ) {
            console.warn({ message: 'tried setting .Title before DOM element exists', obj: this } )
            return
        }
        elem.textContent = text
        this.dataset.title = text
    }
    get Title() {
        return this.dataset.title ?? ""
        // return this.#shadow.querySelector('span.turtle-title').textContent
    }

    get Turtle () {
        /**
         * @description returns `Turtle` instance
         */
        return this.#turtle
    }
}
customElements.define( 'turtle-svg', TurtleSvgElement );