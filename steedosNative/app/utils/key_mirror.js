export default function keyMirror(obj) {
    let key;
    let mirrored = {};
    if ( obj && typeof obj === 'object' ) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                mirrored[key] = key;
            }
        }
    }
    return mirrored;
}