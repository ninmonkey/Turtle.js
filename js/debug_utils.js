export function GetAllElements ( rootElement = document ) {
    /**
     * @description Resolves name or elements, or css selector query to element[s]
     */

    const info = {
        svg: rootElement.querySelectorAll( 'svg' ),
        turtleSvg: rootElement.querySelectorAll( 'turtle-svg' ),
    }
    return info
}