export const extractImage = (source) => {
    let m,
        rex = /<img src=['"]([^'"]+)[^>]>/g;

    m = rex.exec( source );
    if (!m) {
        return null
    }
    return m[0]
};