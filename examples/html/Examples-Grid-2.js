
import { Turtle } from './../../js/turtle.js';
import { TurtleSvgElement } from './../../js/custom-element/turtle-svg-element.js';
import { randomInt, elementFromIdOrValue, simpleFormatHtmlWhitespace, simpleEscapeHtml, ColorGenerator } from './../../js/utils.js'
import { GetAllElements } from './../../js/debug_utils.js'
import { SvgPathBuilder, CreateElement_Path, CreateElement_Svg, CreateSvgContainerWithTooltip } from './../../js/svg.js'

window.bag ??= {}
const parentElement = document.querySelector( ".parent-context" )

const loggerConfig = {
    mouseEventsAll: true,
    events: {
        mouseout: false,
        mouseover: false,
    }
}
window.loggerConfig = loggerConfig

let cur
const cg =
    new ColorGenerator( { stepSize: 45, stepInitial: -180 } )
// new ColorGenerator({ stepSize: 10, mode: 'grayscale', stepInitial: 50 })
let i = 0
let deg = 0
let path // const newPath = new SvgPathBuilder()
let curSvgSource
let pathAttrs = {}
let rootAttrs = {}
let pathList = Array.from( [] )

window.cg ??= cg

//.fill('hsl( 200 50% 50% / 1.0)')
if ( true ) {
    pathList = []
    // rootAttrs = { viewBox: '0 0 100 100', width: 300, height: 300 }
    rootAttrs = { viewBox: '-50 -50 100 100'}
    rootAttrs = { viewBox: '-1 -1 100 100' }
    // rootAttrs = { viewBox: '0 0 100 100' }

    const distance = 25
    const num_sides = 5;
    const angle = 360 / num_sides;
    const shade =
        // new ColorGenerator( { stepSize: 10, mode: 'grayscale', stepInitial: 20 } )
        new ColorGenerator( { stepSize: 20, stepInitial: -180 } )

    pathList = []
    for ( let i = 0; i < 10; i++ ) {
        const x = randomInt( 0, 100 )
        const y = randomInt( 0, 100 )
        pathList.push(
        new SvgPathBuilder().stroke( shade.Next )
            .M( x, y )
            .rotate( randomInt( 0, 360 ) )
            .applyFunc( 'polygon', randomInt( 5, 15), randomInt( 5, 12 ))
            .closePath()
        )
    }

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `polygon`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}
if ( true ) {
    pathList = []
    // rootAttrs = { viewBox: '0 0 100 100', width: 300, height: 300 }
    rootAttrs = { viewBox: '-50 -50 100 100'}
    rootAttrs = { viewBox: '-1 -1 100 100' }
    // rootAttrs = { viewBox: '0 0 100 100' }

    const distance = 25
    const num_sides = 5;
    const angle = 360 / num_sides;
    const shade = new ColorGenerator( { stepSize: 10, mode: 'grayscale', stepInitial: 20 } )

    pathList = []
    for ( let i = 0; i < 10; i++ ) {
        const x = randomInt( 0, 100 )
        const y = randomInt( 0, 100 )
        pathList.push(
        new SvgPathBuilder().stroke( shade.Next )
            .M( x, y )
            .rotate( randomInt( 0, 360 ) )
            .applyFunc( 'polygon', randomInt( 5, 20), num_sides )
            .closePath()
        )
    }

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `bearing: hexagon`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}

if ( true ) {
    let p1
    let p2
    let p3

    pathList = []
    rootAttrs = { viewBox: '-1 -1 500 500' }
    pathList = [
        new SvgPathBuilder().stroke( cg.Next )
            .M( 100, 200 )
            .C( 100, 100, 250, 100, 250, 200 )
            .S( 400, 300, 400, 200 )
            .closePath(),

        new SvgPathBuilder().stroke( cg.Next )
            .M( 0, 0 )
            .M( 250, 250 )
            .C( 25, 600, 475, 100, 400, 450 )
            .closePath(),
    ]

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `curve and smooth curve`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}
if ( true ) {
    let p1
    let p2
    let p3

    pathList = []
    rootAttrs = { viewBox: '-1 -1 100 100' }
    // rootAttrs = {}

    const pad_x = 10
    const pad_y = 10
    for ( let i = 0; i < 20; i++ ) {
        const cur = new SvgPathBuilder()
            .stroke( cg.Next )
            .m( pad_x * i, pad_y * i )
            .applyFunc( 'grid', 3, 6, 10, 5 )
        pathList.push( cur )
    }

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `fill: alpha`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}
if ( true ) {
    pathList = []
    rootAttrs = { viewBox: '-1 -1 100 100' }

    const pad_x = 10
    const pad_y = 10
    cg.Reset
    for ( let i = 0; i < 20; i++ ) {
        const cur = new SvgPathBuilder()
            .stroke( cg.Next )
            .m( pad_x * i, pad_y * i )
            .fill( 'transparent' )
            .applyFunc( 'grid', 3, 6, 10, 5 )
        pathList.push( cur )
    }

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `fill: transparent`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}
if ( true ) {
    pathList = []
    const pad_x = 10
    const pad_y = 10
    rootAttrs = { viewBox: '-1 -1 100 100' }
    // rootAttrs = {}

    cg.Reset
    for ( let i = 0; i < 20; i++ ) {
        const cur = new SvgPathBuilder()
            .stroke( cg.Next )
            .m( pad_x * i, pad_y * i )
            .fill( 'hsl( 200 50% 50% / 1.0)' )
            .applyFunc( 'grid', 3, 6, 10, 5 )
        pathList.push( cur )
    }

    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `fill: solid`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}
if ( true ) {
    let p1
    let p2
    let p3

    rootAttrs = {}
    rootAttrs = { viewBox: '-1 -1 100 100' }
    pathList = []
    p1 = new SvgPathBuilder().stroke( 'salmon' )
        .applyFunc( 'grid', 3, 6, 10, 5 )

    p2 = new SvgPathBuilder().stroke( 'rebeccapurple' )
        .M( 20, 20 )
        .fill( 'transparent' )
        .applyFunc( 'grid', 3, 6, 10, 5 )

    p3 = new SvgPathBuilder().stroke( 'orange' )
        .M( 40, 40 )
        .fill( 'hsl( 200 50% 50% / 1.0)' )
        .applyFunc( 'grid', 3, 6, 10, 5 )

    pathList = [ p1, p2, p3 ]
    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `grids`,
        path: pathList,
        parentElement,
    }, pathAttrs, rootAttrs )
}

if ( true ) {
    let path2

    rootAttrs = {}
    rootAttrs = { viewBox: '-1 -1 11 11' }
    pathAttrs = {} // { stroke: cg.Next }
    pathList = []
    path = new SvgPathBuilder().stroke( cg.Next )
        .m( 0, 0 )
        .applyFunc( 'square', 2 )
        .applyFunc( 'square', 4 )
        .closePath()

    pathList.push( path )


    path2 = new SvgPathBuilder()
        .stroke( cg.Next )
        .M( 4, 0 )
        .applyFunc( 'square', 3 )
        .applyFunc( 'square', 5 )
        .closePath()
    pathList.push( path2 )


    curSvgSource = CreateSvgContainerWithTooltip( {
        title: `shell`,
        path: pathList,
        // path: pathList, // verify array test
        parentElement,
    }, pathAttrs, rootAttrs )
}

/* page specific handlers for `grid-example.html` */
const toggleGridSizeButton = document.getElementById( "cmd-btn-toggle-grid-large" );
toggleGridSizeButton.addEventListener( "click", () => {
    const target = document.querySelector( 'section.parent-context' )
    if ( target.classList.contains( "grid-large" ) ) {
        target.classList.replace( "grid-large", 'grid-small' )
    } else {
        target.classList.remove( "grid-small" )
        target.classList.add( "grid-large" )
    }
} );
// tooltips
const tooltips = document.querySelectorAll( ".tooltip" );
const btns = document.querySelectorAll( "#button-bar button" );

function RegisterTooltipsForTurtleSvgElements ( turtleSvgElements ) {
    /**
     * @description Register hover tooltip for each TurtleSvgElement in the NodeList
     * @param {NodeListOf<TurtleSvgElement>} turtleSvgElements
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#using_hint_popover_state
     */

    turtleSvgElements.forEach( ( turtleSvgElem ) => {
        turtleSvgElem.addEventListener( "mouseover", () => {
            const cur_tip = tooltips[ 0 ]
            if ( window.loggerConfig.mouseEventsAll && window.loggerConfig.events.mouseover ) {
                console.debug( '🐁 MouseOver:', { turtleSvgElem } );
            }
            // let cur = turtleSvgElem.shadowRoot.querySelector( 'svg' )
            const cur = turtleSvgElem.querySelector( 'svg' )
            const formatted_xml = simpleFormatHtmlWhitespace( cur.outerHTML )
            const escaped_xml =
                simpleEscapeHtml( formatted_xml )

            const abbr_viewBox =
                cur.getAttribute( 'viewBox' )
                    .split( /\s/ )
                    .map( ( s ) => new Number( s ).toFixed( 1 ) )
                    .join( ' ' )
            const rawText = `
                    <p>
                    Viewbox: ${ abbr_viewBox }
                    <br/>BaseVal: ${ cur.width.baseVal.value.toFixed( 1 ) } x ${ cur.height.baseVal.value.toFixed( 1 ) }
                    </p>
                    <p>Svg:</p><pre class="inline-code-block"><code class="language-xml">${ escaped_xml
                }</code></pre>`

            /* old:
                <br/>X, Y: ${ cur.getAttribute( 'x' ) }, ${ cur.getAttribute( 'y' ) }.
                <br/>Width, Height (attr):d ${ cur.getAttribute( 'width' ) } x ${ cur.getAttribute( 'height' ) }.
            */
            cur_tip.innerHTML = rawText

            window.Prism.highlightAll()
            cur_tip.showPopover( { source: turtleSvgElem } );
        } );

        turtleSvgElem.addEventListener( "mouseout", () => {
            const cur_tip = tooltips[ 0 ]
            if ( window.loggerConfig.mouseEventsAll && window.loggerConfig.events.mouseout ) {
                console.debug( '🐁 MouseOut:', { turtleSvgElem } )
            }
            cur_tip.hidePopover();
        } );

        turtleSvgElem.addEventListener( "focus", () => {
            const cur_tip = tooltips[ 0 ]
            if ( window.loggerConfig.mouseEventsAll ) { console.debug( '🐁 focus:', { turtleSvgElem } ) }
            cur_tip.showPopover( { source: turtleSvgElem } );
        } );

        turtleSvgElem.addEventListener( "blur", () => {
            const cur_tip = tooltips[ 0 ]
            if ( window.loggerConfig.mouseEventsAll ) { console.debug( '🐁 blur:', { turtleSvgElem } ) }
            cur_tip.hidePopover();
        } )

        turtleSvgElem.addEventListener( "click", () => {
            const cur_tip = tooltips[ 0 ]
            if ( window.loggerConfig.mouseEventsAll ) { console.debug( '🐁 click:', { turtleSvgElem } ) }
            const rawSvgText = turtleSvgElem.querySelector( 'svg' ).outerHTML
            console.info( 'copied SVG to clipboard', { rawSvgText } )
            navigator.clipboard.writeText( rawSvgText )
                .catch( err => {
                    console.error( 'Failed to copy SVG to clipboard:', err );
                } )
        } )
    } )
}
const all_wrappers = document.querySelectorAll( '.svg-wrapper' )
RegisterTooltipsForTurtleSvgElements( all_wrappers )

// globals
window.bag ??= {}
window.fn ??= {}
window.cls ??= {}

window.Turtle = Turtle
window.TurtleSvgElement = TurtleSvgElement
window.bag.root_elem = parentElement
window.bag.all_wrappers = all_wrappers
window.fn.allElements = GetAllElements
window.fn.SvgPathBuilder = SvgPathBuilder
window.fn.CreateElement_Svg = CreateElement_Svg
window.fn.CreateElement_Path = CreateElement_Path
window.cls.ColorGenerator = ColorGenerator


console.trace( 'debug enabled globals: ', { Turtle, TurtleSvgElement, bag } )

