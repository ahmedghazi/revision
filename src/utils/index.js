export function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}


export function randomFromRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}