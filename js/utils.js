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
