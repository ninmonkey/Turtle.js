export function ElementFromIdOrValue ( idOrElement, rootElement = document ) {
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