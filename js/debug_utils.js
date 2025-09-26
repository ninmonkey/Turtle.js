export function GetAllElements ( rootElement = document ) {
    /**
     * @description Resolves name or elements, or css selector query to element[s]
     */

    const info = {
        svg: rootElement.querySelectorAll( 'svg' ),
        turtleSvg: rootElement.querySelectorAll( 'turtle-svg' ),
        parentContext: rootElement.querySelectorAll( '.parent-context' ),
        hidden: rootElement.querySelectorAll( '.hidden' ),
    }
    return info
}

// export function debug_InspectPathSize(  parent ) {
//     /**
//      * @description experiment to remove. inspect dynamic svg DOM
//      **/
//     const firstPath =  parent.querySelectorAll('svg path')[0]
//     console.trace('debug_InspectPathSize', { firstPath, parent } )

//     const info = { firstPath }

//     if( firstPath ) {
//         const owner = firstPath.ownerSVGElement

//         info.bbox                     = firstPath.getBBox()
//         info.owner                    = owner
//         info.owner_BBox               = owner.getBBox()
//         info.owner_ClientRects        = owner.getClientRects()
//         info.owner_BoundingClientRect = owner.getBoundingClientRect()
//         info.first_BBox               = firstPath.getBBox()
//         info.first                    = firstPath.getClientRects()
//     }
//     console.log( info )
//     window.bag.lastInspect = info
//     return info
// }
